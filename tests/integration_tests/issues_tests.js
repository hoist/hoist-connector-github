import GitHubConnector from '../../lib/connector';
import config from 'config';
import {
  expect
}
from 'chai';
describe('issues api', function () {
  this.timeout(5000);
  describe('post issue', () => {
    let authorization;
    let _result;
    let connector;
    let title = "Issue created by Unit Test: " + new Date();
    before(() => {
      authorization = {
        store: {},
        get: function (key) {
          return this.store[key];
        },
        delete: function (key) {
          delete this.store[key];
          return Promise.resolve(null);
        },
        set: function (key, value) {
          this.store[key] = value;
          return Promise.resolve(null);
        },
        redirect: function () {
          console.log('redirect', arguments);
          return Promise.resolve(null);
        },
        done: function () {
          console.log('done', arguments);
          return Promise.resolve(null);
        }
      };
      connector = new GitHubConnector({
        clientId: config.get('clientId'),
        clientSecret: config.get('clientSecret')
      });
      authorization.set('AccessToken', config.get('accessToken'));
      connector.authorize(authorization)
      return connector.post('/repos/hoist-bot/test-repo/issues', {
          "title": title,
          "body": "This is a test issue from the Hoist connector unit tests"
        })
        .then((result) => {
          _result = result;
        });

    });
    it('returns correct response', () => {
      return expect(_result.title).to.eql(title);
    });
  });
  describe('get issues', () => {
    let authorization;
    let _result;
    let connector;
    before(() => {
      authorization = {
        store: {},
        get: function (key) {
          return this.store[key];
        },
        delete: function (key) {
          delete this.store[key];
          return Promise.resolve(null);
        },
        set: function (key, value) {
          this.store[key] = value;
          return Promise.resolve(null);
        },
        redirect: function () {
          console.log('redirect', arguments);
          return Promise.resolve(null);
        },
        done: function () {
          console.log('done', arguments);
          return Promise.resolve(null);
        }
      };
      connector = new GitHubConnector({
        clientId: config.get('clientId'),
        clientSecret: config.get('clientSecret')
      });
      authorization.set('AccessToken', config.get('accessToken'));
      connector.authorize(authorization)
      return connector.get('/repos/hoist-bot/test-repo/issues')
        .then((result) => {
          _result = result;
        });

    });
    it('returns correct response', () => {
      return expect(_result.length).to.be.greaterThan(0);
    });
  });
  describe('patch issue', () => {
    let authorization;
    let _result;
    let connector;
    before(() => {
      authorization = {
        store: {},
        get: function (key) {
          return this.store[key];
        },
        delete: function (key) {
          delete this.store[key];
          return Promise.resolve(null);
        },
        set: function (key, value) {
          this.store[key] = value;
          return Promise.resolve(null);
        },
        redirect: function () {
          console.log('redirect', arguments);
          return Promise.resolve(null);
        },
        done: function () {
          console.log('done', arguments);
          return Promise.resolve(null);
        }
      };
      connector = new GitHubConnector({
        clientId: config.get('clientId'),
        clientSecret: config.get('clientSecret')
      });
      authorization.set('AccessToken', config.get('accessToken'));
      connector.authorize(authorization)

      return connector.get('/repos/hoist-bot/test-repo/issues?state=open')
        .then((r) => {
          let uri = `/repos/hoist-bot/test-repo/issues/${r[0].number}`
          return connector.patch(uri, {
              "state": "closed"
            })
            .then((result) => {
              _result = result;
            }).catch((err) => {
              console.log(err);
            });
        });


    });
    it('returns correct response', () => {
      return expect(_result.state).to.eql('closed');
    });
  });
});
