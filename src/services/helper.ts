import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getMeACookie = (cookieKey: string) => cookies.get(cookieKey);

type DebounceValue<T> = T;
type DebouncedValue<T> = T;

export const useDebounce = <T>(value: DebounceValue<T>, delay: number): DebouncedValue<T> => {
  // State to store debounced value
  const [debouncedValue, setDebouncedValue] = useState<DebouncedValue<T>>(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout on component unmount or value change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};