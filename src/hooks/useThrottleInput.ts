import { useMemo } from 'react';

import { throttle } from '../lib/throttle';

export default function useThrottleInput<T extends unknown[]>(
  setInput: (...args: T) => void,
  delay: number,
) {
  return useMemo(
    () => throttle<T>((...args: T) => setInput(...args), delay),
    [],
  );
}
