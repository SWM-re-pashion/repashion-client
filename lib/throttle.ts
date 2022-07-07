export function throttle<T>(callback: (arg: T) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (arg: T) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(arg);
        timer = null;
      }, delay);
    }
  };
}
