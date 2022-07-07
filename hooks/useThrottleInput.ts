import { useMemo } from 'react';

import { throttle } from '../lib/throttle';

export default function useThrottleInput<T>(setInput: (inputValue: T) => void) {
  return useMemo(
    () => throttle<T>((inputValue: T) => setInput(inputValue), 300),
    [],
  );
}
