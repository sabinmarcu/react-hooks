export type ValidatorType = (input: string, options?: any) => string | void;

// ValidatorConstructorType should optimally be of type (...args: any[], options: Object);
// if it requires configuration (templates for error messages, etc);
export type ValidatorConstructorType = (...args: any[]) => ValidatorType;

export type ValidatorCombinedType = ValidatorType | ValidatorConstructorType;

export type ValidateType = (
  input: string,
  validators?: ValidatorType[],
  stopAtFail?: boolean,
) => string[];
