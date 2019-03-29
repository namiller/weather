load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")

nodejs_binary(
    name = "hello",
    data = [":main"],
    entry_point = "weather/hello/main.js",
)

ts_library(
    name = "main",
    srcs = ["main.ts"],
    tsconfig = "tsconfig.json",
)
