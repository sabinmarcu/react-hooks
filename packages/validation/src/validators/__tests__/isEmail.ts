import { isEmail, defaultOptions } from '../isEmail';
import { makeTest } from './__makeTest';
import { overrideOptions } from './__utils';
import { MatchesOptionType } from '../matches';

makeTest({
  validator: isEmail,

  factory: false,

  tests: {
    basic: {
      valid: 'a@b.com',
      invalid: {
        input: 'something',
        expected: defaultOptions.message,
      },
    },
    variants: [
      overrideOptions(
        defaultOptions,
        { message: 'Email Invalid!' },
        (options: MatchesOptionType) => ({
          input: 'something',
          options,
          expected: 'Email Invalid!',
        }),
      ),
    ],
  },
});
