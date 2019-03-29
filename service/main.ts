import {parseLocations} from "weather/service/location_parser";
import {weatherIn} from "weather/service/weather_fetcher";
import {timeIn} from "weather/service/time_fetcher";

if (process.argv.length <= 2) {
  console.log("Expected usage: ./weather [(city|zip), ]");
  process.exit(-1);
}

let argument_list = process.argv.slice(2, process.argv.length);
let argument_string = argument_list.join(" ");

let locations = parseLocations(argument_string);

for (let location of locations) {
  let time = timeIn(location);
  let weather = weatherIn(location);
  console.log(`The current time in ${location} is ${time} and the weather is ${weather}.`);
}

