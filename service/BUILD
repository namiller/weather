load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")

nodejs_binary(
    name = "report",
    data = [":main"],
    entry_point = "weather/service/main.js",
)

ts_library(
    name = "main",
    srcs = ["main.ts"],
    deps = [
        ":location_parser",
        ":time_fetcher",
        ":weather_fetcher",
    ],
    tsconfig = "tsconfig.json",
)

ts_library(
    name = "location_parser",
    srcs = ["location_parser.ts"],
    deps = [],
    tsconfig = "tsconfig.json",
)

ts_library(
    name = "time_fetcher",
    srcs = ["time_fetcher.ts"],
    deps = [],
    tsconfig = "tsconfig.json",
)

ts_library(
    name = "weather_fetcher",
    srcs = ["weather_fetcher.ts"],
    deps = [],
    tsconfig = "tsconfig.json",
)
