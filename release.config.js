module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/jcamarcelino/observability-lib.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github",
  ],
};
