import {Zip, City} from "weather/service/location";
import {ZipCodeTimeEndpoint, zipcode_time} from "weather/service/providers/zipcode/zipcode";

describe("Zipcode time integration tests", function() {
  it("valid response", async function() {
    let response = await zipcode_time.FetchTime(new Zip("98102"));
    expect(response).toBeDefined();
    expect(response.identifier).toEqual("America/Los_Angeles");
    expect(response.abbreviation).toMatch(/P(D|S)T/);
    expect(response.utc_offset).toBe(-25200);
  });
});
