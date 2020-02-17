import { TestCaseType, ConstructorTestCaseType } from './__types';

export const stringifyOptions = (obj: any) => JSON.stringify(
  obj,
  (key: string, value: any) => {
    if (value instanceof Function || typeof value === 'function') {
      return `<func ${value.name || key}>`;
    }
    return value;
  },
);

export const overrideOptions = <T, K extends Partial<T>>(
  defaultOptions: T,
  options: K,
  handler: (args: T, orig: K) => TestCaseType | ConstructorTestCaseType,
): TestCaseType | ConstructorTestCaseType => handler({ ...defaultOptions, ...options }, options);
