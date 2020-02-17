import { ValidatorType, ValidatorConstructorType } from '../types';

/**
 * Describes how an error message should be formatted
 * @param string message Override message templating
 * @param string entity Override entity to be used in default template
 * @param Function template Override templating function
 */
export type MaxLengthOptionsType = {
  entity: string,
  message?: string,
  template: (props: MaxLengthOptionsType) => string,
};

/**
 * The default configuration for formatting
 */
export const defaultOptions: MaxLengthOptionsType = {
  entity: 'Input',
  template: ({ entity }) => `${entity} is too long`,
};

/**
 * Constructor for a maximum length validator
 * @param length Value to check length against
 * @param props Configuration for error formatting
 * @category Validator
 */
export const maxLength: ValidatorConstructorType = (
  length: number,
  props: MaxLengthOptionsType = defaultOptions,
): ValidatorType => (input: string) => {
  if (input.length < length) {
    return undefined;
  }
  const applyProps = { ...defaultOptions, ...props };
  const { message, template } = applyProps;
  return message || template(applyProps);
};

export default maxLength;
