import {Zip, City} from "weather/service/location";
import {OpenWeatherEndpoint} from "weather/service/providers/open_weather/open_weather";
import {MockGetFetcher} from "weather/service/utils/mock_url_fetcher";

describe("OpenWeather unit tests", function() {
  it("valid response (zip)", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new OpenWeatherEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'http://api.openweathermap.org/data/2.5/weather?zip=94040&appid=none',
      `{"coord":{"lon":-122.09,"lat":37.39},
      "sys":{"type":3,"id":168940,"message":0.0297,"country":"US","sunrise":1427723751,"sunset":1427768967},
      "weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}],
      "base":"stations",
      "main":{"temp":285.68,"humidity":74,"pressure":1016.8,"temp_min":284.82,"temp_max":286.48},
      "wind":{"speed":0.96,"deg":285.001},
      "clouds":{"all":0},
      "dt":1427700245,
      "id":0,
      "name":"Mountain View",
      "cod":200}`
    );

    let response = await endpoint.FetchWeather(new Zip("94040"));
    expect(response).toBeDefined();
    expect(response.description).toEqual("Sky is Clear");
    expect(response.wind).toBeDefined();
    expect(response.wind.speed_mps).toBe(.96);
    expect(response.wind.heading_deg).toBe(285.001);
    expect(response.temperature_k).toBe(285.68);
    expect(response.pressure_barr).toBe(1016.8);
    expect(response.humidity).toBe(74);
  });

  it("valid response (city)", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new OpenWeatherEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'http://api.openweathermap.org/data/2.5/weather?q=London&appid=none',
      `{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}`
    );
    let response = await endpoint.FetchWeather(new City("London"));
    expect(response).toBeDefined();
    expect(response.description).toEqual("light intensity drizzle");
    expect(response.wind).toBeDefined();
    expect(response.wind.speed_mps).toBe(4.1);
    expect(response.wind.heading_deg).toBe(80);
    expect(response.temperature_k).toBe(280.32);
    expect(response.pressure_barr).toBe(1012);
    expect(response.humidity).toBe(81);
  });

  it("invalid city", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new OpenWeatherEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'http://api.openweathermap.org/data/2.5/weather?q=badcity&appid=none',
      `{"cod":"404","message":"city not found"}`
    );
    let response = await endpoint.FetchWeather(new City("badcity"));
    expect(response).toBeNull();

  });
});
