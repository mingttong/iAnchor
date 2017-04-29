/**
 * Created by lenovo on 2017/4/29.
 */

var system = require('system');
var args = system.args;
var page = require('webpage').create();

var baseUrl = "http://www.douyu.com/";
var roomNumber; // 房间号
var room_name; // 房间名

if (args.length === 1) {
  roomNumber = 85963;
} else {
  roomNumber = args[1];
}

var url = baseUrl + roomNumber;

page.open(url, function (status) {
  "use strict";

  room_name = page.evaluate(function () {
    var titleEl = document.querySelector("h1");
    return titleEl ? titleEl.textContent : '妈的又找不标题了';
  });

  console.log(room_name);

  phantom.exit();
});