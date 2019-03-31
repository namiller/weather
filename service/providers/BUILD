load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "open_weather",
    srcs = ["open_weather.ts"],
    deps = [
        "//service/utils:url_fetcher",
        "//service:location",
        "//service:weather",
    ],
)
