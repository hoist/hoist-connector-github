import GitHubConnector from '../../lib/github_connector';
import sinon from 'sinon';
import {
  expect
}
from 'chai';
describe('authorization steps', () => {
  let connector;
  let clientId = 'clientId';
  let clientSecret = 'clientSecret';
  before(() => {
    connector = new GitHubConnector({
      clientId,
      clientSecret
    });
  });
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
      return expect(bounce.redirect).to.have.been.calledWith(`https://github.com/login/oauth/authorize?redirect_uri=https%3A%2F%2Fbouncer.hoist.io%2Fbounce&state=${bounce.set.getCall(0).args[1]}&client_id=${clientId}`);
    });
  });
});
