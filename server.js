/**
 * Created by lenovo on 2017/5/12.
 */

const http = require('http');
const server = http.createServer( (req, res) => {
  "use strict";

});

server.listen(80, function () {
  "use strict";
  console.log('now listen port 80...');
})