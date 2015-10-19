'use strict';

import {Promise} from 'es6-promise';
import request from 'browser-request';


export function unique(val) {
  return new Promise((resolve, reject) => {
    let opts = {
      url: '/api/names',
      method: 'PUT',
      body: {name: val},
      json: true
    };

    request(opts, (err, res, body) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(body);
      }
    })
  })
}


export function create(state) {
  return new Promise((resolve, reject) => {
    let opts = {
      url: '/api/tests',
      method: 'POST',
      body: state,
      json: true
    };

    request(opts, (err, res, body) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(body);
      }
    })
  })
}