import { useState, useEffect } from 'react';

import { throttle } from 'lib/throttle';

export default function useWindowResize() {
  const [size, setSize] = useState([0, 0]);
  const detectSize = () => setSize([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => detectSize(), 100),
    );

    return () =>
      window.removeEventListener(
        'resize',
        throttle(() => detectSize(), 100),
      );
  }, []);
  return size;
}
