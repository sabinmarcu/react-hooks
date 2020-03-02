
export const setInterval = (
  interval?: number,
  handler?: Function,
  ...args: any[]
) => {
  let elapsed = 0;
  const tick = () => {
    elapsed += interval || 0;
    if (handler) {
      handler(...args);
    }
  };
  const clear = () => {
    elapsed = 0;
  };
  return {
    tick,
    clear,
    get elapsed() { return elapsed; },
  };
};

export const clearInterval = (interval?: ReturnType<typeof setInterval>) => {
  if (interval && interval.clear) {
    interval.clear();
  } else {
    throw new Error('Cannot clear something that\'s not a fakeInterval');
  }
};

export const setTimeout = (
  timeout?: number,
  handler?: Function,
  ...args: any[]
) => {
  let elapsed = 0;
  const tick = () => {
    if (elapsed !== timeout) {
      elapsed = timeout || 0;
      if (handler) {
        handler(...args);
      }
    } else {
      throw new Error('Already Called!');
    }
  };
  const clear = () => {
    elapsed = 0;
  };
  return {
    tick,
    clear,
    get elapsed() { return elapsed; },
  };
};

export const clearTimeout = (timeout?: ReturnType<typeof setTimeout>) => {
  if (timeout && timeout.clear) {
    timeout.clear();
  } else {
    throw new Error('Cannot clear something that\'s not a fakeTimeout');
  }
};
