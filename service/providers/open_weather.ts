import {Location, City, Zip} from "weather/service/location";
import {WeatherApiEndpoint, WeatherReport, Wind} from "weather/service/weather";
import {UrlFetcher} from "weather/service/utils/url_fetcher";

interface OpenWeatherWeather {
  id: number;
  main: string;
  description: string;
}

interface OpenWeatherMain {
  temp: number;
  humidity: number;
  pressure: number;
  temp_min: number;
  temp_max: number;
}

interface OpenWeatherWind {
  speed: number;
  deg: number;
}

interface OpenWeatherResponse {
  weather: Array<OpenWeatherWeather>;
  main: OpenWeatherMain;
  wind: OpenWeatherWind;
}

function ToReport(response: OpenWeatherResponse): WeatherReport {
  let report = new WeatherReport();
  report.description = response.weather[0].description;
  report.wind = new Wind();
  report.wind.speed_mps = response.wind.speed;
  report.wind.heading_deg = response.wind.deg;
  report.temperature_k = response.main.temp;
  report.humidity = response.main.humidity;
  report.pressure_barr = response.main.pressure;
  return report;
}

export class OpenWeatherEndpoint implements WeatherApiEndpoint {
  private fetcher: UrlFetcher;

  constructor(fetcher: UrlFetcher) {
    this.fetcher = fetcher;
  }

  async FetchWeather(location: Location): Promise<WeatherReport> {
    const url = formatQuery(location);
    return this.fetcher.fetchJson<OpenWeatherResponse>(url).then(response => ToReport(response));
  }
}

function formatQuery(location: Location): string {
  let url = "api.openweathermap.org/data/2.5/weather?";
  if (location instanceof City) {
    return url + cityQuery(location);
  }
  if (location instanceof Zip) {
    return url + zipQuery(location);
  }
}

function cityQuery(city: City): string {
  return `q=${city.location}`;
}

function zipQuery(zip: Zip): string {
  return `zip=${zip.location}`;
}
