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
    onInput: PropTypes.func.isRequired,
    renderSelectLabel: PropTypes.func
  };

  static defaultProps = {
    value: '',
    type: 'text',
    placeholder: 'text',
    options: [],
    labelClasses: '',
    inputClasses: '',
    cols: 20,
    rows: 2,
    renderSelectLabel: null
  };

  state = {
    editing: false,
    inputEl: React.createRef(),
    selectedIndex: this.props.options.findIndex(({ value }) => value === this.props.value)
  };

  static getDerivedStateFromProps(nextProps, _) {
    const { type } = nextProps;

    return {
      isText: type === 'text',
      isNumber: type === 'number',
      isTextArea: type === 'textarea',
      isSelect: type === 'select'
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

  handleChange = (e) => {
    const selectedIndex = this.props.placeholder ? e.target.selectedIndex - 1 : e.target.selectedIndex;

    this.setState({ selectedIndex }, () => {
      this.emitValue(this.props.options[selectedIndex].value);
    });
  };

  emitValue = (value) => {
    this.props.onInput(value);
  };

  computeLabel = () => {
    const { state: { isNumber, isText, isTextArea, selectedIndex }, props: { value, placeholder, options } } = this;

    if (isNumber) return value === '' ? placeholder : value;
    if (isText || isTextArea) return value ? value : placeholder;
    // Select
    return selectedIndex === -1 ? placeholder : options[selectedIndex].label;
  };

  render() {
    const { 
      state: { editing, isNumber, isSelect, isText, isTextArea },
      _renderInput,
      _renderLabel,
      _renderSelect,
      _renderTextArea
    } = this;
    const shouldShowNumberOrText = editing && (isText || isNumber);
    const shouldShowTextArea = editing && isTextArea;
    const shouldShowSelect = editing && isSelect;

      return (
        shouldShowNumberOrText
          ? _renderInput()
          : (shouldShowTextArea 
              ? _renderTextArea() 
              : (shouldShowSelect 
                  ? _renderSelect()
                  : _renderLabel()
                )
            )
      );
  }

  _renderLabel = () => {
    const { 
      props: { labelClasses, renderSelectLabel }, 
      toggle, 
      computeLabel,
      _renderSelectLabel
    } = this;
    const selectLabelRenderFn = renderSelectLabel ? renderSelectLabel : _renderSelectLabel;
    
    return (
      <span className={labelClasses} onClick={toggle}>
        {computeLabel()}
        {selectLabelRenderFn()}
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
      handleInput, 
      props: { cols, inputClasses, placeholder, rows, value }, 
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

  _renderSelect = () => {
    const { 
      handleBlur, 
      handleChange,
      props: { inputClasses, options, placeholder, value }, 
      state: { inputEl } 
    } = this;

    return (
      <select 
        ref={inputEl}
        class={inputClasses}
        defaultValue={value}
        onChange={handleChange}
        onBlur={handleBlur}>
        {placeholder
          ? <option disabled value>{placeholder}</option>
          : ''}
        {options.map(({ label, value }, i) => (
          <option 
            key={i}
            value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  };

  _renderSelectLabel = () => this.state.isSelect ? (<span>&#9660;</span>) : '';
}