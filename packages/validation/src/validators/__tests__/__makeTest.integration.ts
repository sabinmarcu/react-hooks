import { MakeTestOptionsType } from './__types';
import { ValidatorType, ValidatorConstructorType } from '../../types';
import { stringifyOptions } from './__utils';
import { validate as validateFunction } from '../../validate';

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
  const getValidator = (...args: any[]): ValidatorType => (factory
    ? (validator as ValidatorConstructorType)(...args)
    : (validator as ValidatorType)
  );
  describe((validator as any).name, () => {
    it('should construct properly', () => {
      const instance = getValidator(...(defaultArgs || []), defaultOptions);
      expect(typeof instance).toBe('function');
    });
    it('should construct properly without default options', () => {
      const instance = getValidator(...(defaultArgs || []), undefined);
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
          expect(validateFunction(valid, [validate])).toEqual([]);
        });
        it('should invalidate properly', () => {
          expect(validateFunction(invalid.input, [validate])).toEqual([invalid.expected]);
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
            expect(validateFunction(input, [validate])).toEqual(expected);
          });
        });
      });
    }
  });
};

export default makeTest;
