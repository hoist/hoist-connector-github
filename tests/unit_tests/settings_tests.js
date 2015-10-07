import GitHubConnector from '../../lib/connector';
import {
  expect
}
from 'chai';
describe('default settings', () => {
  let connector;
  it('exposes defaultSettings method', () => {
    return expect(GitHubConnector.defaultSettings).to.exist;
  });
})
