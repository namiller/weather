import {Location} from "weather/service/location"

export class Wind {
  speed_mps: number
  heading_deg: number
  public toString(): string {
    return `${this.speed_mps.toFixed(2)} m/s at ${this.heading_deg.toFixed(0)} degrees`
  }
}

export class WeatherReport {
  description: string
  wind: Wind
  temperature_k: number
  pressure_barr: number
  humidity: number
  public toString(): string {
    return `${this.description} with wind of ${this.wind} and it is ${(this.temperature_k - 273.15).toFixed(2)} degrees celcius`
  }
}

export interface WeatherApiEndpoint {
  FetchWeather(location: Location): Promise<WeatherReport>
}

