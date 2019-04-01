export interface Location {
  location: string
  toString(): string
}

export class Zip implements Location {
  location: string
  constructor(zip: string) {
    this.location = zip
  }
  public toString(): string {
    return this.location + " (zip)"
  }
}

export class City implements Location {
  location: string
  constructor(city: string) {
    this.location = city
  }
  public toString(): string {
    return this.location + " (city)"
  }
}

function isZip(location: string) {
  const zipMatch = new RegExp('\\d{5}')
  return zipMatch.test(location)
}

function createLocation(location:string): Location {
  if (isZip(location)) {
    return new Zip(location)
  }
  return new City(location)
}

export function parseLocations(locations: string) {
  let result: Array<Location> = []
  for (let loc of locations.split(",")) {
    loc = loc.trim()
    let location = createLocation(loc)
    result.push(location)
  }
  return result
}
