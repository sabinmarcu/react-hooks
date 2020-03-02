
export type ReturnType = {
  tick: () => void,
  clear: () => void,
  elapsed: number,
};

export type SetIntervalType = (
  interval?: number,
  handler?: Function,
  ...args: any[]
) => number;

export const sandbox = (() => {
  const cache: {
    interval: ReturnType[],
    timeout: ReturnType[],
  } = {
    interval: [],
    timeout: [],
  };
  const register = (type: keyof typeof cache, value: ReturnType) => {
    const index = cache[type].length;
    cache[type][index] = value;
    return index;
  };
  const registerInterval = (value: ReturnType) => register('interval', value);
  const registerTimeout = (value: ReturnType) => register('timeout', value);
  const retrieve = (type: keyof typeof cache, index: number) => cache[type][index];
  const retrieveInterval = (index: number) => retrieve('interval', index);
  const retrieveTimeout = (index: number) => retrieve('timeout', index);
  const retrieveLast = (type: keyof typeof cache) => cache[type][cache[type].length - 1];
  const retrieveLastInterval = () => retrieveLast('interval');
  const retrieveLastTimeout = () => retrieveLast('timeout');
  const clear = (type: keyof typeof cache, index: number) => delete cache[type][index];
  const clearInterval = (index: number) => clear('interval', index);
  const clearTimeout = (index: number) => clear('timeout', index);
  const setup = () => {
    cache.interval = [];
    cache.timeout = [];
  };
  return {
    get cache() {
      return cache;
    },
    get lastInterval() {
      return retrieveLastInterval();
    },
    get lastTimeout() {
      return retrieveLastTimeout();
    },
    registerInterval,
    registerTimeout,
    retrieve,
    retrieveInterval,
    retrieveTimeout,
    clear,
    clearInterval,
    clearTimeout,
    setup,
    retrieveLastInterval,
    retrieveLastTimeout,
  };
})();

export const setInterval: SetIntervalType = (
  interval,
  handler,
  ...args
) => {
  let elapsed = 0;
  const tick = () => {
    elapsed += interval || 0;
    handler?.(...args);
  };
  const clear = () => {
    elapsed = 0;
  };
  return sandbox.registerInterval({
    tick,
    clear,
    get elapsed() { return elapsed; },
  });
};

export const clearInterval = (interval: number) => {
  sandbox.clearInterval(interval);
};

export const setTimeout: SetIntervalType = (
  timeout,
  handler,
  ...args
) => {
  let elapsed = 0;
  const tick = () => {
    if (elapsed !== timeout) {
      elapsed = timeout || 0;
      handler?.(...args);
    } else {
      throw new Error('Already Called!');
    }
  };
  const clear = () => {
    elapsed = 0;
  };
  return sandbox.registerTimeout({
    tick,
    clear,
    get elapsed() { return elapsed; },
  });
};

export const clearTimeout = (timeout: number) => {
  sandbox.clearTimeout(timeout);
};
