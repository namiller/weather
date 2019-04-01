import {City, Location} from "weather/service/location"
import {TimeApiEndpoint, TimeZone} from "weather/service/time"
import {UrlFetcher, GetUrlFetcher} from "weather/service/utils/url_fetcher"


interface BingTimeZone {
  abbreviation: string
  ianaTimeZoneId: string
  utcOffset: string
}

interface BingTimeLocationTimeZone {
  timeZone: Array<BingTimeZone>
}

interface BingTimeResource {
  timeZoneAtLocation: Array<BingTimeLocationTimeZone>
}

interface BingTimeResourceSet {
  resources: Array<BingTimeResource>
}

interface BingTimeResponse {
  resourceSets: Array<BingTimeResourceSet>; 
}

function ToTimeZone(response: BingTimeResponse) {
  if (!response || !response.resourceSets || response.resourceSets.length == 0) {
    return null
  }
  const resourceSets = response.resourceSets[0]
  if (!resourceSets || !resourceSets.resources || resourceSets.resources.length == 0) {
    return null
  }
  const resources = resourceSets.resources[0]
  if (!resources || !resources.timeZoneAtLocation || resources.timeZoneAtLocation.length == 0) {
    return null
  }
  const timeZoneAtLocation = resources.timeZoneAtLocation[0]
  if (!timeZoneAtLocation || !timeZoneAtLocation.timeZone || timeZoneAtLocation.timeZone.length == 0) {
    return null
  }
  const timeZone = timeZoneAtLocation.timeZone[0]
  const result = new TimeZone()
  result.identifier = timeZone.ianaTimeZoneId
  result.abbreviation = timeZone.abbreviation
  return result
}


export class BingMapsTimeEndpoint implements TimeApiEndpoint {
  fetcher: UrlFetcher
  key: string
  constructor(fetcher: UrlFetcher, key: string) {
    this.fetcher = fetcher
    this.key = key
  }
  FetchTime(location: Location): Promise<TimeZone> {
    if (!(location instanceof City)) {
      return null
    }
    const url = composeQuery(location, this.key)
    return this.fetcher.fetchJson<BingTimeResponse>(url).then(response => ToTimeZone(response))
  }
}

function composeQuery(location: City, key: string): string {
  return `https://dev.virtualearth.net/REST/v1/TimeZone/?query=${location.location}&key=${key}`
}

export const bingmaps_time = new BingMapsTimeEndpoint(new GetUrlFetcher(), "ArMFqe12_oR0EEZVDURVJdfuXTF3M4lVIY9aZDwT2KV1cZjX5E4Ci76U5Hg1TopI")
