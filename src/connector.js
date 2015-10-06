import {
  OAuth2ConnectorBase
}
from '@hoist/oauth-connector';
import {
  merge
}
from 'lodash';

let overrides = {
  baseSite: 'https://github.com/login'
};
let apiBaseUri = 'https://api.github.com'
  /**
   * A Hoist Connector for connecting to GitHub
   * @extends {OAuth2ConnectorBase}
   */
export default class GitHubConnector extends OAuth2ConnectorBase {

  /**
   * create a new connector
   * @param {object} configuration - the configuration properties to use
   * @param {string} configuration.clientId - the OAuth2 client id
   * @param {string} configuration.clientSecret - the OAuth2 client secret
   */
  constructor(configuration) {
    super(merge({}, configuration, overrides));
    this._clientId = configuration.clientId;
  }

  /**
   * @private
   * @param AuthorizationStore authorization the users authorisation store
   * @returns Promise<object> an object containing key value pairs to send with the client to the authorization url
   */
  _authorizeParams(authorization) {
    return super._authorizeParams(authorization)
      .then((params) => {
        return Promise.resolve(Math.round(Math.random() * 5000000))
          .then((r) => {
            return authorization.set('state', r).then(() => {
              params.state = r;
              return params;
            });
          });
      });
  }
  get(path) {
    let uri = `${apiBaseUri}${path}`;
    return this._performRequest('GET', uri).then((result) => {
      return JSON.parse(result[0]);
    });
  }
}

/**
 * @external {OAuth2ConnectorBase} https://github.com/hoist/oauth-connector/blob/master/src/oauth2_connector.js
 */
