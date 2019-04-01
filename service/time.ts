import {Location} from "weather/service/location"

export class TimeZone {
  identifier: string
  abbreviation: string
  utc_offset: number
  Time(): string {
    const format = new Date().toLocaleString("en-US", {timeZone: this.identifier})
    const time = new Date(format)
    return time.toLocaleString()
  }
}

export interface TimeApiEndpoint {
  FetchTime(location: Location): Promise<TimeZone>
}

