import GitHubConnector from '../../lib/connector';
import sinon from 'sinon';
import config from 'config';
import {
  expect
}
from 'chai';
import Nightmare from 'nightmare';
import url from 'url';

describe('authorization steps', () => {
  let connector;
  let clientId = config.get('clientId');
  let clientSecret = config.get('clientSecret');
  let nightmare;
  before(() => {
    nightmare = Nightmare();
    connector = new GitHubConnector({
      clientId,
      clientSecret
    });

  });
  after(function () {
    return nightmare.end();
  })
  describe('on first bounce', () => {
    let bounce;
    before(() => {
      bounce = {
        get: function () {
          return undefined;
        },
        delete: function () {
          return Promise.resolve(null);
        },
        set: function () {
          console.log('set', arguments);
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
      sinon.spy(bounce, 'get');
      sinon.spy(bounce, 'set');
      sinon.spy(bounce, 'redirect');
      return connector.receiveBounce(bounce);
    });
    it('should save state', () => {
      return expect(bounce.set).to.have.been.calledWith('state');
    });
    it('should save current step', () => {
      return expect(bounce.set).to.have.been.calledWith('currentStep', 'authorization');
    });
    it('should receive a redirect', () => {
      return expect(bounce.redirect).to.have.been.calledWith(`https://github.com/login/oauth/authorize?redirect_uri=https%3A%2F%2Fbouncer.hoist.test%2Fbounce&state=${bounce.set.getCall(0).args[1]}&client_id=${clientId}`);
    });
  });
  describe('on return from github', function () {
    let bounce;
    this.timeout(10000);
    let uri;

    before(() => {

      bounce = {
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
      sinon.spy(bounce, 'get');
      sinon.spy(bounce, 'set');
      sinon.spy(bounce, 'redirect');
      return Promise.resolve(connector.receiveBounce(bounce))
        .then(function () {
          let authorizeUri = bounce.redirect.getCall(0).args[0];
          return Promise.resolve(nightmare.goto(authorizeUri));
        }).then(() => {
          return Promise.resolve(nightmare.type('#login_field', config.get('username'))
            .type('#password', config.get('password'))
            .click('[name="commit"]'));
        }).then(() => {
          return Promise.resolve(nightmare.wait('#message').url());
        }).then((u) => {
          uri = url.parse(u, true);
          bounce.query = uri.query;
        }).then(() => {
          return connector.receiveBounce(bounce);
        });

    });
    it('should save state', () => {
      return expect(bounce.store['AccessToken']).to.exist;
    });
  })
});
