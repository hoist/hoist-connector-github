import GitHubConnector from '../../lib/connector';
import config from 'config';
import {
  expect
}
from 'chai';
describe('get repositories', function () {
  this.timeout(5000);
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
    return connector.get('/user/repos?per_page=10')
      .then((result) => {
        _result = result;
      });

  });
  it('returns public and private repositories', () => {
    return expect(_result.map((repo) => repo.name)).to.contain('api.hoi.io');
  });
});
