'use strict';

import crypto from 'crypto';
import debug from 'debug';

const log = debug('api:service');


// crypto hashing function
function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

// normalize before hasing
function normalize(text) {
  return text.toLowerCase().trim().replace(/[\s+\W+]+$/g, '').replace(/[\s+\W+]+/g, '-');
}

// returns false on text containing non-alphanumeric characters
function validate(text) {
  return text.match(/[^\s\w]|\_/g);
}


// check unique name
function checkUnique(req, res) {
  let invalidChars = validate(req.body.name);
  let normalized = normalize(req.body.name);
  let hashName = md5(normalized);

  if (invalidChars) {
    log('invalid', req.body.name);
    res.status(400).send({status: 'VALIDATION_ERROR', invalid: invalidChars});
    return;
  }

  req.app.locals.db.get(hashName, (err, body) => {
    if (err) {
      if (err.statusCode === 404) {
        res.status(200).send({status: 'ok'});
        return;
      }
      
      log('unknown error has occurred', err);
      res.status(err.statusCode).send({status: 'UNKOWN_ERROR', message: err.message});
      return;
    }


    if (body) {
      res.status(409).send({status: 'NOT_UNIQUE'});
      return;
    }

    log('unknown error has occurred [err, body]', err, body);
    res.status(500).send({status: 'UNKNOWN_ERROR'});
  })
}


// create new entry in database
function createTest(req, res) {
  res.status(501).end();

  // req.app.locals.db.insert({code: req.body.code}, req.body.name, (err, body) => {
  //   if (!err) {
  //     log(`successfully saved ${req.body.name}`);
  //     res.status(200).send({status: 'ok', url: `http://assertion.me/${req.body.name}`});
  //   }
  //   else {
  //     log('ERROR:', err);
  //     res.status(500).send({status:'SERVER_ERROR', message: err.message})
  //   }
  // })
}

export {checkUnique};