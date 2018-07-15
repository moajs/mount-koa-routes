const supertest = require('supertest');
const should = require('should');
const app = require('../server');

const request = supertest.agent(app.listen());

function run({path, method = 'get', result, done}) {
  request[method](path)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.text);
        should(res.text).equal(result);
        done();
      });
}

describe('prefix a test', () => {
  it('route / test', (done) => {
    run({
      path: '/a',
      result: 'this /1!',
      done,
    })
  });
  it('route /2 test', (done) => {
    run({
      path: '/a/2',
      result: 'this /2!',
      done,
    })
  });
  it('route /users test', (done) => {
    run({
      path: '/a/users',
      result: 'this a users response!',
      done,
    })
  });
});

describe('no prefix test', () => {
  it('route get / test', (done) => {
    run({
      path: '/',
      result: 'this /1!',
      done,
    })
  });
  it('route post / test', (done) => {
    run({
      path: '/',
      result: 'this post /1!',
      done,
      method: 'post',
    })
  });
  it('route /2 test', (done) => {
    run({
      path: '/2',
      result: 'this /2!',
      done,
    })
  });
  it('route /users test', (done) => {
    run({
      path: '/users',
      result: 'this a users response!',
      done,
    })
  });
  it('route /api test', (done) => {
    run({
      path: '/api',
      result: 'this a /api response!',
      done,
    })
  });
  it('route /api/users/2 test', (done) => {
    run({
      path: '/api/users/2',
      result: 'this a /api/users/2  post response!',
      done,
      method: 'post',
    })
  });
});