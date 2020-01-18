"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InlineInput =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineInput, _Component);

  function InlineInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InlineInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InlineInput)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      editing: false,
      inputEl: _react["default"].createRef(),
      selectedIndex: _this.props.options.findIndex(function (_ref) {
        var value = _ref.value;
        return value === _this.props.value;
      })
    };

    _this.toggle = function () {
      _this.setState({
        editing: !_this.state.editing
      }, function () {
        var _this$state = _this.state,
            editing = _this$state.editing,
            inputEl = _this$state.inputEl;
        if (editing) inputEl.current.focus();
      });
    };

    _this.handleEnter = function (e) {
      if (e.keyCode === 13) _this.state.inputEl.current.blur();
    };

    _this.handleBlur = function () {
      var onBlur = _this.props.onBlur;

      _this.toggle();

      if (onBlur) onBlur();
    };

    _this.handleInput = function (e) {
      _this.emitValue(_this.state.isNumber ? +e.target.value : e.target.value);
    };

    _this.handleChange = function (e) {
      var selectedIndex = _this.props.placeholder ? e.target.selectedIndex - 1 : e.target.selectedIndex;

      _this.setState({
        selectedIndex: selectedIndex
      }, function () {
        _this.emitValue(_this.props.options[selectedIndex].value);
      });
    };

    _this.emitValue = function (value) {
      _this.props.onInput(value);
    };

    _this.computeLabel = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          _assertThisInitialize2 = _assertThisInitialize.state,
          isNumber = _assertThisInitialize2.isNumber,
          isText = _assertThisInitialize2.isText,
          isTextArea = _assertThisInitialize2.isTextArea,
          selectedIndex = _assertThisInitialize2.selectedIndex,
          _assertThisInitialize3 = _assertThisInitialize.props,
          value = _assertThisInitialize3.value,
          placeholder = _assertThisInitialize3.placeholder,
          options = _assertThisInitialize3.options;

      if (isNumber) return value === '' ? placeholder : value;
      if (isText || isTextArea) return value ? value : placeholder; // Select

      return selectedIndex === -1 ? placeholder : options[selectedIndex].label;
    };

    _this._renderLabel = function () {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          _assertThisInitialize5 = _assertThisInitialize4.props,
          labelClasses = _assertThisInitialize5.labelClasses,
          renderSelectLabel = _assertThisInitialize5.renderSelectLabel,
          toggle = _assertThisInitialize4.toggle,
          computeLabel = _assertThisInitialize4.computeLabel,
          _renderSelectLabel = _assertThisInitialize4._renderSelectLabel;

      var selectLabelRenderFn = renderSelectLabel ? renderSelectLabel : _renderSelectLabel;
      return _react["default"].createElement("span", {
        className: labelClasses,
        onClick: toggle
      }, computeLabel(), selectLabelRenderFn());
    };

    _this._renderInput = function () {
      var _assertThisInitialize6 = _assertThisInitialized(_this),
          handleBlur = _assertThisInitialize6.handleBlur,
          handleEnter = _assertThisInitialize6.handleEnter,
          handleInput = _assertThisInitialize6.handleInput,
          _assertThisInitialize7 = _assertThisInitialize6.props,
          inputClasses = _assertThisInitialize7.inputClasses,
          placeholder = _assertThisInitialize7.placeholder,
          type = _assertThisInitialize7.type,
          value = _assertThisInitialize7.value,
          inputEl = _assertThisInitialize6.state.inputEl;

      return _react["default"].createElement("input", {
        ref: inputEl,
        type: type,
        defaultValue: value,
        className: inputClasses,
        placeholder: placeholder,
        onBlur: handleBlur,
        onKeyUp: handleEnter,
        onInput: handleInput
      });
    };

    _this._renderTextArea = function () {
      var _assertThisInitialize8 = _assertThisInitialized(_this),
          handleBlur = _assertThisInitialize8.handleBlur,
          handleInput = _assertThisInitialize8.handleInput,
          _assertThisInitialize9 = _assertThisInitialize8.props,
          cols = _assertThisInitialize9.cols,
          inputClasses = _assertThisInitialize9.inputClasses,
          placeholder = _assertThisInitialize9.placeholder,
          rows = _assertThisInitialize9.rows,
          value = _assertThisInitialize9.value,
          inputEl = _assertThisInitialize8.state.inputEl;

      return _react["default"].createElement("textarea", {
        ref: inputEl,
        value: value,
        className: inputClasses,
        placeholder: placeholder,
        onBlur: handleBlur,
        onInput: handleInput,
        rows: rows,
        cols: cols
      });
    };

    _this._renderSelect = function () {
      var _assertThisInitialize10 = _assertThisInitialized(_this),
          handleBlur = _assertThisInitialize10.handleBlur,
          handleChange = _assertThisInitialize10.handleChange,
          _assertThisInitialize11 = _assertThisInitialize10.props,
          inputClasses = _assertThisInitialize11.inputClasses,
          options = _assertThisInitialize11.options,
          placeholder = _assertThisInitialize11.placeholder,
          value = _assertThisInitialize11.value,
          inputEl = _assertThisInitialize10.state.inputEl;

      return _react["default"].createElement("select", {
        ref: inputEl,
        "class": inputClasses,
        defaultValue: value,
        onChange: handleChange,
        onBlur: handleBlur
      }, placeholder ? _react["default"].createElement("option", {
        disabled: true,
        value: true
      }, placeholder) : '', options.map(function (_ref2, i) {
        var label = _ref2.label,
            value = _ref2.value;
        return _react["default"].createElement("option", {
          key: i,
          value: value
        }, label);
      }));
    };

    _this._renderSelectLabel = function () {
      return _this.state.isSelect ? _react["default"].createElement("span", null, "\u25BC") : '';
    };

    return _this;
  }

  _createClass(InlineInput, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          editing = _this$state2.editing,
          isNumber = _this$state2.isNumber,
          isSelect = _this$state2.isSelect,
          isText = _this$state2.isText,
          isTextArea = _this$state2.isTextArea,
          _renderInput = this._renderInput,
          _renderLabel = this._renderLabel,
          _renderSelect = this._renderSelect,
          _renderTextArea = this._renderTextArea;
      var shouldShowNumberOrText = editing && (isText || isNumber);
      var shouldShowTextArea = editing && isTextArea;
      var shouldShowSelect = editing && isSelect;
      return shouldShowNumberOrText ? _renderInput() : shouldShowTextArea ? _renderTextArea() : shouldShowSelect ? _renderSelect() : _renderLabel();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, _) {
      var type = nextProps.type;
      return {
        isText: type === 'text',
        isNumber: type === 'number',
        isTextArea: type === 'textarea',
        isSelect: type === 'select'
      };
    }
  }]);

  return InlineInput;
}(_react.Component);

exports["default"] = InlineInput;
InlineInput.propTypes = {
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  type: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  options: _propTypes["default"].array,
  cols: _propTypes["default"].number,
  rows: _propTypes["default"].number,
  labelClasses: _propTypes["default"].string,
  inputClasses: _propTypes["default"].string,
  onInput: _propTypes["default"].func.isRequired,
  renderSelectLabel: _propTypes["default"].func,
  onBlur: _propTypes["default"].func
};
InlineInput.defaultProps = {
  value: '',
  type: 'text',
  placeholder: 'text',
  options: [],
  labelClasses: '',
  inputClasses: '',
  cols: 20,
  rows: 2,
  renderSelectLabel: null,
  onBlur: null
};
