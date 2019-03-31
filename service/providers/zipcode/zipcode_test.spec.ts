import {Zip, City} from "weather/service/location";
import {ZipCodeTimeEndpoint} from "weather/service/providers/zipcode/zipcode";
import {MockGetFetcher} from "weather/service/utils/mock_url_fetcher";

describe("Zipcode time unit tests", function() {
  it("valid response", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new ZipCodeTimeEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'https://www.zipcodeapi.com/rest/none/info.json/98102',
      `{"zip_code":"98102","lat":47.637144,"lng":-122.321899,"city":"Seattle","state":"WA","timezone":{"timezone_identifier":"America\/Los_Angeles","timezone_abbr":"PDT","utc_offset_sec":-25200,"is_dst":"T"},"acceptable_city_names":[{"city":"Broadway","state":"WA"},{"city":"Capitol Hill","state":"WA"}]}`
    );

    let response = await endpoint.FetchTime(new Zip("98102"));
    expect(response).toBeDefined();
    expect(response.identifier).toEqual("America/Los_Angeles");
    expect(response.abbreviation).toEqual("PDT");
    expect(response.utc_offset).toBe(-25200);
  });

  it("invalid zip", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new ZipCodeTimeEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'https://www.zipcodeapi.com/rest/none/info.json/00000',
      `{"error_code":404,"error_msg":"Zip code \\"00000\\" not found."}`
    );
    let response = await endpoint.FetchTime(new Zip("00000"));
    expect(response).toBeNull();
  });

  it("city", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new ZipCodeTimeEndpoint(mockFetcher, "none");
    let response = await endpoint.FetchTime(new City("Seattle"));
    expect(response).toBeNull();
  });
});
