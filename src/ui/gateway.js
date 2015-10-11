'use strict';

import {Promise} from 'es6-promise';
import request from 'browser-request';


export function create(state) {
  return new Promise((resolve, reject) => {
    let opts = {
      url: '/api/tests',
      method: 'POST',
      body: JSON.stringify(state),
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

export function unique(val) {
  return new Promise((resolve, reject) => {
    let opts = {
      url: '/api/names',
      method: 'PUT',
      body: JSON.stringify({data: val}),
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