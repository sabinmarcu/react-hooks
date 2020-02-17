import { MakeTestOptionsType } from './__types';
import { ValidatorConstructorType } from '../../types';
import { stringifyOptions } from './__utils';

export const makeTest = ({
  validator,
  factory,
  defaultOptions,
  defaultArgs,
  tests: {
    basic,
    variants,
  },
}: MakeTestOptionsType) => {
  const getValidator = (...args: any[]) => (factory
    ? (validator as ValidatorConstructorType)(...args)
    : validator
  );
  describe(validator.name, () => {
    it('should construct properly', () => {
      const instance = getValidator(...(defaultArgs || []), defaultOptions);
      expect(typeof instance).toBe('function');
    });
    if (basic) {
      describe([
        'basic usage',
        defaultArgs && `[${defaultArgs}]`,
      ].filter(Boolean).join(' '), () => {
        const validate = getValidator(...(defaultArgs || []), defaultOptions);
        const { valid, invalid } = basic;
        it('should validate properly', () => {
          expect(validate(valid)).toBe(undefined);
        });
        it('should invalidate properly', () => {
          expect(validate(invalid.input)).toBe(invalid.expected);
        });
      });
    }
    if (variants) {
      describe('variants', () => {
        variants.forEach((variant) => {
          const {
            input, args, options, expected,
          } = variant;
          const validate = getValidator(...args || [], options);
          it([
            'with args',
            `[${args}]`,
            'and options',
            stringifyOptions(options),
            'input',
            `'${input}'`,
            'expecting',
            `'${expected}'`,
          ].join(' '), () => {
            expect(validate(input)).toEqual(expected);
          });
        });
      });
    }
  });
};

export default makeTest;
