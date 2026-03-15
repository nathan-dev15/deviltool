import { useEffect, useRef } from 'react';

export const useRealTimeConversion = <T>(
  value: T,
  action: (val: T) => void,
  delay: number = 500
) => {
  const callbackRef = useRef(action);

  useEffect(() => {
    callbackRef.current = action;
  }, [action]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callbackRef.current(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [JSON.stringify(value), delay]);
};