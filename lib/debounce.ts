export function debounce<T>(callback: (arg: T) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (arg: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(arg), delay);
  };
}
