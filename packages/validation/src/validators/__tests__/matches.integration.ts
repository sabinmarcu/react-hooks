import { matches, defaultOptions } from '../matches';
import { makeTest } from './__makeTest.integration';

const wordsMatch = /^[a-zA-Z ]+$/;
makeTest({
  validator: matches(wordsMatch),
  factory: false,
  defaultOptions,
  tests: {
    basic: {
      valid: 'Awesome Stuff',
      invalid: {
        input: 'Awesome Stuff!',
        expected: defaultOptions.template(wordsMatch),
      },
    },
  },
});
