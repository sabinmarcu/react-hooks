import {
  ValidatorType,
} from '../types';

import {
  matches,
  defaultOptions as matchesDefaultOptions,
  MatchesOptionType,
} from './matches';

/**
 * @category IsEmail
 */
export const defaultOptions: MatchesOptionType = {
  ...matchesDefaultOptions,
  message: 'Input is not a valid email',
};

/**
 * @ignore
 */
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @category Validator
 * @category IsEmail
 */
export const isEmail: ValidatorType = (
  input,
  options: MatchesOptionType = defaultOptions,
) => matches(emailRegex, options)(input);

export default isEmail;
