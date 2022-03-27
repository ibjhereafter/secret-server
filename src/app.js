const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();

const secretsRouter = require('../src/routes/secrets/secrets.router');

app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://secret-server-ui.vercel.app' ]} ));
app.use(logger('dev'));
app.use(express.json());

app.use(secretsRouter);

module.exports = app;
