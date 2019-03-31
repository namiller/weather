load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

jasmine_node_test(
    name = "url_fetcher_test",
    srcs = [":url_fetcher_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "url_fetcher_test_lib",
    srcs = ["url_fetcher_test.spec.ts"],
    deps = [
        ":url_fetcher",
        "@npm//@types/jasmine",
        "@npm//@types/node",
    ],
)

ts_library(
    name = "url_fetcher",
    visibility = ["//visibility:public"],
    srcs = ["url_fetcher.ts"],
    deps = [
        "@npm//@types/node-fetch",
        "@npm//@types/node",
    ],
)

ts_library(
    name = "mock_url_fetcher",
    visibility = ["//visibility:public"],
    testonly = True,
    srcs = ["mock_url_fetcher.ts"],
    deps = [
        ":url_fetcher",
    ],
)
