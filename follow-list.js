/**
 * Created by lenovo on 2017/5/1.
 */

const phantom = require('phantom');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  // await page.on("onResourceRequested", function(requestData) {
  //   console.info('Requesting', requestData.url)
  // });

  const status = await page.open('https://www.douyu.com/85963');
  console.log(status);

  // const content = await page.property('content');
  // console.log(content);

  await page.evaluate(function () {
    "use strict";
    return $("[data-anchor-info='ol-num']").val();
  }).then(function (resolve) {
    "use strict";
    console.log(resolve);
  });

  await instance.exit();
}());