'use strict';

import request from 'supertest';
import bootstrap from '../db-bootstrap';


describe('PUT /api/names', () => {
  let server;

  beforeEach(done => {
    delete require.cache[require.resolve('../../build/server/server')];
    server = require('../../build/server/server');
    bootstrap(done);
  })

  afterEach(done => {
    server.close(done);
  })


  it('should respond with 200 ok when a unique name is checked', done => {
    request(server)
      .put('/api/names')
      .send({name: 'A really cool test'})
      .set('Accept', 'application/json')
      .expect(200, {status: 'ok'})
      .end(err => done(err));
  })

  it('should respond with 409 NOT_UNIQUE when a name is already in the db', done => {
    let agent = request.agent(server);

    agent
      .put('/api/names')
      .send({name: 'not unique'})
      .set('Accept', 'application/json')
      .expect(409, {status: 'NOT_UNIQUE'})
      .end(err => done(err))
  })

  it('should respond with 400 VALIDATION_ERROR when the name is formatted incorrectly', done => {
    request(server)
      .put('/api/names')
      .send({name: 'a name that (may) contain some _extra_ characters?'})
      .expect(400, {status: 'VALIDATION_ERROR', invalid: ['(', ')', '_', '_', '?']})
      .end(err => done(err));
  })
})