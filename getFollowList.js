/**
 * Created by lenovo on 2017/5/31.
 */

const rp = require('request-promise');

let uri = 'https://www.douyu.com/member/cp/get_follow_list';

let options = {
  uri: uri,
  json: false, // don't let the request-promise parse the JSON string
  headers: {
    Cookie: 'PHPSESSID=icfqjen9p7lv34jqj737t5rc71; acf_devid=9b50d01af845cb2c7bf7b0f4cf8160db; frm=zb-ysxf-q15; ext=1%257C1258%257C90%257Czb-ysxf-q15; fdata=zbj%7C%7C%3Bzb-ysxf-q15%7C%7C%3B%7C%7C%3B33774llllgc%7C%7C%3B5015%7C%7C%3B6260%7C%7C%3B1%257C1258%257C90%257Czb-ysxf-q15; acf_auth=51fahjo0kwSBEuxnDfAraBrH3kVd9UIeJt1TGRCquZiAwT6U73IhW6wGXW0j6okTAQK50Y62FilwuxAInU6H5iGkUJXHboTtwoskngJNBGbE%2F2VFdy6cbeqM19V4Ag; wan_auth37wan=545031e9e3033GLSXkKZJ3EcPkzMR0olHtHnJPhMFf8c9QOdEXugAYB9C0nCVJKhMcT2SMKeYyKzSgVr2TCr7VYHA5jRrhj03rBie23Q2gXvd0UiSg; acf_uid=19253667; acf_username=auto_WDMBXc4eqU; acf_nickname=mingttong; acf_own_room=0; acf_groupid=1; acf_phonestatus=1; acf_avatar=https%3A%2F%2Fapic.douyucdn.cn%2Fupload%2Favatar%2Fface%2F201605%2F11%2F65d1a1895068458b736400f0a4549e84_; acf_ct=0; acf_ltkid=96934169; acf_biz=1; acf_stk=4b5e5448a93db3c0; _dys_lastPageCode=page_studio_normal,page_studio_normal; acf_did=25F7ACDC11EE476933BF3215978599AC; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1494685856,1495689383,1495970278; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1496153032; _dys_refer_action_code=show_page_staydur',
  }
};

rp(options)
  .then(function (res) {
    "use strict";
    console.log(res);
    console.log(Buffer.byteLength(res));
  })
  .catch(function (err) {
    "use strict";
    console.log(err);
  });

