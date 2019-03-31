import {Location} from "weather/service/location";

class Wind {
  speed_mps: number;
  heading_deg: number;
  public toString(): string {
    return `${this.speed_mps} m/s at ${this.heading_deg} degrees`;
  }
}

export class WeatherReport {
  description: string;
  wind: Wind;
  temperature_k: number;
  pressure_barr: number;
  humidity: number;
}

export interface WeatherApiEndpoint {
  FetchWeather(location: Location): Promise<WeatherReport>;
}

