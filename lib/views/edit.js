"use strict";

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

    _this.state = {
      events: []
    };
    if (!props.connector) {
      _this.state.mode = 'connect';
    }
    return _this;
  }

  _createClass(EditForm, [{
    key: "connect",
    value: function connect() {
      this.props.onConnect();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        C.Page,
        _extends({ "default": "setup" }, this.props),
        React.createElement(
          C.Panel,
          { name: "Setup", slug: "setup" },
          React.createElement(UI.FormElements.Button, { text: this.props.connectorInstance ? 'Reauthorize' : 'Connect', type: "large", onClick: function onClick() {
              return _this2.connect();
            } })
        ),
        this.props.connectorInstance ? React.createElement(
          C.Panel,
          { name: "Events", slug: "events" },
          React.createElement(
            "div",
            { style: {
                borderBottom: '1px solid #F1F1F1',
                marginBottom: '25px'
              } },
            React.createElement(
              "span",
              { style: {
                  fontSize: 15,
                  color: '#666666',
                  display: 'block',
                  marginBottom: 5
                } },
              "Check the boxes of the events you want to subscribe to."
            ),
            React.createElement(
              "span",
              { style: {
                  fontSize: 11,
                  color: '#B3B3B3',
                  display: 'block',
                  marginBottom: 20
                } },
              "Checking a box will automatically subscribe you to that event."
            )
          ),
          React.createElement(C.EventsGrid, {
            events: ['github:repo:update', 'github:new:commit'],
            subscriptions: ['github:new:commit'],
            onSubscribe: this.props.onSubscribe })
        ) : React.createElement(
          C.Panel,
          { name: "Events", slug: "events" },
          "Come back later for Events"
        )
      );
    }
  }]);

  return EditForm;
}(React.Component);

exports.default = EditForm;

global.EditForm = EditForm;
//# sourceMappingURL=edit.js.map
