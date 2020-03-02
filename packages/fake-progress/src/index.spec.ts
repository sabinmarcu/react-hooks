import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import {
  setTimeout,
  clearTimeout,
  sandbox,
} from '../../utils/fakeAsync';
import {
  useFakeProgress,
  ProgressStates,
  FakeProgressTypeDebug,
  defaultValues,
} from './index';

describe('useFakeProgress', () => {
  beforeEach(() => {
    sandbox.setup();
  });
  describe('construction', () => {
    it('with default arguments', () => {
      const duration = 100;
      const result = renderHook(
        () => useFakeProgress(duration),
      ).result.current as FakeProgressTypeDebug;
      expect(result.progress).toBe(0);
      expect(typeof result.start).toBe('function');
      expect(typeof result.stop).toBe('function');
      expect(typeof result.pause).toBe('function');
      expect(typeof result.resume).toBe('function');
      // DEBUG
      expect(result.state).toBe(ProgressStates.STOPPED);
      expect(result.duration).toBe(duration);
      expect(result.precision).toBe(defaultValues.precision);
      expect(result.autoStart).toBe(defaultValues.autoStart);
      expect(result.tick).toBe(defaultValues.tick);
      expect(result.clearTick).toBe(defaultValues.clearTick);
      expect(result.interval).toBe(duration / defaultValues.precision);
      expect(result.progressPerTick).toBe(100 / defaultValues.precision);
    });
    it('with default arguments (+ precision)', () => {
      const duration = 100;
      const precision = 40;
      const result = renderHook(
        () => useFakeProgress(duration, { precision }),
      ).result.current as FakeProgressTypeDebug;
      // DEBUG
      expect(result.duration).toBe(duration);
      expect(result.precision).toBe(precision);
      expect(result.interval).toBe(duration / precision);
      expect(result.progressPerTick).toBe(100 / precision);
    });
    it('with default arguments (+ autoStart = false)', () => {
      const duration = 100;
      const autoStart = false;
      const result = renderHook(
        () => useFakeProgress(duration, { autoStart }),
      ).result.current as FakeProgressTypeDebug;
      expect(result.progress).toBe(0);
      // DEBUG
      expect(result.state).toBe(ProgressStates.STOPPED);
      expect(result.autoStart).toBe(autoStart);
    });
    it('with default arguments (+ autoStart = true)', () => {
      const duration = 100;
      const autoStart = true;
      const result = renderHook(
        () => useFakeProgress(duration, { autoStart }),
      ).result.current as FakeProgressTypeDebug;
      expect(result.progress).toBe(0);
      // DEBUG
      expect(result.state).toBe(ProgressStates.ACTIVE);
      expect(result.autoStart).toBe(autoStart);
    });
    it('with default arguments (+ autoStart = true & tick fake)', () => {
      const duration = 100;
      const autoStart = true;
      const current = renderHook(
        () => useFakeProgress(duration, {
          autoStart,
          tick: setTimeout,
          clearTick: clearTimeout,
        }),
      ).result as HookResult<FakeProgressTypeDebug>;
      let result = current.current;
      expect(result.progress).toBe(0);
      expect(result.tick).toBe(setTimeout);
      expect(result.clearTick).toBe(clearTimeout);
      // DEBUG
      expect(result.state).toBe(ProgressStates.ACTIVE);
      expect(result.autoStart).toBe(autoStart);
      // Act
      act(
        () => {
          sandbox.lastTimeout.tick();
        },
      );
      result = current.current;
      expect(result.progress).toBe(100 / defaultValues.precision);
    });
  });
  describe('basic usage', () => {
    const duration = 100;
    let result: HookResult<FakeProgressTypeDebug>;
    const handlers = {
      tick: setTimeout,
      clearTick: clearTimeout,
    };
    beforeEach(() => {
      result = renderHook(
        () => useFakeProgress(duration, handlers),
      ).result as HookResult<FakeProgressTypeDebug>;
    });
    it('should progress when started', () => {
      expect(result.current.state).toBe(ProgressStates.STOPPED);
      expect(result.current.progress).toBe(0);
      act(() => {
        result.current.start();
      });
      expect(result.current.state).toBe(ProgressStates.ACTIVE);
      expect(result.current.progress).toBe(0);
      const lastTimeout = sandbox.lastTimeout; // eslint-disable-line
      act(() => {
        sandbox.lastTimeout.tick();
      });
      expect(result.current.progress).toBe(result.current.progressPerTick);
      expect(sandbox.lastTimeout).not.toEqual(lastTimeout);
      act(() => {
        sandbox.lastTimeout.tick();
      });
      expect(result.current.progress).toBe(result.current.progressPerTick * 2);
    });
  });
});
