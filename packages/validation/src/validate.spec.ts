import { validate } from './validate';

const minLength = (len: number) => (it: string) => (it.length >= len
  ? undefined
  : 'Short');
const maxLength = (len: number) => (it: string) => (it.length < len
  ? undefined
  : 'Long');


describe('validate', () => {
  it('should properly validate with an empty array', () => {
    const result = validate('Input');
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
  it('should proper validate with a few validators', () => {
    const result = validate('Input', [minLength(3), maxLength(10)]);
    expect(result.length).toBe(0);
  });
  it('should proper invalidate with a few validators', () => {
    const result = validate('Input', [minLength(10), maxLength(3)]);
    expect(result.length).toBe(2);
    expect(result[0]).toBe('Short');
    expect(result[1]).toBe('Long');
  });
  it('should proper invalidate with a few validators and fault prevention', () => {
    const result = validate('Input', [minLength(10), maxLength(3)], true);
    expect(result.length).toBe(1);
    expect(result[0]).toBe('Short');
  });
});
