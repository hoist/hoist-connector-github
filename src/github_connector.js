import OAuth2Connector from './oauth2_connector';
import {
  merge
}
from 'lodash';

let overrides = {
  baseSite: 'https://github.com/login'
};

/**
 * A Hoist Connector for connecting to GitHub
 * @extends {OAuth2Connector}
 */
export default class GitHubConnector extends OAuth2Connector {

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
}
