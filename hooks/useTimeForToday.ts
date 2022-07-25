import { useEffect, useState } from 'react';

import { timeForToday } from 'utils/timeForToday';

export default function useTimeForToday(date: string) {
  const [time, setTime] = useState(timeForToday(date));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeForToday(date));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [date, time]);

  return time;
}
