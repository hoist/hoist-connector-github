import GithubConnector from './connector';

/**
 * Hoist Connector Hooks for connecting to GitHub
 */
export default class GithubConnectorHooks {

  /**
   * create a new hook base
   * @param {object} configuration - the configuration properties to use
   */
  constructor(settings) {
    this._connector = new GithubConnector(settings);
  }

  getRepositories(count = 100) {
    return this._connector.get('/user/repos?per_page=' + count);
  }

  watch(endpoint) {
    //Watch an endpoint
    return true;
  }

  stop(endpoint) {
    //Stop watching an endpoint
  }

}

module.exports = GithubConnectorHooks;
