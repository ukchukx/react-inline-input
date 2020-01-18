import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InlineInput extends Component {
  static propTypes = {
    value:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    option: PropTypes.array,
    labelClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    onInput: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: '',
    type: 'text',
    placeholder: 'text',
    options: [],
    labelClasses: '',
    inputClasses: ''
  };

  state = {
    editing: false,
    inputEl: React.createRef(),
    selectedIndex: this.props.options.findIndex(({ value }) => value === this.props.value),
    isText: this.props.type === 'text',
    isNumber: this.props.type === 'number'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { type } = nextProps;

    return {
      isText: type === 'text',
      isNumber: type === 'number'
    };
  }

  toggle = () => {
    this.setState({ editing: !this.state.editing }, () => {
      const { editing, inputEl } = this.state;
      
      if (editing) inputEl.current.focus();
    });
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) this.state.inputEl.current.blur();
  };

  handleBlur = () => {
    this.toggle();
    this.emitValue();
  };

  handleInput = (e) => {
    this.emitValue(this.state.isNumber ? +e.target.value : e.target.value);
  };

  emitValue = (value) => {
    this.props.onInput(value);
  };

  computeLabel = () => {
    const { state: { isNumber, isText }, props: { value, placeholder } } = this;

    if (isNumber) return value === '' ? placeholder : value;
    if (isText) return value ? value : placeholder;
  };

  render() {
    const { state: { editing, isText, isNumber } } = this;

      return (
        editing && (isText || isNumber)
          ? this._renderInput()
          : this._renderLabel()
      );
  }

  _renderLabel = () => {
    const { props: { labelClasses }, toggle, computeLabel } = this;
    
    return (
      <span className={labelClasses} onClick={toggle}>
        {computeLabel()}
      </span>
    );
  };

  _renderInput = () => {
    const { 
      props: { inputClasses, placeholder, type, value }, 
      handleBlur, 
      handleEnter, 
      handleInput, 
      state: { inputEl } 
    } = this;
    
    return (
      <input 
        ref={inputEl}
        type={type} 
        defaultValue={value} 
        className={inputClasses} 
        placeholder={placeholder}
        onBlur={handleBlur}
        onKeyUp={handleEnter}
        onInput={handleInput} />
    );
  };
}