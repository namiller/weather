load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_test")
load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")

nodejs_test(
    name = "run_sample_test",
    data = ["sample_test"],
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
    name = "test",
    srcs = ["test.ts"],
    deps = [],
    tsconfig = "tsconfig.json",
)

