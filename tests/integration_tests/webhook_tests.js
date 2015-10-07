import GitHubConnector from '../../lib/connector';
import config from 'config';
import {
  expect
}
from 'chai';
describe('webhook api', function () {
  this.timeout(5000);
  describe('create a webhook', () => {
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
      return connector.post('/repos/hoist-bot/test-repo/hooks', {
          "name": 'web',
          "config": {
            "url": "https://endpoint.hoi.test/test-hook-" + Math.random() * 2000,
            "content_type": "json"
          },
          "events": [
            "*"
          ]
        })
        .then((result) => {
          _result = result;
        });

    });
    it('creates the webhook', () => {
      return expect(_result.name).to.eql('web');
    });
  });
  describe('list webhook', () => {
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
      return connector.get('/repos/hoist-bot/test-repo/hooks')
        .then((result) => {
          _result = result;
        });

    });
    it('returns the webhook', () => {
      return expect(_result.length).to.be.greaterThan(0);
    });
  });
  describe('delete webhook', () => {
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
      return connector.get('/repos/hoist-bot/test-repo/hooks')
        .then((result) => {
          var uri = `/repos/hoist-bot/test-repo/hooks/${result[0].id}`
          return connector.delete(uri);
        }).then((result) => {
          _result = result;
        });

    });
    it('returns the webhook', () => {
      return expect(_result[0]).to.eql('');
    });
  });
});
