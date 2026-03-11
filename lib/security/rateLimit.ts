type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

const globalState = globalThis as typeof globalThis & {
  __lyfieRateLimitStore?: Map<string, RateLimitEntry>;
};

const store = globalState.__lyfieRateLimitStore ?? new Map<string, RateLimitEntry>();
globalState.__lyfieRateLimitStore = store;

export const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt < now) {
    store.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });
    return false;
  }

  if (current.count >= MAX_ATTEMPTS) {
    return true;
  }

  store.set(key, {
    count: current.count + 1,
    resetAt: current.resetAt
  });

  return false;
};
