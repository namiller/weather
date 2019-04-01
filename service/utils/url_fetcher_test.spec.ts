import {GetUrlFetcher} from "weather/service/utils/url_fetcher"

interface EchoArg {
  args: object
}

describe("Url Fetching", function() {
  it("raw text fetch", async function() {
    const fetcher = new GetUrlFetcher()
    const result = await fetcher.fetchRaw("https://postman-echo.com/get?echo_test")

    expect(result.length).toBeGreaterThan(100)
    expect(result).toContain("echo_test")
  })

  it("json fetch", async function() {
    const fetcher = new GetUrlFetcher()
    const result = await fetcher.fetchJson<EchoArg>("https://postman-echo.com/get?echo_test")
    expect(result).toBeDefined()
    expect(result.args).toBeDefined()
    expect(result.args).toEqual({"echo_test": ""})
  })

})

