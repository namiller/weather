# Taken from:
# https://github.com/fwouts/bazel-typescript-example/blob/master/BUILD.bazel
package(default_visibility = ["//visibility:public"])

exports_files(["tsconfig.json"])

filegroup(
    name = "node_modules",
    srcs = glob([
        "node_modules/**/*.js",
        "node_modules/**/*.d.ts",
        "node_modules/**/*.json",
    ]),
)
