export type ValidatorType = (input: string) => string | void;

// ValidatorConstructorType should optimally be of type (...args: any[], options: Object);
// if it requires configuration (templates for error messages, etc);
export type ValidatorConstructorType = (...args: any[]) => ValidatorType;
