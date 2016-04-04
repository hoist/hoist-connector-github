'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* globals UI */

var C = UI.Views.Connector;

var EditForm = function (_React$Component) {
  _inherits(EditForm, _React$Component);

  function EditForm(props) {
    _classCallCheck(this, EditForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditForm).call(this, props));

    _this.getRepos = _this.getRepos.bind(_this);
    _this.renderRepos = _this.renderRepos.bind(_this);
    _this.getEditView = _this.getEditView.bind(_this);
    _this.getConnectView = _this.getConnectView.bind(_this);
    _this.state = {
      events: [],
      repositories: []
    };
    if (!props.connector) {
      _this.state.mode = 'connect';
    }
    return _this;
  }

  _createClass(EditForm, [{
    key: 'connect',
    value: function connect() {
      this.props.onConnect();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.connectorInstance) {
        this.getRepos();
      }
    }
  }, {
    key: 'onSubscribe',
    value: function onSubscribe(item) {
      this.props.onSubscribe({
        event: item.option,
        subscribed: item.checked
      });
    }
  }, {
    key: 'renderRepos',
    value: function renderRepos() {
      var repos = (this.props.viewData.repositories || []).map(function (r, i) {
        return React.createElement(
          'option',
          { key: i, value: r.full_name },
          r.full_name
        );
      });
      console.log(this.props.settings.SubscriptionRepository, 'really??');
      if (!this.props.settings.SubscriptionRepository) {
        repos.unshift(React.createElement(
          'option',
          { key: "empty" },
          'Select a Repository'
        ));
      }
      return React.createElement(
        'select',
        { defaultValue: this.props.settings.SubscriptionRepository, name: "SubscriptionRepository" },
        repos
      );
    }
  }, {
    key: 'getRepos',
    value: function getRepos() {
      this.props.connector.proxy('getRepositories', [100], 'repositories');
    }
  }, {
    key: 'getConnectView',
    value: function getConnectView() {
      var _this2 = this;

      return React.createElement(
        C.Page,
        _extends({ 'default': 'setup' }, this.props),
        React.createElement(
          C.Panel,
          { name: 'Setup', slug: 'setup' },
          React.createElement(UI.FormElements.Button, { text: 'Connect', type: 'large', onClick: function onClick() {
              return _this2.connect();
            } })
        ),
        React.createElement(
          C.Panel,
          { name: 'Events', slug: 'events' },
          React.createElement(C.PageHeader, {
            title: 'Events are available once you\'ve connected.' })
        )
      );
    }
  }, {
    key: 'getEditView',
    value: function getEditView() {
      var _this3 = this;

      return React.createElement(
        C.Page,
        _extends({ 'default': 'setup' }, this.props),
        React.createElement(
          C.Panel,
          { name: 'Setup', slug: 'setup' },
          React.createElement(
            'form',
            { onChange: function onChange(evt) {
                _this3.props.updateField(evt);
              }, onSubmit: function onSubmit(evt) {
                _this3.props.updateSettings(evt);
              } },
            React.createElement(
              'div',
              { style: { marginBottom: 30, paddingBottom: 30, borderBottom: '1px solid #F1F1F1', position: 'relative' } },
              React.createElement(C.PageHeader, {
                title: 'Choose the repositories you want to subscribe to.',
                subTitle: 'We\'ll create the webhook in the background for you.' }),
              this.props.viewData.repositories ? this.renderRepos() : React.createElement(
                'select',
                null,
                React.createElement(
                  'option',
                  null,
                  'Loading...'
                )
              )
            ),
            React.createElement(UI.FormElements.Button, { text: 'Save', type: 'large', onClick: this.props.updateSettings })
          ),
          React.createElement(UI.TextElements.Link, { text: 'or Reauthorize', onClick: this.connect })
        ),
        React.createElement(
          C.Panel,
          { name: 'Events', slug: 'events' },
          React.createElement(C.PageHeader, {
            title: 'Check the boxes of the events you want to subscribe to.',
            subTitle: 'Checking a box will automatically subscribe you to that event.' }),
          React.createElement(C.CheckboxGrid, {
            items: ['github:repo:update', 'github:new:commit'],
            checked: ['github:new:commit'],
            onChange: this.onSubscribe })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.props.connectorInstance ? this.getEditView() : this.getConnectView()
      );
    }
  }]);

  return EditForm;
}(React.Component);

exports.default = EditForm;

global.EditForm = EditForm;
//# sourceMappingURL=edit.js.map
