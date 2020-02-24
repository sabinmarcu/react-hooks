import { isEmail, defaultOptions } from '../isEmail';
import { makeTest } from './__makeTest.integration';

makeTest({
  validator: isEmail,
  factory: false,
  defaultOptions,
  tests: {
    basic: {
      valid: 'a@b.com',
      invalid: {
        input: 'sample',
        expected: defaultOptions.message,
      },
    },
  },
});
