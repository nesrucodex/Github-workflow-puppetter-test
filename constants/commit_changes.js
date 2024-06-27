import { UserInfo } from "../config/user.js";
export const TestCaseInputs = [
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/kanuduba/github-puppetter-test",
    commitMessage: "Update README with new section",
    changeText: "## New Section\nThis is a new section added to the README.",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/kanuduba/github-puppetter-test",
    commitMessage: "Fix typos in README",
    changeText: "Fixed typos in the README file.",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/kanuduba/github-puppetter-test",
    commitMessage: "Update dependencies",
    changeText: "Updated the dependencies in package.json.",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/kanuduba/github-puppetter-test",
    commitMessage: "",
    changeText: "",
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoUrl: "https://github.com/kanuduba/github-puppetter-test",
    commitMessage: "Add new feature with long change text",
    changeText:
      "The testing activities confirmed that the GitHub PR workflow is reliable and user-friendly, with most requirements met satisfactorily. Ongoing optimization and security enhancements will ensure continuous improvement and adherence to high-quality standards. This report provides a concise summary of the testing process, results, and areas for improvement.",
  },
];
