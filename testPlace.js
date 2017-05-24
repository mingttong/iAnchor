/**
 * Created by lenovo on 2017/5/2.
 */

// const liveState = require('./liveState');
const getAnchorInfo = require('./getAnchorInfo');
const sendMsg = require('./sendMsg');

const room_ids = {
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
};

let count = 0;
let start = Date.now();
let totalTime = 0;

for (let k in room_ids) {
  getAnchorInfo({
    room_id: room_ids[k],
  })
    .then(function (info) {
      "use strict";
      count += 1;
      totalTime += Date.now() - start;
      start = Date.now();
      console.log(info);
      console.log(totalTime / count);
    })
    .catch(function (err) {
      "use strict";
      console.log(err);
    });
}

