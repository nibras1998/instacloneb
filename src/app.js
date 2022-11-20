const express = require('express');
const app = express();
const post = require('./routes/route.js');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require("path")

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.json());
app.use('/',post)
module.exports = app;