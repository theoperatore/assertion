'use strict';

import crypto from 'crypto';
import debug from 'debug';
import {validate, normalize, md5, duplicate} from './api-name-utils';

const log = debug('api:service');

// check unique name
function checkUnique(req, res) {
  let invalidChars = validate(req.body.name);
  let normalized = normalize(req.body.name);
  let hashName = md5(normalized);

  if (invalidChars) {
    log('invalid name', req.body.name);
    res.status(400).send({status: 'VALIDATION_ERROR', invalid: invalidChars});
    return;
  }

  req.app.locals.db.list((err, body) => {
    if (!err) {
      if (duplicate(hashName, body.rows)) {
        res.status(409).send({status: 'NOT_UNIQUE'});
        return;
      }

      res.status(200).send({status: 'ok'});
      return;
    }

    log('db error has occurred [err, body]', err, body);
    res.status(err.statusCode).send({status: 'DB_ERROR', message: err.message});
  })
}


// create new entry in database
function createNew(req, res) {
  let invalidChars = validate(req.body.name);
  let normalized = normalize(req.body.name);
  let hashName = md5(normalized);

  if (invalidChars) {
    log('invalid name', req.body.name);
    res.status(400).send({status: 'VALIDATION_ERROR', invalid: invalidChars});
    return;
  }

  req.app.locals.db.list((err, body) => {
    if (!err) {
      if (duplicate(hashName, body.rows)) {
        res.status(409).send({status: 'NOT_UNIQUE'});
        return;
      }

      // insert into db
      req.app.locals.db.insert({ name: req.body.name, code: req.body.code}, hashName, (insertErr, insertBody) => {
        if (!insertErr) {
          log(`created test: ${req.body.name}`);
          res.status(200).send({status: 'ok', url: normalized});
          return;
        }

        log('db error has occurred [err, body]', insertErr, insertBody);
        res.status(err.statusCode).send({status: 'DB_ERROR', message: insertErr.message});
        return;
      })
    }
  })
}

export {checkUnique, createNew};