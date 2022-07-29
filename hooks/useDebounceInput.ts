import { useMemo } from 'react';

import { debounce } from '../lib/debounce';

export default function useDebounceInput<T>(
  setInput: (inputValue: T) => void,
  delay: number,
) {
  return useMemo(
    () => debounce<T>((inputValue: T) => setInput(inputValue), delay),
    [],
  );
}
