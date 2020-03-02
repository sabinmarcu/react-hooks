import {
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
  sandbox,
} from './fakeAsync';

describe('setTimeout', () => {
  beforeEach(() => {
    sandbox.setup();
  });
  it('Should create properly (default args)', () => {
    const timeout = setTimeout();
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    expect(typeof result.tick).toBe('function');
    expect(typeof result.clear).toBe('function');
  });
  it('Should create properly', () => {
    const timeout = setTimeout(100, () => {});
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    expect(typeof result.tick).toBe('function');
    expect(typeof result.clear).toBe('function');
  });
  it('Should create properly (multiple)', () => {
    const timeout1 = setTimeout(100, () => {});
    expect(timeout1).toBe(0);
    const timeout2 = setTimeout(100, () => {});
    expect(timeout2).toBe(1);
  });
  it('Should progress properly (default args)', () => {
    const timeout = setTimeout();
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(0);
  });
  it('Should progress properly', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn);
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
  });
  it('Should progress properly with arguments', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn, 1, 2, 3, 4);
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0]).toEqual([1, 2, 3, 4]);
  });
  it('Should error properly', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn);
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(() => result.tick()).toThrowError();
  });
  it('Should clear properly', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn);
    expect(timeout).toBe(0);
    const result = sandbox.retrieveTimeout(timeout);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    clearTimeout(timeout);
    expect(typeof sandbox.retrieveTimeout(timeout)).toBe('undefined');
  });
});

describe('setInterval', () => {
  beforeEach(() => {
    sandbox.setup();
  });
  it('Should create properly (default args)', () => {
    const interval = setInterval();
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    expect(typeof result.tick).toBe('function');
    expect(typeof result.clear).toBe('function');
  });
  it('Should create properly', () => {
    const interval = setInterval(100, () => {});
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    expect(typeof result.tick).toBe('function');
    expect(typeof result.clear).toBe('function');
  });
  it('Should create properly (multiple)', () => {
    const interval1 = setInterval(100, () => {});
    expect(interval1).toBe(0);
    const interval2 = setInterval(100, () => {});
    expect(interval2).toBe(1);
  });
  it('Should progress properly (default args)', () => {
    const interval = setInterval();
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(0);
  });
  it('Should progress properly', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn);
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
  });
  it('Should progress properly with arguments', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn, 1, 2, 3, 4);
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0]).toEqual([1, 2, 3, 4]);
  });
  it('Should continue properly', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn);
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    result.tick();
    expect(result.elapsed).toBe(200);
    expect(fn.mock.calls.length).toBe(2);
    result.tick();
    expect(result.elapsed).toBe(300);
    expect(fn.mock.calls.length).toBe(3);
  });
  it('Should clear properly', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn);
    expect(interval).toBe(0);
    const result = sandbox.retrieveInterval(interval);
    expect(result.elapsed).toBe(0);
    result.tick();
    expect(result.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    clearInterval(interval);
    expect(typeof sandbox.retrieveInterval(interval)).toBe('undefined');
  });
});
