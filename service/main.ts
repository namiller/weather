import {parseLocations} from "weather/service/location"
import {WeatherApiEndpoint, WeatherReport} from "weather/service/weather"
import {TimeApiEndpoint, TimeZone} from "weather/service/time"
import {timezones} from "weather/service/providers/time_provider"
import {weather} from "weather/service/providers/weather_provider"

if (process.argv.length <= 2) {
  console.log("Expected usage: ./weather [(city|zip), ]")
  process.exit(-1)
}

const argument_list = process.argv.slice(2, process.argv.length)
const argument_string = argument_list.join(" ")

const locations = parseLocations(argument_string)

for (const location of locations) {
  const timezone_report = timezones.FetchTime(location)
  const weather_report = weather.FetchWeather(location)
  if (!timezone_report || !weather_report) {
    console.log(`Sorry, unable to lookup ${location}`)
  } else {
    Promise.all([timezone_report, weather_report]).then(([timezone_report, weather_report]) => {
      console.log(`The current time in ${location} is ${timezone_report.Time()} and the weather is ${weather_report}.`)
    })
  }
}

