import { ValidatorType, ValidatorConstructorType } from '../../types';

export type TestCaseType = {
  input: string,
  expected: string | void,
};

export type ConstructorTestCaseType = TestCaseType & {
  args?: any[],
  options?: Object,
};

export type TestCaseSet<TC> = {
  tests: {
    basic?: {
      valid: string,
      invalid: TestCaseType,
    },
    variants?: TC[]
  }
};

export type ValidatorOptionsType = {
  validator: ValidatorType,
  factory: false,
} & TestCaseSet<ConstructorTestCaseType>;

export type ConstructorValidatorOptionsType = {
  validator: ValidatorConstructorType,
  factory: true,
} & TestCaseSet<ConstructorTestCaseType>;

export type ValidatorOverloadType = ValidatorOptionsType | ConstructorValidatorOptionsType;


export type MakeTestOptionsType = ValidatorOverloadType
& { defaultOptions?: Object, defaultArgs?: any[], };
