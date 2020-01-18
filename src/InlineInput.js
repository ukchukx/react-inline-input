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
    options: PropTypes.array,
    cols: PropTypes.number,
    rows: PropTypes.number,
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
    inputClasses: '',
    cols: 20,
    rows: 2
  };

  state = {
    editing: false,
    inputEl: React.createRef(),
    selectedIndex: this.props.options.findIndex(({ value }) => value === this.props.value),
    isText: this.props.type === 'text',
    isNumber: this.props.type === 'number',
    isTextArea: this.props.type === 'textarea'
  };

  static getDerivedStateFromProps(nextProps, _) {
    const { type } = nextProps;

    return {
      isText: type === 'text',
      isNumber: type === 'number',
      isTextArea: type === 'textarea'
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
  };

  handleInput = (e) => {
    this.emitValue(this.state.isNumber ? +e.target.value : e.target.value);
  };

  emitValue = (value) => {
    this.props.onInput(value);
  };

  computeLabel = () => {
    const { state: { isNumber, isText, isTextArea }, props: { value, placeholder } } = this;

    if (isNumber) return value === '' ? placeholder : value;
    if (isText || isTextArea) return value ? value : placeholder;
  };

  render() {
    const { 
      state: { editing, isText, isNumber, isTextArea },
      _renderInput,
      _renderLabel,
      _renderTextArea
    } = this;
    const shouldShowNumberOrText = editing && (isText || isNumber);
    const shouldShowTextArea = editing && isTextArea;

      return (
        shouldShowNumberOrText
          ? _renderInput()
          : (shouldShowTextArea 
              ? _renderTextArea() 
              : _renderLabel()
            )
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
      handleBlur, 
      handleEnter, 
      handleInput, 
      props: { inputClasses, placeholder, type, value }, 
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

  _renderTextArea = () => {
    const { 
      handleBlur, 
      handleEnter, 
      handleInput, 
      props: { cols, inputClasses, placeholder, rows, type, value }, 
      state: { inputEl } 
    } = this;

    return (
      <textarea 
        ref={inputEl}
        value={value} 
        className={inputClasses} 
        placeholder={placeholder}
        onBlur={handleBlur}
        onInput={handleInput}
        rows={rows}
        cols={cols}>
      </textarea>
    );
  };
}