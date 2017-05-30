/**
 * Created by lenovo on 2017/5/2.
 */

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
  'huodong2': 8,        // 活动页
  'businiao': 610588,   // 不死鸟3DM
  'shunvjia': 570284,   // 淑女佳
  'jianianhua': 6,  // 斗鱼嘉年华
  'nvtuan': 231464, // 女团轮播
  'diyiwuniang': 265688, // 斗鱼第一舞娘
};

let count = 0;
let start = Date.now();
let totalTime = 0;

// getAnchorInfo({
//   room_id: room_ids['chenyifaer'],
// })
//   .then(function (info) {
//     "use strict";
//     console.log(info);
//   })
//   .catch(function (err) {
//     "use strict";
//     console.log(err);
//   });

for (let k in room_ids) {
  getAnchorInfo({
    room_id: room_ids[k],
  })
    .then(function (info) {
      "use strict";
      count += 1;
      totalTime += Date.now() - start;
      start = Date.now();
      // if (info.show_status === true) {
      //   sendMsg({
      //     sms_param: {
      //       un: '周吾南',
      //       rn: info.room_name,
      //       an: info.owner_name,
      //     },
      //     rec_num: 18515220443
      //   }).catch(function (err) {
      //     console.log(err);
      //   });
      // }
      console.log(info);
      console.log(totalTime / count);
    })
    .catch(function (err) {
      "use strict";
      console.log(err);
    });
}

