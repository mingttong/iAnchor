/**
 * Created by lenovo on 2017/5/2.
 */

var system = require('system');
var args = system.args;
var page = require('webpage').create();

var baseUrl = "http://www.douyu.com/";
var roomNumber; // 房间号

var isLive = false;

if (args.length === 1) {
  roomNumber = 85963; // 默认搜索炮哥直播间
} else {
  roomNumber = args[1];
}

var url = baseUrl + roomNumber;

/**
 * @name waitForRoomName
 * @description 异步，等待房间名加载完成后，执行回调函数。
 * @param foo       {Function} 回调函数
 * @param delay     {Number}   延迟时间 可选参数
 */
function waitForRoomName(foo, delay) {
  "use strict";

  // 默认
  delay = delay === 0 ? delay : (!!delay ? delay : 200);

  setTimeout(function timer() {

    // 如果房间名加载出来了，则执行回调函数
    if (!!(document.querySelector("h1").textContent)) {

      foo();

    // 如果房间名未加载出来，则继续等待
    } else {
      console.log('等待...');
      setTimeout(timer, delay);
    }

  }, delay)
}

page.open(url, function (status) {
  "use strict";

  // 等待房间名加载出来了再去判断是否在直播
  // 通过判断是否存在元素节点 div.time-box
  waitForRoomName(function () {
    isLive = page.evaluate(function () {
      // 如果存在“上次直播”，则说明现在开播
      return !(document.querySelector('div.time-box'));
    });

    page.render('./pics/douyu.png');

    console.log(isLive);

    phantom.exit();
  });

  console.log('准备等待房间名加载...')
});