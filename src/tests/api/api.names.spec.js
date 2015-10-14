'use strict';

import request from 'supertest';


describe('PUT /api/names', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('../../build/server/server')];
    server = require('../../build/server/server');
  })

  afterEach(done => {
    server.close(done);
  })


  it('should respond with 200 ok when a unique name is checked', done => {
    request(server)
      .put('/api/names')
      .send({name: 'a-unique-name'})
      .set('Accept', 'application/json')
      .expect(200, {status: 'ok'})
      .end(err => done(err));
  })

  it('should respond with 409 NOT_UNIQUE when a name is already in the db', done => {
    let agent = request.agent(server);

    agent
      .put('/api/names')
      .send({name: 'not-unique'})
      .set('Accept', 'application/json')
      .expect(200, {status: 'ok'})
      .end(() => {})

    agent
      .put('/api/names')
      .send({name: 'not-unique'})
      .set('Accept', 'application/json')
      .expect(409, {status: 'NOT_UNIQUE'})
      .end(err => done(err))
  })

  it('should respond with a unique URL if there is a name conflict', done => {
    let agent = request.agent(server);

    agent
      .put('/api/names')
      .send({name: 'not-unique'})
      .set('Accept', 'application/json')
      .expect(200, {status: 'ok'})
      .end(() => {})

    agent
      .put('/api/names')
      .send({name: 'not-unique'})
      .set('Accept', 'application/json')
      .expect(409, {status: 'NOT_UNIQUE', unique: `not-unique-1`})
      .end(err => done(err))
  })

  it ('should respond with 400 VALIDATION_ERROR when the name is formatted incorrectly', done => {
    request(server)
      .put('/api/names')
      .send({name: 'a n(ame-that-is-not formatted ?'})
      .expect(400, {status: 'VALIDATION_ERROR'})
      .end(err => done(err));
  })
})