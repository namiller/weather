import {Location} from "weather/service/location"

export class Wind {
  speed_mps: number
  heading_deg: number
  public toString(): string {
    if (!this.speed_mps || !this.heading_deg) {
      return null;
    }
    const speed = this.speed_mps.toFixed(2)
    const heading = this.heading_deg.toFixed(0)
    return `${speed} m/s at ${heading} degrees`
  }
}

export class WeatherReport {
  description: string
  wind: Wind
  temperature_k: number
  pressure_barr: number
  humidity: number
  public toString(): string {
    if (this.wind && this.wind.toString()) {
      return `${this.description} with wind of ${this.wind} and it is ${(this.temperature_k - 273.15).toFixed(2)} degrees celcius`
    } else {
      return `${this.description} and the temperature is ${(this.temperature_k - 273.15).toFixed(2)} degrees celcius`
    }
  }
}

export interface WeatherApiEndpoint {
  FetchWeather(location: Location): Promise<WeatherReport>
}

