import {generateGreeting} from "weather/hello/lib";

// argv[0] is node, argv[1] is hello, so we want argv[2].
let name = "World";
if (process.argv.length >= 3) {
  name = process.argv[2];
}

console.log(generateGreeting(name));
