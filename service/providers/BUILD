load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "time_provider",
    visibility = ["//visibility:public"],
    srcs = ["time_provider.ts"],
    deps = [
        "//service/providers/zipcode",
        "//service/providers/bingmaps",
        "//service/utils:url_fetcher",
        "//service:location",
        "//service:time",
    ],
)

ts_library(
    name = "weather_provider",
    visibility = ["//visibility:public"],
    srcs = ["weather_provider.ts"],
    deps = [
        "//service/providers/open_weather",
    ],
)

