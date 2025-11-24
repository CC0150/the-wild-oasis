import { useEffect, useRef, useCallback } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  listenCapturing = true
) {
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handleClick, listenCapturing]);

  return ref;
}
