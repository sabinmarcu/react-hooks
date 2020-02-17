import { ValidateType, ValidatorType } from './types';

/**
 * A shorthand for applying an array of validators,
 * in order, on a given input
 * @param input The input to be validated
 * @param validators An array of validators
 * @param stopAtFail Decides between applying all validators, or stopping at first failure to prevent subsequent crashes if one validator depends on a previous one being truthy
 */
export const validate: ValidateType = (
  input: string,
  validators: ValidatorType[],
  stopAtFail: boolean = false,
): string[] => validators.reduce(
  (
    prev: string[],
    validator: ValidatorType,
  ): string[] => {
    if (stopAtFail && prev.length > 0) {
      return prev;
    }
    return prev.concat(validator(input) || []);
  },
  [],
);

export default validate;
