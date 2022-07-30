import { useMemo } from 'react';

import { debounce } from '../lib/debounce';

export default function useDebounceInput<T extends unknown[]>(
  setInput: (...args: T) => void,
  delay: number,
) {
  return useMemo(
    () => debounce<T>((...args: T) => setInput(...args), delay),
    [],
  );
}
