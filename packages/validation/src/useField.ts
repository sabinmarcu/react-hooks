import {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { validate } from './validate';
import { ValidatorType } from './types';

export const useField = ({
  defaultValue = '',
  validators = [],
}: {
  defaultValue?: string,
  validators?: ValidatorType[],
} = {}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDirty, setIsDirty] = useState(false);
  useEffect(
    () => {
      if (!isDirty && value !== defaultValue) {
        setIsDirty(true);
      }
    },
    [value, isDirty, setIsDirty],
  );
  const errors = useMemo(
    () => validate(value, validators),
    [value, validators],
  );
  const isValid = useMemo(
    () => errors.length === 0,
    [errors],
  );
  const onChange = useCallback(
    ({ target: { value: val } }) => setValue(val),
    [setValue],
  );
  return {
    value,
    onChange,
    setValue,
    isDirty,
    isValid,
    errors,
  };
};

export default useField;
