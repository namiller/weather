import {UrlFetcher} from "weather/service/utils/url_fetcher";

export class MockGetFetcher implements UrlFetcher {

  private responses = new Map<string, string>();

  registerResponse(url: string, payload: string) {
    this.responses.set(url, payload);
  }

  fetchRaw(url: string): Promise<string> {
    return Promise.resolve(this.responses.get(url));
  }

  fetchJson<T>(url: string): Promise<T> {
    return Promise.resolve(JSON.parse(this.responses.get(url)) as T);
  }
}
