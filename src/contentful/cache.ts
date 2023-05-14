import NodeCache from 'node-cache';

export const cache = new NodeCache({
  stdTTL: 600,
});

export function getCache<T = unknown>(key: string): T | undefined {
  if (process.env.ENABLE_CACHE === 'true') {
    return cache.get<T>(key);
  }
  return undefined;
}

export function setCache(key: string, data: any) {
  if (process.env.ENABLE_CACHE === 'true') {
    cache.set(key, data);
  }
}
