load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

jasmine_node_test(
    name = "zipcode_live_test",
    srcs = [":zipcode_live_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "zipcode_live_test_lib",
    testonly = True,
    srcs = ["zipcode_live_test.spec.ts"],
    deps = [
        ":zipcode",
        "//service:location",
        "@npm//@types/jasmine",
    ],
)

jasmine_node_test(
    name = "zipcode_test",
    srcs = [":zipcode_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "zipcode_test_lib",
    testonly = True,
    srcs = ["zipcode_test.spec.ts"],
    deps = [
        ":zipcode",
        "//service:location",
        "//service/utils:mock_url_fetcher",
        "@npm//@types/jasmine",
    ],
)

ts_library(
    name = "zipcode",
    visibility = ["//visibility:public"],
    srcs = ["zipcode.ts"],
    deps = [
        "//service/utils:url_fetcher",
        "//service:location",
        "//service:time",
    ],
)

