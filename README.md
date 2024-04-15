# Notify.js

| ⚠ Notice | This library is still work in progress.   |
| -------- |-------------------------------------------|

---

Are you bored with the default alert or prompt messages in your website? Then this library is for you.

With Promises and the `async` and `await` directives, you are able to achieve nearly the exact same behavior as the 
original notification mechanisms, but with styling!

Examples:

```javascript

// ...

const answer = await alert('Are you sure?');

// This section is only being reached after the user processed the alert box

// ..

```

```javascript

// ...

const answer = await prompt('Please type "bundle/package" to confirm deletion:');

// This section is only being reached after the user processed the prompt

if (answer === 'bundle/package') {
    // Here you can put the code which gets executed after the user confirmed the input
}

// ..

``` 

More details coming soon...