/**
 * Created by lenovo on 2017/5/12.
 */

const express = require('express');
const moment = require('moment');
const morgan = require('morgan');
const app = express();
const router = express.Router();
const cors = require('cors');

app.use(morgan('common'));
app.use(cors({
  origin: ['http://localhost:3001'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', function (req, res) {
  res.json({status: 'My Api is alive!'});
});

app.listen(3000, function () {
  "use strict";
  console.log('3000 My Api is running...');
});

app.listen(3001, function () {
  "use strict";
  console.log('3001 My Api is running...');
});

module.exports = app;