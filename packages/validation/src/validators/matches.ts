import { ValidatorType, ValidatorConstructorType } from '../types';

/**
 * @category Matches
 */
export type MatchesParamType = RegExp | string;

/**
 * @category Matches
 */
export type RegexMatchType = 'any' | 'all';

/**
 * @category Matches
 */
export type RegexMatchMethod = 'char' | 'word';

/**
 * @category Matches
 */
export type RegexMatch =
  | RegexMatchType
  | RegexMatchMethod
  | [RegexMatchType, RegexMatchMethod]
  | [RegexMatchMethod, RegexMatchType];

/**
 * @category Matches
 */
export type MatchesOptionType = {
  template: (matcher: MatchesParamType, matches?: RegExpMatchArray | null) => string,
  match?: RegexMatch,
  negate?: boolean,
  message?: string,
};

/**
 * @category Matches
 */
export const defaultOptions: MatchesOptionType = {
  template: (matcher: MatchesParamType) => (((typeof matcher) === 'string')
    ? `Input should contain: ${matcher}`
    : 'Input does not match pattern'),
};

const regexMatchIncludes = (
  match: RegexMatch,
  it: RegexMatchType | RegexMatchMethod,
): boolean => (typeof match === 'string'
  ? match === it
  : match.includes(it)
);

const makeRegex = (matcher: string, match: RegexMatch) => {
  let regexString = '';
  const isChar = regexMatchIncludes(match, 'char');
  const isAll = regexMatchIncludes(match, 'all');
  if (isChar) {
    regexString = `[${matcher}]+`;
  } else if (isAll) {
    regexString = `(${matcher})`;
  } else {
    regexString = `(${matcher.split(' ').join('|')})`;
  }
  if (isAll) {
    regexString = `^${regexString}$`;
  }
  return new RegExp(regexString);
};

/**
 *
 * @param matcher
 * @param options
 * @category Validator
 * @category Matches
 */
export const matches: ValidatorConstructorType = (
  matcher: MatchesParamType,
  options: MatchesOptionType,
): ValidatorType => (input: string) => {
  const
    {
      template,
      message,
      match,
      negate,
    } = { ...defaultOptions, ...options };
  const regex = typeof matcher === 'string'
    ? makeRegex(matcher, (match || 'any'))
    : matcher;

  const matchResult = input.match(regex);
  if (!!matchResult === !negate) {
    return undefined;
  }
  return message || template(matcher, matchResult);
};

export default matches;
