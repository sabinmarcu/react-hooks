import { useState, useCallback } from 'react';
import { renderHook, act, HookResult } from '@testing-library/react-hooks';

const useCounter = (defaultValue = 0) => {
  const [count, setCount] = useState(defaultValue);

  const mutate = useCallback(
    (offset) => setCount((c) => c + offset),
    [setCount],
  );
  const increment = useCallback(
    () => mutate(1),
    [mutate],
  );
  const decrement = useCallback(
    () => mutate(-1),
    [mutate],
  );
  return {
    count, increment, decrement,
  };
};

const makeTest = (message: string, value?: number) => {
  describe(value ? `${message} (with value: ${value})` : message, () => {
    let result: HookResult<ReturnType<typeof useCounter>>;
    beforeEach(() => {
      result = renderHook(() => useCounter(value)).result;
    });
    it('should increment', () => {
      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe((value || 0) + 1);
    });
    it('should decrement', () => {
      act(() => {
        result.current.decrement();
      });

      expect(result.current.count).toBe((value || 0) - 1);
    });
  });
};

describe('Counter Sanity', () => {
  makeTest('default usage');
  makeTest('with altered default value', 5);
  makeTest('with altered default value', -5);
});
