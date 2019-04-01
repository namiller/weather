load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

jasmine_node_test(
    name = "bingmaps_live_test",
    srcs = [":bingmaps_live_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "bingmaps_live_test_lib",
    testonly = True,
    srcs = ["bingmaps_live_test.spec.ts"],
    deps = [
        ":bingmaps",
        "//service:location",
        "//service/utils:mock_url_fetcher",
        "@npm//@types/jasmine",
    ],
)

jasmine_node_test(
    name = "bingmaps_test",
    srcs = [":bingmaps_test_lib"],
    node_modules = "@npm//:node_modules",
)

ts_library(
    name = "bingmaps_test_lib",
    testonly = True,
    srcs = ["bingmaps_test.spec.ts"],
    deps = [
        ":bingmaps",
        "//service:location",
        "//service/utils:mock_url_fetcher",
        "@npm//@types/jasmine",
    ],
)

ts_library(
    name = "bingmaps",
    visibility = ["//visibility:public"],
    srcs = ["bingmaps.ts"],
    deps = [
        "//service/utils:url_fetcher",
        "//service:location",
        "//service:time",
    ],
)

