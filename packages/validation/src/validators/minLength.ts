import { ValidatorConstructorType } from '../types';

export type MinLengthOptionsType = {
  entity: string,
  message?: string,
  template: (props: MinLengthOptionsType) => string,
};

export const defaultOptions: MinLengthOptionsType = {
  entity: 'Input',
  template: ({ entity }) => `${entity} is too short`,
};

export const minLength: ValidatorConstructorType = (
  length: number,
  props: MinLengthOptionsType = defaultOptions,
) => (input: string) => {
  if (input.length >= length) {
    return undefined;
  }
  const applyProps = { ...defaultOptions, ...props };
  const { message, template } = applyProps;
  return message || template(applyProps);
};

export default minLength;
