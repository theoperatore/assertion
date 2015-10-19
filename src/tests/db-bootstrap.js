'use strict';

import nano from 'nano';

import * as config from '../build/server/config';
import * as util from '../build/server/routes/services/api-name-utils';

const URI = 'http://localhost:5984';
const DB_NAME = 'test';

let nan = nano(URI);


let givenTestName = 'not unique';
let testBody = { code: function testFn() { console.log(`I'm a test`); }, name: givenTestName};
let testName = util.normalize(givenTestName);


export default function (dbName, existingData, doneFn) {
  let db;
  let data;
  let done;

  if (!dbName) {
    throw new Error(`[bootstrapper] cannot call bootstrapper function without at least a DONE function...`);
  }

  // initialize some things...
  if (typeof dbName === 'function') {
    db = DB_NAME;
    data = [{name: testName, body: testBody}];
    done = dbName;
  }

  else if (typeof existingData === 'function') {
    if (typeof dbName !== 'string') {
      throw new Error(`[bootstrapper] cannot use: ${dbName} as database name. String required.`);
    }

    db = util.normalize(dbName);
    data = [{name: testName, body: testBody}];
    done = existingData;
  }

  else if (typeof doneFn === 'function') {
    if (typeof dbName !== 'string') {
      throw new Error(`[bootstrapper] cannot use: ${dbName} as database name. String required.`);
    }

    if (!existingData instanceof Array) {
      throw new Error(`[bootstrapper] cannot use: ${existingData.constructor.name} as defaultData. Array required.`); 
    }

    db = util.normalize(dbName);
    data = existingData;
    done = doneFn;
  }

  else {
    throw new Error(`[bootstrapper] insufficient arguments: bootstrap([databaseName, [existingData,]] doneCallback)`);
  }

  // override the config use for the server
  config.db = db;
  config.port = Math.round(Math.random() * 10000 + 9960);

  // boot strap the database
  nan.db.destroy(db, () => {
    nan.db.create(db, () => {
      let testdb = nan.use(db);

      let bulk = data.map(datum => {
        return { _id: util.md5(util.normalize(datum.name)), name: datum.name,  code: datum.body };
      })

      testdb.bulk({ docs: bulk }, done);
    })
  }) 
}
