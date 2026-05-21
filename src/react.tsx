import { useEffect } from 'react';
import { initStopInspect, StopInspectOptions } from './index';

/**
 * React hook to initialize stop-inspect protection.
 */
export const useStopInspect = (options?: StopInspectOptions) => {
  useEffect(() => {
    initStopInspect(options);
  }, [options]);
};

/**
 * React component to initialize stop-inspect protection.
 */
export const StopInspect = ({ options }: { options?: StopInspectOptions }) => {
  useStopInspect(options);
  return null;
};
