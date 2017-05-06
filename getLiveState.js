/**
 * Created by lenovo on 2017/5/5.
 */

/**
 * 闲话：
 * 斗鱼的页面的加载机制还不是每个都一样
 * 对于一般的页面（就是最大众的直播间页面），房间名这类的数据都是在后台就直接渲染好的了
 * 但是对于活动页，可能因为要渲染的东西实在太多，都采用JavaScript动态渲染，房间名什么的也采用动态加载了。
 */

const phantom = require('phantom');

const baseUrl = 'https://www.douyu.com/';
const defaultRoomNumber = 85963; // 默认房间号（炮哥的）
const delay = 200; // 等待房间名加载出来的间隔

let isLive = false; // 是否在直播
let viewportSize = {
  width: 1280,
  height: 1024,
};

module.exports = getLiveState;

/**
 * @name getPgeObj
 * @description 初始化 page,instance 对象并返回
 * @returns {Promise.<{page: (Promise.<Page>|*), instance: (*|Promise)}>} {Object}
 */
async function getPageObj() {
  "use strict";

  const instance = await phantom.create();
  const page = await instance.createPage();


  // 对 page 进行初始化操作

  page.property('viewportSize', viewportSize);

  await page.on('onResourceRequested', function (data) {
    // console.log(`> ${data.id} - ${data.url}`);
  });

  await page.on('onResourceReceived', function (data) {
    if (!data.stage || data.stage === 'end') {
      // console.log(`${data.id} ${data.status} - ${data.url}`);
    }
  });

  return {
    page: page,
    instance: instance,
  };
}

/**
 * @name waitFor
 * @description 等待testFx条件满足时返回结果
 * @param testFx     {Function} 需满足条件的函数
 * @param maxTimeOut {Number}   最大等待时间，默认为10s
 * @returns {Promise} 返回执行结果
 */
async function waitFor(testFx, maxTimeOut = 10000) {

  let start = Date.now();
  let condition = false; // 是否执行callback

  let result = await new Promise((resolve, reject) => {
    setInterval(function () {
      if ((Date.now() - start < maxTimeOut) && !condition) {
        // 如果还没到 time out 并且还没有到满足执行回调函数的条件。
        condition = testFx();
      } else {

        if (!condition) {
          // 如果还是没到执行回调函数的条件，则说明是 time out 了
          resolve('timeout');
        } else {
          // 满足了执行 callback 的条件了
          resolve(true);
        }

      }
    }, delay); // < repeat check every delay time
  });

  return result;
}

/**
 * @name getLiveState
 * @description 获取直播间直播状态
 * @param rn {Number} 房间号，可选参数
 * @returns {Promise.<boolean>}
 */
async function getLiveState(rn) {
  "use strict";

  const pageObj = await getPageObj();
  const page = pageObj.page;
  const instance = pageObj.instance;

  if (typeof rn === 'string' || typeof rn === 'undefined') {
    // 输入的格式有误
    // 可以给他默认的直播间号
    rn = defaultRoomNumber;
  }

  let url = baseUrl + rn;
  const status = await page.open(url);

  if (status !== 'success') {
    throw new Error({message: '打开页面失败'});
  }

  let loadStatus = await waitFor(async function () {

    return await page.evaluate(function () {
      // 看房间名是否存在？

      var rnEl = document.querySelector('h1');

      if (!!rnEl) {
        // 如果房间名元素存在

        // 查看内容是否加载出来了
        return !!rnEl.textContent;
      }

      return false;

    });

  });

  if (loadStatus === true) {

    isLive = await page.evaluate(function () {
      return !document.querySelector('div.time-box');
    });
    await instance.exit();

  } else {
    // 查询超时
    isLive = false;
  }

  return isLive;
}