import { UserInfo } from "../config/user.js";

export const TestCaseInputs = [
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/doro-02/github-puppetter-test",
    prTitle: "Update README",
    prDescription: "Added a new section to the README file.",
    expectSuccess: true,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/doro-02/github-puppetter-test-02",
    prTitle: "",
    prDescription: "Description without a title should fail.",
    expectSuccess: false,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/doro-02/github-puppetter-test-03",
    prTitle: "Title without a description should fail.",
    prDescription: "",
    expectSuccess: false,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/doro-02/github-puppetter-test-04",
    prTitle: "",
    prDescription: "",
    expectSuccess: false,
  },
];
