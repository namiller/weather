import {Location} from "weather/service/location";

export class TimeZone {
  identifier: string;
  abbreviation: string;
  utc_offset: number;
}

export interface TimeApiEndpoint {
  FetchTime(location: Location): Promise<TimeZone>;
  // TODO(namiller): Add a batch fetching api.
}

