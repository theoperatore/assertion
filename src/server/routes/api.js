'use strict';


import express from 'express';
import debug from 'debug';

import * as apiService from './services/api-service';


const log = debug('api');
const api = express.Router();


// Log all calls to the api
api.use((req, res, next) => {
  log(`[${req.method}] ${req.originalUrl}`);
  next();
})


// PUT: check for unique-ness
api.put('/names', (req, res) => {
  apiService.checkUnique(req, res);
})


// POST: create a new test
api.post('/tests', (req, res) => {
  apiService.createNew(req, res);
})


export {api as api};