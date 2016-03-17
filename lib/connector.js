'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _oauthConnector = require('@hoist/oauth-connector');

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var overrides = {
  baseSite: 'https://github.com/login'
};
var apiBaseUri = 'https://api.github.com';
/**
 * A Hoist Connector for connecting to GitHub
 * @extends {OAuth2ConnectorBase}
 */

var GitHubConnector = function (_OAuth2ConnectorBase) {
  _inherits(GitHubConnector, _OAuth2ConnectorBase);

  /**
   * create a new connector
   * @param {object} configuration - the configuration properties to use
   * @param {string} configuration.clientId - the OAuth2 client id
   * @param {string} configuration.clientSecret - the OAuth2 client secret
   * @param {string} [configuration.scope='user,repo,admin:repo_hook,notifications'] - a comma separated list of scopes to use https://developer.github.com/v3/oauth/#scopes
   */

  function GitHubConnector(configuration) {
    _classCallCheck(this, GitHubConnector);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GitHubConnector).call(this, (0, _lodash.merge)({}, configuration, overrides)));

    _this._clientId = configuration.clientId;
    _this._scopeString = configuration.scope || 'user,repo,admin:repo_hook,notifications';
    return _this;
  }

  /**
   * @private
   * @param AuthorizationStore authorization the users authorisation store
   * @returns Promise<object> an object containing key value pairs to send with the client to the authorization url
   */


  _createClass(GitHubConnector, [{
    key: '_authorizeParams',
    value: function _authorizeParams(authorization) {
      var _this2 = this;

      return _get(Object.getPrototypeOf(GitHubConnector.prototype), '_authorizeParams', this).call(this, authorization).then(function (params) {
        return Promise.resolve(Math.round(Math.random() * 5000000)).then(function (r) {
          return authorization.set('state', r).then(function () {
            params.state = r;
            params.scope = _this2._scopeString;
            return params;
          });
        });
      });
    }
  }, {
    key: 'get',
    value: function get(path) {
      var uri = '' + apiBaseUri + path;
      return this._performRequest('GET', uri).then(function (result) {
        return JSON.parse(result);
      });
    }
  }, {
    key: 'post',
    value: function post(path, body) {
      var uri = '' + apiBaseUri + path;
      return this._performRequest('POST', uri, body).then(function (result) {
        return JSON.parse(result);
      });
    }
  }, {
    key: 'patch',
    value: function patch(path, body) {
      var uri = '' + apiBaseUri + path;
      return this._performRequest('PATCH', uri, body).then(function (result) {
        return JSON.parse(result);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      var uri = '' + apiBaseUri + path;
      return this._performRequest('DELETE', uri);
    }
  }], [{
    key: 'defaultSettings',
    value: function defaultSettings() {
      return Promise.resolve({
        scope: 'user,repo,admin:repo_hook,notifications'
      });
    }
  }]);

  return GitHubConnector;
}(_oauthConnector.OAuth2ConnectorBase);

/**
 * @external {OAuth2ConnectorBase} https://doc.esdoc.org/github.com/hoist/oauth-connector/class/src/oauth2_connector.js~OAuth2ConnectorBase.html
 */


exports.default = GitHubConnector;
//# sourceMappingURL=connector.js.map
