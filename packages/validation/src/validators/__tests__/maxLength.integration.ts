import { maxLength, defaultOptions } from '../maxLength';
import { makeTest } from './__makeTest.integration';

makeTest({
  validator: maxLength(5),
  factory: false,
  defaultOptions,
  tests: {
    basic: {
      valid: 'nope',
      invalid: {
        input: 'awesome',
        expected: defaultOptions.template(defaultOptions),
      },
    },
  },
});
