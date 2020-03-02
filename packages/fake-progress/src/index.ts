import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

export const useConfigureFakeProgress = (
  duration: number,
  precision: number,
) => {
  const interval = useMemo(
    () => duration / precision,
    [duration, precision],
  );
  const progressPerTick = useMemo(
    () => 100 / precision,
    [precision],
  );
  return {
    interval,
    progressPerTick,
  };
};

export enum ProgressStates {
  ACTIVE,
  PAUSED,
  STOPPED,
}

const getGlobal = () => (window || global || {});
export type FakeProgressTypeDefault = {
  progress: number,
  start: () => void,
  stop: () => void,
  pause: () => void,
  resume: () => void,
};
export type FakeProgressTypeDebug = FakeProgressTypeDefault & {
  state: ProgressStates,
  duration: number,
  precision: number,
  autoStart: boolean,
  tick: Function,
  clearTick: Function,
  interval: number,
  progressPerTick: number,
};

export const defaultValues = {
  precision: 20,
  autoStart: false,
  tick: getGlobal().setTimeout,
  clearTick: getGlobal().clearInterval,
};

export const useFakeProgress = (
  duration: number,
  {
    precision = defaultValues.precision,
    autoStart = defaultValues.autoStart,
    tick = defaultValues.tick,
    clearTick = defaultValues.clearTick,
  }: {
    precision?: number,
    autoStart?: boolean,
    tick?: Function,
    clearTick?: Function,
  } = {},
): FakeProgressTypeDefault => {
  const [progress, setProgress] = useState(0);
  const {
    interval,
    progressPerTick,
  } = useConfigureFakeProgress(duration, precision);

  const [state, setState] = useState(autoStart ? ProgressStates.ACTIVE : ProgressStates.STOPPED);
  const start = useCallback(
    () => {
      if (state !== ProgressStates.STOPPED) {
        throw new Error('State must be stopped to start');
      }
      setProgress(0);
      setState(ProgressStates.ACTIVE);
    },
    [setProgress, state, setState],
  );
  const pause = useCallback(
    () => {
      if (state !== ProgressStates.ACTIVE) {
        throw new Error('State must be active to pause');
      }
      setState(ProgressStates.PAUSED);
    },
    [setState, state],
  );
  const resume = useCallback(
    () => {
      if (state !== ProgressStates.PAUSED) {
        throw new Error('State must be paused to resume');
      }
      setState(ProgressStates.ACTIVE);
    },
    [setState, state],
  );
  const stop = useCallback(
    () => {
      if (state !== ProgressStates.ACTIVE) {
        throw new Error('State must be active to stop');
      }
      setProgress(0);
      setState(ProgressStates.ACTIVE);
    },
    [setProgress, state, setState],
  );

  useEffect(
    () => {
      if (state !== ProgressStates.ACTIVE || progress === 100) {
        return undefined;
      }
      const handler = () => {
        setProgress(Math.min(progress + progressPerTick, 100));
      };
      const int = tick(interval, handler);
      return () => clearTick(int);
    },
    [tick, clearTick, interval, progress, setProgress, state],
  );

  return {
    progress,
    start,
    stop,
    pause,
    resume,
    ...(
      process.env.NODE_ENV !== 'production'
        ? {
          state,
          duration,
          precision,
          interval,
          progressPerTick,
          tick,
          clearTick,
          autoStart,
        }
        : {}
    ),
  };
};
