import {Zip, City, Location} from "weather/service/location";
import {TimeApiEndpoint, TimeZone} from "weather/service/time";
import {zipcode_time} from "weather/service/providers/zipcode/zipcode";
import {bingmaps_time} from "weather/service/providers/bingmaps/bingmaps";

export class DelegatingEndpoint implements TimeApiEndpoint {
  zip_endpoint: TimeApiEndpoint;
  city_endpoint: TimeApiEndpoint;
  constructor(zip_endpoint: TimeApiEndpoint, city_endpoint: TimeApiEndpoint) {
    this.zip_endpoint = zip_endpoint;
    this.city_endpoint = city_endpoint;
  }
  FetchTime(location: Location): Promise<TimeZone> {
    if (location instanceof Zip) {
      return this.zip_endpoint.FetchTime(location);
    }
    if (location instanceof City) {
      return this.city_endpoint.FetchTime(location);
    }
    return null;
  }
}

export const timezones = new DelegatingEndpoint(zipcode_time, bingmaps_time);
