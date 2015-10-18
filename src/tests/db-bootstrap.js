'use strict';

import nano from 'nano';
import crypto from 'crypto';

const URI = 'http://localhost:5984';
const DB_NAME = 'test';

let nan = nano(URI);


let testCode = { testFn() { console.log(`I'm a test`); }, name: 'not unique'};
let testName = crypto.createHash('md5').update('not-unique').digest('hex');


export default function (done) {
  nan.db.destroy(DB_NAME, () => {
    nan.db.create(DB_NAME, () => {
      let testdb = nan.use(DB_NAME);


      testdb.insert(testCode, testName, done);
    })
  }) 
}
