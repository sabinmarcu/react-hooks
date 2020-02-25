import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import { useField } from './useField';

const minLength = (input: string): string | void => (input.length < 5 ? 'Short' : undefined);
const maxLength = (input: string): string | void => (input.length > 10 ? 'Long' : undefined);
const hasSpaces = (input: string): string | void => (input.match(/ /g) ? 'Spaces' : undefined);

describe('useField', () => {
  let result: HookResult<ReturnType<typeof useField>>;
  beforeEach(() => {
    result = renderHook(() => useField({
      defaultValue: '',
      validators: [minLength, maxLength],
    })).result;
  });
  it('should validate', () => {
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual(['Short']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
    act(() => result.current.setValue('awesome'));
    expect(result.current.value).toBe('awesome');
    expect(result.current.errors).toEqual([]);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(true);
  });
  it('should invalidate', () => {
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual(['Short']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
    act(() => result.current.setValue('nope'));
    expect(result.current.value).toBe('nope');
    expect(result.current.errors).toEqual(['Short']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(true);
    act(() => result.current.setValue('awesome sauce'));
    expect(result.current.value).toBe('awesome sauce');
    expect(result.current.errors).toEqual(['Long']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(true);
  });
  it('should respond to event changes', () => {
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual(['Short']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
    act(() => result.current.onChange({ target: { value: 'awesome' } }));
    expect(result.current.value).toBe('awesome');
    expect(result.current.errors).toEqual([]);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(true);
  });
  it('should invalidate multiple', () => {
    result = renderHook(() => useField({
      defaultValue: '',
      validators: [minLength, maxLength, hasSpaces],
    })).result;
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual(['Short']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
    act(() => result.current.setValue('awesome sauce'));
    expect(result.current.value).toBe('awesome sauce');
    expect(result.current.errors).toEqual(['Long', 'Spaces']);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(true);
  });
  it('should work with default options', () => {
    result = renderHook(() => useField()).result;
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual([]);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(false);
    result = renderHook(() => useField({ defaultValue: '' })).result;
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual([]);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(false);
    result = renderHook(() => useField({ validators: [] })).result;
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual([]);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(false);
    result = renderHook(() => useField({ })).result;
    expect(result.current.value).toBe('');
    expect(result.current.errors).toEqual([]);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(false);
  });
});
