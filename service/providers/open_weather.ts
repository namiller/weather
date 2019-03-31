import {Location, City, Zip} from "weather/service/location";
import {WeatherApiEndpoint, WeatherReport, Wind} from "weather/service/weather";
import {UrlFetcher} from "weather/service/utils/url_fetcher";

export class OpenWeatherEndpoint implements WeatherApiEndpoint {
  private fetcher: UrlFetcher;

  constructor(fetcher: UrlFetcher) {
    this.fetcher = fetcher;
  }

  FetchWeather(location: Location): Promise<WeatherReport> {
    // TODO(namiller): Implement.
    return Promise.resolve(new WeatherReport());
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
