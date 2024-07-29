export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const raceWithTimeout = <T>(
  promise: Promise<T> | T,
  timeoutMs: number,
  onTimeout?: () => void
) => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      onTimeout?.();
      reject();
    }, timeoutMs);
  });
  return Promise.race<T>([timeout, promise]);
};
