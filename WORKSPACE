workspace(name = "weather")
# Rules for typescript taken from:
# https://github.com/fwouts/bazel-typescript-example/blob/master/WORKSPACE

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "213dcf7e72f3acd4d1e369b7a356f3e5d9560f380bd655b13b7c0ea425d7c419",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.27.9/rules_nodejs-0.27.9.tar.gz"],
)

#load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

#git_repository(
#    name = "build_bazel_rules_nodejs",
#    remote = "https://github.com/bazelbuild/rules_nodejs.git",
#    tag = "0.27.9",
#)

#load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")

#node_repositories(package_json = ["//:package.json"])

load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

#load("@build_bazel_rules_nodejs//:defs.bzl", "npm_install")

#npm_install(
#    name = "npm",
#    package_json = "//:package.json",
#    package_lock_json = "//:package-lock.json",
#)

# Include @bazel/typescript in package.json#devDependencies
#local_repository(
#    name = "build_bazel_rules_typescript",
#    path = "node_modules/@bazel/typescript",
#)
#

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()
