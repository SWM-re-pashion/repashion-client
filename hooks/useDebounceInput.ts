import { useMemo } from 'react';

import { debounce } from '../lib/debounce';

export default function useThrottleInput<T>(setInput: (inputValue: T) => void) {
  return useMemo(
    () => debounce<T>((inputValue: T) => setInput(inputValue), 200),
    [],
  );
}
