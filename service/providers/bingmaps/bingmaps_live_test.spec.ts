import {Zip, City} from "weather/service/location"
import {BingMapsTimeEndpoint, bingmaps_time} from "weather/service/providers/bingmaps/bingmaps"
import {MockGetFetcher} from "weather/service/utils/mock_url_fetcher"

describe("City time integration tests", function() {
  it("valid response", async function() {
    let response = await bingmaps_time.FetchTime(new City("Seattle"))
    expect(response).toBeDefined()
    expect(response.identifier).toEqual("America/Los_Angeles")
    expect(response.abbreviation).toMatch("P(D|S)T")
  })

})
