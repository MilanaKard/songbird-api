"use strict"

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/api', router.routes);


module.exports.handler = serverless(app);

