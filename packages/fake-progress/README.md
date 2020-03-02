# React Hooks - Validation

A system for validating input, as well as a collection of ready to use validators

----

## Usage

The module is split into two sections, the main engine ([Validate](#validate)) and the built-in validators ([Validators](#validators))

<br />

### Validate

Validate supports applying an array of validators on a given input, in cascade.  
It supports full passes, as well as fault-protection. In short, it can either run all validators, and return all associated errors, or stop at first error, to prevent crashes.

```js
// Import `validate` and custom and/or built-in validators
import { validate, validators } from '@rgadigital/react-hooks-validate';

// Create an array of validators to cover all edge cases
const validators = [
    validators.minLength(5),
    validators.maxLength(10),
    (input) => input.indexOf('$') ? 'Input contains a "$" symbol' : undefined,
];

// Validate input
validate('Awesome!', validators); // []
validate('Nope', validators); // ['Input is too short']
validate('A very large input', validators); // ['Input is too long']
validate('$$$', validators); 
    // ['Input is too short', 'Input contains a "$" symbol']

// Validate input with fault-protection
validate('$$$', validators, true); // ['Input is too short']
```

Note that the validators are applied in order, from first, to last. The resulting errors, if more than one have been found, will retain the same order.

<br />

### Validators

Validators come in two variants, `with` and `without` constructor:

<br /><br />

#### Without Constructor

```js
// Built-in
import { isEmail } from '@rgadigital/react-hooks-validate/dist/validators/isEmail';

// Custom
const isEmail = (input) => input.match(<email regex>) ? undefined : 'Input is not a valid email';

// Usage

isEmail('test@example.com);
```

<br /><br />

#### With Constructor

```js
// Built-in
import { minLength } from '@rgadigital/react-hooks-validate/dist/validators/minLength';

// Custom
const minLength = (length) => (input) => input.length >= length ? undefined : 'Input is too short';

// Usage

minLength(5)('Awesome!);
```
