import { useCallback, useLayoutEffect, useRef } from "react";
import { AnyFunction } from "~shared/types/util-types";

export function useEvent<TFunc extends AnyFunction>(func: TFunc) {
  const funcRef = useRef(func);
  useLayoutEffect(() => {
    funcRef.current = func;
  });

  return useCallback(
    (...args: Parameters<typeof func>) => funcRef.current(...args),
    []
  );
}
