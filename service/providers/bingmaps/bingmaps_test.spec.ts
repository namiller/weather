import {Zip, City} from "weather/service/location";
import {BingMapsTimeEndpoint} from "weather/service/providers/bingmaps/bingmaps";
import {MockGetFetcher} from "weather/service/utils/mock_url_fetcher";

describe("City time unit tests", function() {
  it("valid response", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new BingMapsTimeEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'https://dev.virtualearth.net/REST/v1/TimeZone/?query=Seattle&key=none',
      `{"authenticationResultCode":"ValidCredentials","brandLogoUri":"http:\/\/dev.virtualearth.net\/Branding\/logo_powered_by.png","copyright":"Copyright © 2019 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.","resourceSets":[{"estimatedTotal":1,"resources":[{"__type":"RESTTimeZone:http:\/\/schemas.microsoft.com\/search\/local\/ws\/rest\/v1","timeZoneAtLocation":[{"placeName":"Seattle, WA","timeZone":[{"genericName":"Pacific Standard Time","abbreviation":"PST","ianaTimeZoneId":"America\/Los_Angeles","windowsTimeZoneId":"Pacific Standard Time","utcOffset":"-8:00","convertedTime":{"localTime":"2019-03-31T22:28:08","utcOffsetWithDst":"-7:00","timeZoneDisplayName":"Pacific Daylight Time","timeZoneDisplayAbbr":"PDT"}}]}]}]}],"statusCode":200,"statusDescription":"OK","traceId":"70c9773c904747a9b591abb54cb53729|CO3C4CD6C0|7.7.0.0|Ref A: 793F9E6466C34801BCA6AD34E1B10226 Ref B: CO1EDGE0411 Ref C: 2019-04-01T05:28:08Z"}`
    );

    let response = await endpoint.FetchTime(new City("Seattle"));
    expect(response).toBeDefined();
    expect(response.identifier).toEqual("America/Los_Angeles");
    expect(response.abbreviation).toEqual("PST");
  });

  it("invalid response", async function() {
    let mockFetcher = new MockGetFetcher();
    let endpoint = new BingMapsTimeEndpoint(mockFetcher, "none");
    mockFetcher.registerResponse(
      'https://dev.virtualearth.net/REST/v1/TimeZone/?query=notacity&key=none',
      `{"authenticationResultCode":"ValidCredentials","brandLogoUri":"http:\/\/dev.virtualearth.net\/Branding\/logo_powered_by.png","copyright":"Copyright © 2019 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.","resourceSets":[{"estimatedTotal":1,"resources":[{"__type":"RESTTimeZone:http:\/\/schemas.microsoft.com\/search\/local\/ws\/rest\/v1","timeZoneAtLocation":[]}]}],"statusCode":200,"statusDescription":"OK","traceId":"bc1116c33f1147a09b49ca04b5eb8458|CO39D4ABA5|7.7.0.0|Ref A: 6E0E1A6F8B3143388F5670FE4D24028A Ref B: CO1EDGE0919 Ref C: 2019-04-01T05:54:30Z"}`
    );

    let response = await endpoint.FetchTime(new City("notacity"));
    expect(response).toBeNull();
  });

});
