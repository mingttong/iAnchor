/**
 * Created by lenovo on 2017/5/4.
 */

/**
 * 考虑几个情况：
 * 1. 房间号输入类型有误
 * 2. 房间号错误（打不开此房间）
 */

const phantom = require('phantom');

const baseUrl = 'https://www.douyu.com/';
const defaultRoomNumber = 85963; // 默认为炮哥直播间

let isLive = false;

module.exports = getLiveState;

async function getLiveState(roomNumber) {
  "use strict";

  const instance = await phantom.create();
  const page = await instance.createPage();

  page.viewportSize = {
    width: 1280,
    height: 720
  };

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
    setTimeout(async function () {

      var status = await page.evaluate(function () {
        return !document.querySelector('div.time-box');
      });

      await page.render(`./pics/douyu${roomNumber}.png`);

      await instance.exit();

      resolve(status);
    }, 1000);
  });

  return isLive;

}
