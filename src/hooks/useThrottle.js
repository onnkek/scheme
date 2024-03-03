import { useRef } from "react"

export const useThrottle = (callback, delay) => {
  const isThrottled = useRef(null);

  const throttledCallback = (...args) => {
    if(isThrottled.current) {
      return;
    }
    callback(...args);
    isThrottled.current = true;
    setTimeout(() => isThrottled.current = false, delay)
  };

  return throttledCallback;
}