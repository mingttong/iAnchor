/**
 * Created by lenovo on 2017/5/4.
 */

/**
 * the lazy-load method is from https://gist.github.com/cjoudrey/1341747
 */

const phantom = require('phantom');

const baseUrl = 'https://www.douyu.com/';
const defaultRoomNumber = 85963; // 默认为炮哥直播间
const resourceWait = 300; // 等待资源继续加载的时间
const maxWait = 10000; //最大等待时间
const checkDelay = 20; // 检查是否还有资源在请求的间隔时间。

let checkRequestTimeout; // 检查是否还有资源请求的倒计时
let count = 0;
let isLive = false;
let viewportSize = {
  width: 1280,
  height: 1024,
};

/***************** 修改exports ******************/
module.exports = getLiveState;

/**
 * @name getPgeObj
 * @description 初始化 page,phantom 对象并返回
 * @returns {Promise.<{page: (Promise.<Page>|*), phantom: (*|Promise)}>} {Object}
 */
async function getPageObj() {
  "use strict";
  
  const phantom = await phantom.create();
  const page = await phantom.createPage();

  // 对 page 进行初始化操作

  page.property('viewportSize', viewportSize);

  await page.on('onResourceRequested', function (data) {
    count += 1;
    // console.log(`> ${data.id} - ${data.url}`);
  });

  await page.on('onResourceReceived', function (data) {
    if (!data.stage || data.stage === 'end') {
      count -= 1;
      // console.log(`${data.id} ${data.status} - ${data.url}`);
    }
  });

  return {
    page: page,
    phantom: phantom,
  };
}

async function getLiveState(roomNumber) {
  "use strict";

  const pageObj = await getPageObj();

  const page = pageObj.page;
  const phantom = pageObj.phantom;

  if (typeof roomNumber === 'string' || typeof roomNumber === 'undefined') {
    // 输入的格式有误
    // 可以给他默认的直播间号
    roomNumber = defaultRoomNumber;
  }

  let url = baseUrl + roomNumber;

  const status = await page.open(url);

  if (status !== 'success') {
    throw new Error({message: '打开页面失败！'});
  }

  // 等待页面加载
  isLive = await new Promise((resolve, reject) => {

    setTimeout(async function checkNoMoreResource() {

      if (count === 0) {
        // 执行倒计时

        let liveStatus = await page.evaluate(function () {
          return !document.querySelector('div.time-box');
        });

        await phantom.exit();

        resolve(liveStatus);

      } else {
        // 再次倒计时查找

        setTimeout(checkNoMoreResource, resourceWait);

      }
    }, resourceWait);

    // setTimeout(function checkRequest() {
    //
    //   if (count === 0) {
    //
    //     checkRequestTimeout = setTimeout(async function () {
    //
    //       let liveStatus = await page.evaluate(function () {
    //         return !document.querySelector('div.time-box');
    //       });
    //
    //       await phantom.exit();
    //
    //       resolve(liveStatus);
    //
    //     }, resourceWait)
    //
    //   } else {
    //
    //     clearTimeout(checkRequestTimeout); // 清除掉执行检查的倒计时
    //     setTimeout(checkRequest, checkDelay); // 再创建一个timeout
    //
    //   }
    //
    // }, checkDelay);
  });

  return isLive;

}
