/**
 * Created by lenovo on 2017/5/2.
 */

// const liveState = require('./liveState');
const liveState = require('./getLiveState');
const room_numbers = {
  'paoge': 85963,       // 温州炮哥
  'qishifu': 17732,     // 7师傅
  'shisanyi': 69752,    // 十三姨
  'chenyifaer': 67373,  // 陈一发儿
  'qige': 65251,        // 七哥
  'jianyan': 656971,    // 简言
  'jinyutong': 2094956, // 金玉童童童
  // 'huodong': 't/SGPG',  // 活动页
  'huodong2': 8,        // 活动页
};
const len = Object.keys(room_numbers).length;

let promises = [];

let count = 0;

// 单个测试
(function () {
  "use strict";
  liveState(room_numbers.huodong2)
    .then(function (v) {
      "use strict";
      console.log(v);
    })
    .catch(function (err) {
      "use strict";
      console.log('ERROR:', err);
    });
}());

// 群体放养式多个Promise测试
(function () {
  "use strict";
  let start1 = Date.now();
  (function () {
    "use strict";
    for (let k in room_numbers) {

      // console.log(k, await liveState(room_numbers[k]));
      liveState(room_numbers[k])
        .then(function (v) {
          count ++;

          let end = Date.now() - start1;
          console.log(v);
          console.log('Total:', end);
          console.log('Average:', end / count);
        }, function (reject) {
          console.log('ERROR:', reject);
        });
    }
    // let end = Date.now() - start1;
    // console.log('await:', end);
    // console.log(`Average: ${end / len}`);
  }());
});


// 放养式Promise.all测试
// for (let k in room_numbers) {
//   promises.push(liveState(room_numbers[k]));
// }
//
// let start2 = Date.now();
// Promise.all(promises).then(values => {
//   "use strict";
//   console.log(values);
//   let end = Date.now() - start2;
//   console.log('Promise.all:', end);
//   console.log(`Average: ${end / len}`);
// });


