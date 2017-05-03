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

page.open(url, function (status) {
  "use strict";

  isLive = page.evaluate(function () {
    // 如果存在“上次直播”，则说明现在开播
    return !(document.querySelector('div.time-box'));
  });

  console.log(isLive);

  phantom.exit();
});