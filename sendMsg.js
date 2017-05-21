/**
 * Created by lenovo on 2017/5/21.
 */
"use strict";

const ApiClient = require('./sdk/index.js').ApiClient;

/**
 * @name sendMsg
 * @description 发送短信
 * @param opts
 * {
 *   appkey:                  必填
 *   appsecret:               必填
 *   extend:                  可选
 *   sms_free_sign_name:      必填
 *   sms_template_code:       必填
 *   sms_param:               必填
 *   {
 *     "param1": ...,
 *     "param2": ...,
 *     "param3": ...
 *   }
 *   rec_num:                 必填，只能发送一个号码，检查：能转为数字，并且长度为13位
 * }
 * @returns {Promise.<void>}
 */
async function sendMsg(opts) {

  let appkey = opts.appkey || 23843597,
      appsecret = opts.appsecret || 'a14d971678c5c1003dcde690de024a13',
      extend = opts.extend || '',
      sms_free_sign_name = opts.sms_free_sign_name || 'i主播',
      sms_template_code = opts.sms_template_code || 'SMS_67625144',
      sms_param = opts.sms_param,
      rec_num = opts.rec_num
  ;

  sms_param.an = `\"${sms_param.an}\"`;
  sms_param.rn = sms_param.rn.replace(/[^\-a-zA-Z0-9\u4e00-\u9fa5]/g, ' ');
  sms_param.rn = `\"${sms_param.rn}\"`;
  console.log(sms_param.an, Buffer.byteLength(sms_param.rn));
  console.log(sms_param.rn);

  sms_param = JSON.stringify(sms_param);

  let client = new ApiClient({
    'appkey': appkey,
    'appsecret': appsecret,
    'REST_URL': 'http://gw.api.taobao.com/router/rest',
  });

  return await new Promise(function (resolve, reject) {

    client.execute('alibaba.aliqin.fc.sms.num.send', {

      'extend': extend,
      'sms_type': 'normal',
      'sms_free_sign_name': sms_free_sign_name,
      'sms_param': sms_param,
      'rec_num': rec_num, // 电话号码 15979149311
      'sms_template_code': sms_template_code, // 模板CODE

    }, function (err, res) {

      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }

    });

  });

}

module.exports = sendMsg;