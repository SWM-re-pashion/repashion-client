import { useState, useEffect } from 'react';

import { throttle } from 'src/lib/throttle';

export default function useWindowResize() {
  const [size, setSize] = useState([0, 0]);
  const detectSize = () => setSize([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => detectSize(), 300),
    );

    return () =>
      window.removeEventListener(
        'resize',
        throttle(() => detectSize(), 300),
      );
  }, []);
  return size;
}
