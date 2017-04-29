/**
 * Created by lenovo on 2017/4/29.
 */

'use strict';

// const phantom = require('phantom');
//
// (async function () {
//   const instance = await phantom.create();
//   const page = await instance.createPage();
//
//   console.log('进来了');
//
//   let baseUrl = '//www.douyu.com/';
//   let roomNumber = 85963; // 房间号
//
//   let url = baseUrl + roomNumber;
//
//   await page.open('http://www.douyu.com/85963', function (requestData) {
//     console.info('Requesting', requestData.url);
//   });
//
//   await instance.exit();
// }());

const phantom = require('phantom');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();

  let baseUrl = 'https://www.douyu.com/';
  let roomNumber = '85963';

  let url = baseUrl + roomNumber;

  await page.on('onResourceRequested', function (requestData) {
    // console.info('Requesting: ', requestData.url);
  });

  const status = await page.open(url);
  console.log(status);

  const content = await page.property('content');
  // console.log(content);

  await instance.exit();
});

const exec = require('child_process').exec;
let title;
let roomNumber = 570284;

exec(`phantomjs crawl.js ${roomNumber}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  title = stdout;

  console.log(title);

});
