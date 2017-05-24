/**
 * Created by lenovo on 2017/5/22.
 */

const getAnchorInfo = require('./getLiveState');
const sendMsg = require('./sendMsg');

const room_numbers = {
  'paoge': 85963,       // 温州炮哥
  'qishifu': 17732,     // 7师傅
  'shisanyi': 69752,    // 十三姨
  'chenyifaer': 67373,  // 陈一发儿
  'qige': 65251,        // 七哥
  'jianyan': 656971,    // 简言
  'jinyutong': 2094956, // 金玉童童童
  // 'huodong': 't/SGPG',  // 活动页
  // 'huodong2': 8,        // 活动页
  'businiao': 610588,   // 不死鸟3DM
  'shunvjia': 570284,   // 淑女佳
  'jianianhua': 6,  // 斗鱼嘉年华
};

let start1 = Date.now();
let count = 0;

const baseURI = 'http://www.douyu.com/ztCache/WebM/room/';

let options = {
  uri: baseURI + 85963,
  json: true,
};

rp(options)
  .then(function (repos) {
    "use strict";
    // console.log(Object.keys(repos));
    console.log(repos['$ROOM.effectSwf']);
    let $ROOM = JSON.parse(repos.$ROOM);
    // console.log($ROOM);
  })
  .catch(function (err) {
    "use strict";
    console.log(err);
  });
