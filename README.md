# react-inline-input

> An inline editable input component for React.

Displays as text and becomes editable by clicking or tapping.

![Example](https://miro.medium.com/max/280/0*SSYv6SG9l9CYFLjQ.gif)

You can read how it was built [here](https://medium.com/@ukchukx/1fdcf0050aec)

## Installation

```js
npm install react-inline-input
```

### Browser

```html
<script type="text/javascript" src="https://unpkg.com/react-inline-input"></script>
```

### Module

```js
import InlineInput from 'react-inline-input';
```

## Usage

Once installed, it can be used in a template as:

```html
<InlineInput onInput={...} onBlur={...} ... />
```

See the props table below for the available options.

### Props

| Property | Type | Description | Default |
|:--|:--|:--|:--|
| onBlur | function | Called when the input element has lost focus | null |
| onInput | function | Called when the input value (or selection if `type` is `'select'`) changes | null |
| type | string | The input type. Could be text, number, textarea or select | text |
| placeholder | string | Text to be shown as a placeholder while there is no input |  empty string |
| labelClasses | string | CSS classes for the label element | empty string |
| inputClasses | string | CSS classes for the input element | empty string |
| rows | integer | Textarea rows | 2 |
| cols | integer | Textarea columns | 20 |
| options | array | Provides the options for selects. Each object should have the format `{label: x, value: x}` | [] |

## License

[MIT](http://opensource.org/licenses/MIT)
