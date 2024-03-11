import type { KyInstance } from 'ky';
import ky from 'ky';

let httpClient: KyInstance;
export const useHttpClient = () => {
  if (!httpClient) {
    httpClient = ky.create({
      retry: 0,
      prefixUrl: 'api/'
    });
  }
  return {
    httpClient
  };
};
