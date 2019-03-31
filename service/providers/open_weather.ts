import {Location, City, Zip} from "weather/service/location";
import {WeatherApiEndpoint, WeatherReport, Wind} from "weather/service/weather";
import {UrlFetcher, GetUrlFetcher} from "weather/service/utils/url_fetcher";

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
  if (!response.weather || response.weather.length == 0 || !response.main) {
    return null;
  }
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
  private key: string;

  constructor(fetcher: UrlFetcher, key: string) {
    this.fetcher = fetcher;
    this.key = key;
  }

  async FetchWeather(location: Location): Promise<WeatherReport> {
    const url = formatQuery(location) + "&appid=" + this.key;
    return this.fetcher.fetchJson<OpenWeatherResponse>(url).then(response => ToReport(response));
  }
}

export const open_weather = new OpenWeatherEndpoint(new GetUrlFetcher(), "249e4cba36ae5fef250f0e4e635f4192");

function formatQuery(location: Location): string {
  let url = "http://api.openweathermap.org/data/2.5/weather?";
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
