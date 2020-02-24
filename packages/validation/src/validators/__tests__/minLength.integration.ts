import { minLength, defaultOptions } from '../minLength';
import { makeTest } from './__makeTest.integration';

makeTest({
  validator: minLength(5),
  factory: false,
  defaultOptions,
  tests: {
    basic: {
      valid: 'awesome',
      invalid: {
        input: 'nope',
        expected: defaultOptions.template(defaultOptions),
      },
    },
  },
});
