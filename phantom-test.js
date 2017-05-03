/**
 * Created by lenovo on 2017/5/2.
 */

var page = require('webpage').create();
var url = 'https://www.douyu.com/85963';
var cookies = 'acf_uid=128279926; acf_username=128279926; acf_nickname=%E6%B8%A9%E5%B7%9E%E9%80%8D%E9%81%A5%E7%82%AE; acf_own_room=0; acf_groupid=1; acf_phonestatus=1; acf_avatar=https%3A%2F%2Fapic.douyucdn.cn%2Fupload%2Favatar%2Fdefault%2F09_; acf_ct=0; acf_ltkid=24741192; acf_biz=1; acf_stk=1b39d5945310e00a; _dys__dypay_fp=1; _dys_lastPageCode=page_studio_normal,page_studio_normal; acf_did=7CE8CC054F02DB724445C7DFE3538023; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1493711452; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1493713777; _dys_refer_action_code=show_title_phone';

cookies = cookies.split('; ');

for (var i = 0; i < cookies.length; i += 1) {
  var coo = cookies[i];
  coo = coo.split('=');
  cookies[i] = {
    'name': coo[0],
    'value': coo[1],
    'path': '/',
    'domain': '.douyu.com'
  };
  // console.log(coo[0], coo[1]);
  phantom.addCookie(cookies[i]);
}

page.open(url, function () {
  "use strict";

  var len = page.evaluate(function () {
    var followList = document.querySelector('ul.f-list');
    var oFollow = $('.o-follow');
    oFollow.mouseover();
    var oLogin = $('.o-login');
    oLogin.mouseover();
  });

  console.log(len);

  setTimeout(function () {
    page.render('./pics/douyu.png'); // 截图
    phantom.exit();
  }, 1000); // 设置了超长的等待时间

});


// (function waitfor() {
//
//   var olNum = page.evaluate(function () {
//     return $("[data-anchor-info='ol-num']").text();
//   });
//
//   if (!!olNum) {
//     console.log(olNum);
//     return;
//   }
//
//   console.log("wait....", olNum);
//   setTimeout(waitfor, 200);
// }())