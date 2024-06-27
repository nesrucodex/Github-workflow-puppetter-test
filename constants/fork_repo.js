import { UserInfo } from "../config/user.js";

export const TestCaseInputs = [
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nesrucodex",
    forkRepoName: "forked-repo-test-1",
    description: "This is a test fork for 'nesrucodex'",
    nthOfType: 6,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nesrucodex",
    forkRepoName: "forked-repo-test-10",
    description: "This is a test fork for 'nesrucodex'",
    nthOfType: 10,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nesrucodex",
    forkRepoName: "forked-repo-test-2",
    description: "This is a test fork for 'nesrucodex' which already forkded",
    nthOfType: 6,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nonExistentRepoOwner",
    forkRepoName: "forked-repo-test-3",
    description: "This is a test fork for a non-existent repo owner",
    nthOfType: 1,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nesrucodex",
    forkRepoName: "forked-repo-test-4",
    description: "This is a test fork for 'nesrucodex' which doesn't exists",
    nthOfType: 999,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nesrucodex",
    forkRepoName: "forked-repo-!@#$%^&*()",
    description: "This is a test fork for 'nesrucodex' with special characters",
    nthOfType: 8,
  },
  {
    username: UserInfo.username,
    password: UserInfo.password,
    repoOwner: "nesrucodex",
    forkRepoName: "forked-repo-test-5",
    description:
      "This is a test fork for 'nesrucodex' with a very long description to test the handling of long text input in the description field",
    nthOfType: 7,
  },
];
