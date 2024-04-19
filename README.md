# Notify.js

---

| ⚠ Notice | This library is still work in progress.   |
| -------- |-------------------------------------------|

---

Are you bored with the default alert or prompt messages in your website? Then this library is for you.

With Promises and the `async` and `await` directives, you are able to achieve nearly the exact same behavior as the 
original notification mechanisms, but with styling!

## Installation

Pick your preferred version from the build directory and include it in your website, 
preferably at the end of the page, just above the closing `</body>` tag.

## Usage

To be able to comfortably achieve the pseudo process blocking mechanism, 
there are a few things you should take note of.

As the `await` directive is used, you need to surround these operations with another 
function body which got the `async` directive. This will work quite well in class or functions 
but in the context of a main process, you need to work with the old-fashioned `.then()` and `.catch()` methods.

## Modules

### Alert

#### Example integration

```javascript
const result = await alert('Are you sure?');
```

#### Options

| Name              | Type     | Description                               |
|-------------------|----------|-------------------------------------------|
| confirmButtonText | `string` | Determines the text on the confirm button |

### Prompt

#### Example integration

```javascript
const answer = await prompt('What is your name?');
console.log(answer) // 'answer' will contain the user input
```

#### Options

| Name              | Type    | Description                                              |
|-------------------|---------|----------------------------------------------------------|
| confirmButtonText | `string`    | Determines the text on the confirm button                |
| cancelButtonText  | `string`    | Determines the text on the cancel button                 |
| showInput         | `boolean` | Displays a input field for the user                      |
| showCancelButton  | `boolean` | Displays a cancel button to cancel the current operation |
| validators        | `array`   | Accepts a list of validators                             |

## Validators

While the validators are only available for the prompt input and also only when
the input field is visible, it is worth mentioning the functionality.

To define a single or multiple validators, add them to the `validators` property:

```js

import NotEmpty from './Validators/NotEmpty';

// ...

await prompt('How is it going?', {
    showInput: true,
    confirmButtonText: 'Next',
    validators: [
        new NotEmpty()
    ]
});

// ...

```

### List of validators

| Name     | Arguments    | Description                                    |
|----------|--------------|------------------------------------------------|
| Enum     | `array`      | Allows only specific values to be valid        |                               |
| Range    | `min`, `max` | Field may have a value within a specific range |
| NotEmpty | none         | Field may have a length of more than zero      |
| IsString | none         | Whether the field contains a string or not     |
| IsNumber | none         | Whether the field contains a number or not     |

### Creating own validators

Create your class and extend from `Validator`. You need to define the property `errorMessage`, 
which is used to display the message. These messages are being translated.

You also need to define the method `validate`, which accepts the argument `value` and can be used 
to determine its validity. Just return `true` when the validator should succeed or `false` otherwise.

```javascript
import Validator from "../Validator.mjs";

class IsEmail extends Validator {

    errorMessage = 'Value seems to be an invalid email address.';

    validate(value) {
        return typeof value === 'string' && (/\@/).test(value);
    }

}

export default IsString;
```

## Example integrations

```javascript
import alert from './Modules/Alert';

class ExampleClass {

    async exampleMethod() {

        // ...
        
        const answer = await alert('Are you sure?');

        // This section is only being reached after the user processed the alert box

        // ..
        
    }
    
}
```

```javascript

async function askForPermission() {

    // ...

    const answer = await prompt('Please type "bundle/package" to confirm deletion:');

    // This section is only being reached after the user processed the prompt

    if (answer === 'bundle/package') {
        // Here you can put the code into which gets executed after the user confirmed the input
    }

    // ..
    
}



```

---

More details coming soon...