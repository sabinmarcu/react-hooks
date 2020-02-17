import { maxLength, defaultOptions } from '../maxLength';
import { makeTest } from './__makeTest';
import { overrideOptions } from './__utils';

makeTest({
  validator: maxLength,

  factory: true,

  defaultOptions,
  defaultArgs: [5],

  tests: {

    basic: {
      valid: 'nope',
      invalid: {
        input: 'awesome',
        expected: defaultOptions.template(defaultOptions),
      },
    },

    variants: [

      overrideOptions(
        defaultOptions,
        { message: 'Custom Override' },
        ({ message }, args) => ({
          input: 'awesome',
          args: [5],
          options: args,
          expected: message,
        }),
      ),

      overrideOptions(
        defaultOptions,
        { entity: 'Email' },
        (args, orig) => ({
          input: 'awesome',
          args: [5],
          options: orig,
          expected: args.template(args),
        }),
      ),

      overrideOptions(
        defaultOptions,
        { template: ({ entity }) => `${entity} is invalid` },
        (args, orig) => ({
          input: 'awesome',
          args: [5],
          options: orig,
          expected: args.template(args),
        }),
      ),

      overrideOptions(
        defaultOptions,
        {
          entity: 'Password',
          template: ({ entity }) => `${entity} is invalid`,
        },
        (args, orig) => ({
          input: 'awesome',
          args: [5],
          options: orig,
          expected: args.template(args),
        }),
      ),


    ],
  },
});
