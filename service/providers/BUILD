load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

jasmine_node_test(
    name = "open_weather_live_test",
    srcs = [":open_weather_live_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "open_weather_live_test_lib",
    testonly = True,
    srcs = ["open_weather_live_test.spec.ts"],
    deps = [
        ":open_weather",
        "//service:location",
        "@npm//@types/jasmine",
    ],
)

jasmine_node_test(
    name = "open_weather_test",
    srcs = [":open_weather_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "open_weather_test_lib",
    testonly = True,
    srcs = ["open_weather_test.spec.ts"],
    deps = [
        ":open_weather",
        "//service:location",
        "//service/utils:mock_url_fetcher",
        "@npm//@types/jasmine",
    ],
)

ts_library(
    name = "open_weather",
    srcs = ["open_weather.ts"],
    deps = [
        "//service/utils:url_fetcher",
        "//service:location",
        "//service:weather",
    ],
)

