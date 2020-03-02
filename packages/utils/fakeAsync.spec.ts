import {
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
} from './fakeAsync';

describe('setTimeout', () => {
  it('Should create properly (default args)', () => {
    const timeout = setTimeout();
    expect(timeout.elapsed).toBe(0);
    expect(typeof timeout.tick).toBe('function');
    expect(typeof timeout.clear).toBe('function');
  });
  it('Should create properly', () => {
    const timeout = setTimeout(100, () => {});
    expect(timeout.elapsed).toBe(0);
    expect(typeof timeout.tick).toBe('function');
    expect(typeof timeout.clear).toBe('function');
  });
  it('Should progress properly', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn);
    expect(timeout.elapsed).toBe(0);
    timeout.tick();
    expect(timeout.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
  });
  it('Should progress properly with arguments', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn, 1, 2, 3, 4);
    expect(timeout.elapsed).toBe(0);
    timeout.tick();
    expect(timeout.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0]).toEqual([1, 2, 3, 4]);
  });
  it('Should error properly', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn);
    expect(timeout.elapsed).toBe(0);
    timeout.tick();
    expect(() => timeout.tick()).toThrowError();
  });
  it('Should clear properly', () => {
    const fn = jest.fn();
    const timeout = setTimeout(100, fn);
    expect(timeout.elapsed).toBe(0);
    timeout.tick();
    expect(timeout.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    clearTimeout(timeout);
    expect(timeout.elapsed).toBe(0);
    expect(fn.mock.calls.length).toBe(1);
    timeout.tick();
    expect(timeout.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(2);
  });
});

describe('setInterval', () => {
  it('Should create properly (default args)', () => {
    const interval = setInterval();
    expect(interval.elapsed).toBe(0);
    expect(typeof interval.tick).toBe('function');
    expect(typeof interval.clear).toBe('function');
  });
  it('Should create properly', () => {
    const interval = setInterval(100, () => {});
    expect(interval.elapsed).toBe(0);
    expect(typeof interval.tick).toBe('function');
    expect(typeof interval.clear).toBe('function');
  });
  it('Should progress properly', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn);
    expect(interval.elapsed).toBe(0);
    interval.tick();
    expect(interval.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
  });
  it('Should progress properly with arguments', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn, 1, 2, 3, 4);
    expect(interval.elapsed).toBe(0);
    interval.tick();
    expect(interval.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0]).toEqual([1, 2, 3, 4]);
  });
  it('Should continue properly', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn);
    expect(interval.elapsed).toBe(0);
    interval.tick();
    expect(interval.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    interval.tick();
    expect(interval.elapsed).toBe(200);
    expect(fn.mock.calls.length).toBe(2);
    interval.tick();
    expect(interval.elapsed).toBe(300);
    expect(fn.mock.calls.length).toBe(3);
  });
  it('Should clear properly', () => {
    const fn = jest.fn();
    const interval = setInterval(100, fn);
    expect(interval.elapsed).toBe(0);
    interval.tick();
    expect(interval.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(1);
    clearInterval(interval);
    expect(interval.elapsed).toBe(0);
    expect(fn.mock.calls.length).toBe(1);
    interval.tick();
    expect(interval.elapsed).toBe(100);
    expect(fn.mock.calls.length).toBe(2);
  });
});
