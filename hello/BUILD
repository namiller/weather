load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

nodejs_binary(
    name = "hello",
    data = [":main"],
    entry_point = "weather/hello/main.js",
)

ts_library(
    name = "main",
    srcs = ["main.ts"],
    deps = [
        ":greeter",
        "@npm//@types/node",
    ],
)

ts_library(
    name = "greeter",
    srcs = ["lib.ts"],
)
