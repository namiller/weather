import {Zip, Location} from "weather/service/location";
import {TimeApiEndpoint, TimeZone} from "weather/service/time";
import {UrlFetcher, GetUrlFetcher} from "weather/service/utils/url_fetcher";

interface ZipCodeTimeZone {
  timezone_identifier: string;
  timezone_abbr: string;
  utc_offset_sec: number;
  is_dst: boolean;
}

interface ZipCodeResponse {
  timezone: ZipCodeTimeZone;
}

function ToTimeZone(response: ZipCodeResponse) {
  if (!response || !response.timezone) {
    return null;
  }
  let timezone = new TimeZone();
  timezone.identifier = response.timezone.timezone_identifier;
  timezone.abbreviation = response.timezone.timezone_abbr;
  timezone.utc_offset = response.timezone.utc_offset_sec;
  return timezone;
}

export class ZipCodeTimeEndpoint implements TimeApiEndpoint {
  fetcher: UrlFetcher;
  key: string;
  constructor(fetcher: UrlFetcher, key: string) {
    this.fetcher = fetcher;
    this.key = key;
  }
  FetchTime(location: Location): Promise<TimeZone> {
    if (!(location instanceof Zip)) {
      return null
    }
    const url = composeQuery(location, this.key);
    return this.fetcher.fetchJson<ZipCodeResponse>(url).then(response => ToTimeZone(response));
  }
}

function composeQuery(location: Zip, key: string): string {
  return `https://www.zipcodeapi.com/rest/${key}/info.json/${location.location}`;
}

export const zipcode_time = new ZipCodeTimeEndpoint(new GetUrlFetcher(), "uGSC7Zn8YKoaJ2JVTwUC4xwCtiQ59wxwlLkO0AhZOqZQJkqkVPCb2qMtjYrJoIjD");
