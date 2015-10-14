'use strict';

import request from 'supertest';


describe('POST /api/tests', () => {
  let server;
  let state;

  beforeEach(() => {
    delete require.cache[require.resolve('../../build/server/server')];
    server = require('../../build/server/server');

    state = {
      name: 'a-test-to-be-created',
      code: `console.log('some code);`
    }
  })

  afterEach(done => {
    server.close(done);
  })


  it('should respond with 200 ok when an assertion test is created successfully', done => {

    request(server)
      .put('/api/names')
      .send(state)
      .set('Accept', 'application/json')
      .expect(200, {status: 'ok', url: `http://assertion.me/${state.name}`})
      .end(err => done(err));
  })

  it('should respond with 400 VALIDATION_ERROR when the name is not formatted correctly', done => {
    let incorrect = {
      name: 'a test-to-be-created ? that valid is not ',
      code: `console.log('some code);`
    }

    request(server)
      .put('/api/names')
      .send(incorrect)
      .set('Accept', 'application/json')
      .expect(400, {status: 'VALIDATION_ERROR'})
      .end(err => done(err));
  })

})
