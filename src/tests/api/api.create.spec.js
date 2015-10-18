'use strict';

import request from 'supertest';
import bootstrap from '../db-bootstrap';


describe.only('POST /api/tests', () => {
  let server;
  let state;
  let duplicate;

  before(() => {
    state = {
      name: 'a test to be created',
      code: `console.log('some code');`
    }

    duplicate = {
      name: 'not unique',
      code: `console.log('some code');`
    }
  })

  beforeEach(done => {
    delete require.cache[require.resolve('../../build/server/server')];
    server = require('../../build/server/server');
    bootstrap(done);
  })

  afterEach(done => {
    server.close(done);
  })


  it('should respond with 200 ok when an assertion test is created successfully', done => {

    request(server)
      .post('/api/tests')
      .send(state)
      .set('Accept', 'application/json')
      .expect(200, {status: 'ok', url: `http://assertion.me/${state.name}`})
      .end(err => done(err));
  })


  it('should respond with 409 NOT_UNIQUE if there is already a test with that name', done => {
    request(server)
      .post('/api/tests')
      .send(duplicate)
      .set('Accept', 'application/json')
      .expect(409, {status: 'NOT_UNIQUE'})
      .end(err => done(err));
  })


  it('should respond with 400 VALIDATION_ERROR when the name is not formatted correctly', done => {
    let incorrect = {
      name: 'a test to be created ? that (valid) is not',
      code: `console.log('some code');`
    }

    request(server)
      .post('/api/tests')
      .send(incorrect)
      .set('Accept', 'application/json')
      .expect(400, {status: 'VALIDATION_ERROR', invalid: ['?', '(', ')']})
      .end(err => done(err));
  })

})
