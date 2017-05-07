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

let viewportSize = {
  width: 1280,
  height: 1024,
};
let totalSize = 0; // 获取的总资源大小
let countSizeTimeout = null; // 计算总资源大小的倒计时

module.exports = getAnchorInfo;

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

  /*
   操蛋的一点是，如果第二个参数是true，则是在真的PhantomJS上跑的。
   也就是说，你只能用ES5及以下的语法，因为PhantomJS不支持ES6的语法。
   这也说明了这个"phantom"模块其实不是真的PhantomJS，
   是作者写的一个可以实现PhantomJS功能的模块。

   所以在“运行真的PhantomJS”模式下，回调函数闭包无法调用外部的变量。
   更牛逼的是，它甚至还会忽略含有外部变量的语句。

   年轻了。
   */
  await page.on('onResourceRequested', true, function (data, req) {

    // if (data.url.indexOf('www.douyu.com') === -1 && data.url.indexOf('shark-all.js') === -1 && data.url.indexOf('app-all.js') === -1 && data.url.indexOf('jquery') === -1 && data.url) {
    if (data.url.indexOf('www.douyu.com') === -1 && data.url.indexOf('.js') === -1) {
      req.abort();
    }

  });

  await page.on('onResourceReceived', function (data) {

    // if ((!data.stage || data.stage === 'end') && !!data.contentType) {
    //   console.log(`${data.id} ${data.status} - ${data.url}`);
    // }

    if (data.stage === 'start') {

      // console.log(`${data.id} ${data.status} - ${data.url}`);

      totalSize += data.bodySize;
      clearTimeout(countSizeTimeout);
      countSizeTimeout = setTimeout(() => {
        console.log('Total Size:', totalSize / 1000 + 'KB');
      }, 500);
    }

    // console.log(`${data.id} ${data.status} - ${data.url}`);
  });

  // await page.on('onConsoleMessage', function (msg) {
  //   console.log(msg);
  // });
  //
  // await page.on('onUrlChanged', function (targetUrl) {
  //
  // });

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

  const delay = 20; // 等待房间名加载出来的间隔

  let start = Date.now();
  let condition = false; // 是否执行callback

  let result = await new Promise((resolve, reject) => {

    setTimeout(async function timer() {

      if ((Date.now() - start < maxTimeOut) && !condition) {
        // 如果还没到 time out 并且还没有到满足执行回调函数的条件。

        /*
          20170507 13:48
         为什么这里要加个 await ?
         因为我被它害惨了，每次 condition 都是 true
         因为不 await 的话就会得到一个正在 pending 的 Promise
         */
        condition = await testFx();

        setTimeout(timer, delay);
      } else {

        if (!condition) {
          // 如果还是没到执行回调函数的条件，则说明是 time out 了
          resolve('timeout');
        } else {
          // 满足了执行 callback 的条件了
          resolve(true);
        }

      }

    }, delay); // < check every delay time repeatedly

  });

  return result;
}

/**
 * @name getAnchorInfo
 * @description 获取直播间直播状态
 * @param rn {Number} 房间号，可选参数
 * @returns {Promise.<{code: number, roomName: string, roomNumber: *, isLive: boolean, anchorName: string, lastLive: string}>}
 */
async function getAnchorInfo(rn) {
  "use strict";

  const pageObj = await getPageObj();
  const page = pageObj.page;
  const instance = pageObj.instance;

  // 主播信息
  let anchorInfo = {
    code: 0,          // 返回状态码，1为成功，0为失败
    roomName: '',     // 房间名
    roomNumber: rn,   // 房间号
    isLive: false,    // 是否在直播
    anchorName: '',   // 主播名
    lastLive: '',     // 上次直播时间
  };

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

    let result =  await page.evaluate(function () {
      // 看房间名是否存在？

      var rnEl = document.querySelector('h1');

      if (!!rnEl) {
        // 如果房间名元素存在

        // 查看内容是否加载出来了
        return !!rnEl.textContent.length;
      }

      return false;

    });

    return result;

  });

  console.log(loadStatus);

  if (loadStatus === true) {

    anchorInfo = await page.evaluate(function () {

      var roomName,    // 房间名
          anchorName,  // 主播名
          isLive,      // 是否在直播
          lastLive;    // 上次直播时间

      var info = null; // 主播信息

      isLive = !document.querySelector('div.time-box');
      roomName = document.querySelector('h1').textContent;
      anchorName = document.querySelector('a.zb-name').textContent;

      lastLive = isLive? '' : document.querySelector('[data-anchor-info="timetit"]').textContent;

      // 删除掉 zb-name 标签下的废物文字

      var fuckString = document.querySelector('a.zb-name .tip').textContent;
      anchorName = anchorName.replace(fuckString, '');

      console.log(roomName);

      /*
       如果支持ES6，一下内容就可以简写为：
       info = {
         roomName,
         anchorName,
         ...
       }
       */
      info = {
        roomName: roomName,
        anchorName: anchorName,
        isLive: isLive,
        lastLive: lastLive,
      };

      info = JSON.stringify(info);

      return info;

    });

    anchorInfo = JSON.parse(anchorInfo);

    anchorInfo = {
      code: 1,
      roomNumber: rn,
      roomName: anchorInfo.roomName,
      anchorName: anchorInfo.anchorName,
      isLive: anchorInfo.isLive,
      lastLive: anchorInfo.lastLive,
    };

    // await page.render(`./pics/${rn}.png`);
    await instance.exit();

  } else {
    // 查询超时
    anchorInfo = {
      code: 0, // 返回状态码，1为成功，0为失败
      roomNumber: rn, // 房间号
    };
  }

  return anchorInfo;
}