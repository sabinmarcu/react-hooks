import { matches, defaultOptions } from '../matches';
import { makeTest } from './__makeTest';
import { overrideOptions } from './__utils';

const wordsMatch = /^[a-zA-Z ]+$/;
makeTest({
  validator: matches,

  factory: true,

  defaultOptions,
  defaultArgs: [wordsMatch],

  tests: {
    basic: {
      valid: 'Awesome Stuff',
      invalid: {
        input: 'Awesome Stuff!',
        expected: defaultOptions.template(wordsMatch),
      },
    },
    variants: [

      {
        input: 'Awesome Stuff!',
        args: ['!'],
        expected: undefined,
      },

      {
        input: 'Awesome Stuff!',
        args: ['Not Here'],
        expected: defaultOptions.template('Not Here'),
      },

      {
        input: 'Awesome Stuff!',
        args: ['wes'],
        expected: undefined,
      },

      overrideOptions(
        defaultOptions,
        { match: ['any', 'char'] },
        (options) => ({
          input: 'Awesome Stuff!',
          args: ['au'],
          options,
          expected: undefined,
        }),
      ),

      overrideOptions(
        defaultOptions,
        { match: ['all', 'char'] },
        (options) => ({
          input: 'Awesome Stuff!',
          args: ['AwesomStuf! '],
          options,
          expected: undefined,
        }),
      ),

      overrideOptions(
        defaultOptions,
        { match: ['any', 'word'] },
        (options) => ({
          input: 'Awesome Stuff',
          args: ['Awesome'],
          options,
          expected: undefined,
        }),
      ),

      overrideOptions(
        defaultOptions,
        { match: ['any', 'word'] },
        (options) => ({
          input: 'Awesome Stuff',
          args: ['Stuff Awesome'],
          options,
          expected: undefined,
        }),
      ),

      overrideOptions(
        defaultOptions,
        { match: ['all', 'word'] },
        (options) => ({
          input: 'Awesome',
          args: ['Awesome'],
          options,
          expected: undefined,
        }),
      ),

      overrideOptions(
        defaultOptions,
        { message: 'Invalid Input' },
        ({ message }, args) => ({
          input: 'Awesome Stuff!',
          args: [wordsMatch],
          options: args,
          expected: message,
        }),
      ),

    ],
  },
});
