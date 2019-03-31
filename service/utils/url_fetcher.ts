import fetch  from 'node-fetch';

export interface UrlFetcher {
  fetchRaw(url: string): Promise<string>;
  fetchJson<T>(url: string): Promise<T>;
}

export class GetUrlFetcher implements UrlFetcher {
  fetchRaw(url: string): Promise<string> {
    return fetch(url).then(data => data.text());
  }
  fetchJson<T>(url: string): Promise<T> {
    return fetch(url).then(data => data.json()).then(data => data as T);
  }
}


