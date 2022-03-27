const express = require('express');
const { getAllSecret, addASecret, getSecret } = require('./secrets.controller');
const secretsRouter = express.Router();

secretsRouter.get('/secrets', getAllSecret);
secretsRouter.get('/secrets/:hash', getSecret);
secretsRouter.post('/secrets', addASecret);

module.exports = secretsRouter;