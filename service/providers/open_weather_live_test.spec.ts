import {Zip, City} from "weather/service/location";
import {open_weather} from "weather/service/providers/open_weather";

describe("OpenWeather integration tests", function() {
  it("valid response (zip)", async function() {
    let response = await open_weather.FetchWeather(new Zip("94040"));
    expect(response).toBeDefined();
    expect(response.description).toBeDefined();
    expect(response.wind).toBeDefined();
    expect(response.wind.speed_mps).toBeDefined();
    expect(response.wind.heading_deg).toBeDefined();
    expect(response.temperature_k).toBeDefined();
    expect(response.pressure_barr).toBeDefined();
    expect(response.humidity).toBeDefined();
  });

  it("valid response (city)", async function() {
    let response = await open_weather.FetchWeather(new City("London"));
    expect(response).toBeDefined();
    expect(response.description).toBeDefined();
    expect(response.wind).toBeDefined();
    expect(response.wind.speed_mps).toBeDefined();
    expect(response.wind.heading_deg).toBeDefined();
    expect(response.temperature_k).toBeDefined();
    expect(response.pressure_barr).toBeDefined();
    expect(response.humidity).toBeDefined();
  });

  it("invalid city", async function() {
    let response = await open_weather.FetchWeather(new City("badcity"));
    expect(response).toBeNull();
  });
});
