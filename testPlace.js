/**
 * Created by lenovo on 2017/5/2.
 */

const liveState = require('./liveState');
const room_numbers = {
  'paoge': 85963,       // 温州炮哥
  'qishifu': 17732,     // 7师傅
  'shisanyi': 69752,    // 十三姨
  'chenyifaer': 67373,  // 陈一发儿
  'qige': 65251,        // 七哥
  'jianyan': 656971,    // 简言
  'jinyutong': 2094956, // 金玉童童童
};

(async function () {
  "use strict";

  // for (let k in room_numbers) {
  //   console.log(k, await liveState(room_numbers[k]));
  // }
  console.log(await liveState(room_numbers.paoge));

}());