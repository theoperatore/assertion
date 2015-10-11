'use strict';

import express from 'express';
import debug from 'debug';


const router = express.Router();
const log = debug('static');

router.use('/', (req, res, next) => {
  if (!req.originalUrl.match(/api/g)) {
    log(`[${req.method}] ${req.originalUrl}`);
  }

  next();
})


// export route
export {router as logger}