export function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}
