/**
 * Created by lenovo on 2017/4/29.
 */

'use strict';

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

async function getTitle() {
  const exec = require('child_process').exec;
  let title;
  let roomNumber = 570284;

  return new Promise((resolve, reject) => {
    exec(`phantomjs crawl.js ${roomNumber}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        reject(err);
      }

      // 这里还需要检查一下title
      title = stdout;

      resolve(title);

    });
  })

}

(async function () {

  let title = getTitle();
  console.log(title);

}());