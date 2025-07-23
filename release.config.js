module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/jcamarcelino/observability-lib.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        pkgRoot: ".",
        registry: "https://npm.pkg.github.com/"
      }
    ],
    "@semantic-release/git",
    "@semantic-release/github"
  ],
};
