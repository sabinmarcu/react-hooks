import { ValidatorType, ValidatorConstructorType } from '../types';

/**
 * Describes how an error message should be formatted
 * @param message string Override message templating
 * @param entity string Override entity to be used in default template
 * @param template Function Override templating function
 * @category MinLength
 */
export type MinLengthOptionsType = {
  entity: string,
  message?: string,
  template: (props: MinLengthOptionsType) => string,
};

/**
 * The default configuration for formatting
 * @category MinLength
 */
export const defaultOptions: MinLengthOptionsType = {
  entity: 'Input',
  template: ({ entity }) => `${entity} is too short`,
};

/**
 * Constructor for a minimum length validator
 * @param length Value to check length against
 * @param props Configuration for error formatting
 * @category Validator
 * @category MinLength
 */
export const minLength: ValidatorConstructorType = (
  length: number,
  props: MinLengthOptionsType = defaultOptions,
): ValidatorType => (input: string) => {
  if (input.length >= length) {
    return undefined;
  }
  const applyProps = { ...defaultOptions, ...props };
  const { message, template } = applyProps;
  return message || template(applyProps);
};

export default minLength;
