import NodeCache from 'node-cache';
import { Logger } from '@src/contentful/logger';

export const cache = new NodeCache({
  stdTTL: 600,
});

export function getCache<T = unknown>(key: string): T | undefined {
  if (process.env.ENABLE_CACHE === 'true') {
    Logger.info(`GET ${key}: Using cache`);
    return cache.get<T>(key);
  }
  return undefined;
}

export function setCache(key: string, data: any) {
  if (process.env.ENABLE_CACHE === 'true') {
    Logger.info(`SET ${key}: Stored in cache`);
    cache.set(key, data);
  }
}

export function cleanCache() {
  cache.close();
}
