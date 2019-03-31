load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

nodejs_test(
    name = "run_sample_test",
    data = [":sample_test"],
    entry_point = "weather/test/sample_test.js",
)

ts_library(
    name = "sample_test",
    srcs = ["sample_test.ts"],
    deps = [
        ":test",
    ],
    tsconfig = "tsconfig.json",
)

ts_library(
    visibility = ["//visibility:public"],
    name = "test",
    srcs = ["test.ts"],
    deps = [
        "@npm//@types/node",
    ],
    tsconfig = "tsconfig.json",
)

