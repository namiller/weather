load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

nodejs_binary(
    name = "report",
    data = [":main"],
    entry_point = "weather/service/main.js",
)

ts_library(
    name = "main",
    srcs = ["main.ts"],
    deps = [
        ":location",
        ":time",
        ":weather",
        "@npm//@types/node",
    ],
)

ts_library(
    name = "location",
    visibility = ["//visibility:public"],
    srcs = ["location.ts"],
    deps = [
        "@npm//@types/node",
    ],
)

ts_library(
    name = "time",
    visibility = ["//visibility:public"],
    srcs = ["time.ts"],
    deps = [
        ":location",
    ],
)

ts_library(
    name = "weather",
    visibility = ["//visibility:public"],
    srcs = ["weather.ts"],
    deps = [
        ":location",
    ],
)
