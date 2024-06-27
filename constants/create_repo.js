import { UserInfo } from "../config/user.js";

export const TestCaseInputs = [
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "test-repo-3",
    description: "Valid repository name",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "existing-repo",
    description: "Repository name that already exists",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "123",
    description: "Numeric repository name",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "@123",
    description: "Special character in repository name",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: " ",
    description: "Whitespace as repository name",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "",
    description: "Empty repository name",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "a-very-long-repository-name-that-exceeds-the-typical-limit",
    description: "Long repository name",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoName: "repo-with-hyphens-and_underscores",
    description: "Repository name with hyphens and underscores",
  },
];
