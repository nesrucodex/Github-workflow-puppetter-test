import { UserInfo } from "../config/user.js";

export const TestCaseInputs = [
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/nesrucodex/github-puppetter-test",
    branchName: "test-branch-1",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/nesrucodex/github-puppetter-test",
    branchName: "",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/nesrucodex/github-puppetter-test",
    branchName: "bugfix/fix-bug-123",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/nesrucodex/github-puppetter-test",
    branchName: " ",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/nesrucodex/github-puppetter-test",
    branchName: "0",
  },
];
