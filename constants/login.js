import { UserInfo } from "../config/user.js";

export const TestCaseInputs = [
  {
    username: UserInfo.username,
    password: UserInfo.password,
    description: "Valid username and password",
  },
  {
    username: "kubucodex",
    password: "123@doro",
    description: "Valid username and invalid password",
  },
  {
    username: "kubucod",
    password: "1234@doro",
    description: "Invalid username and valid password",
  },
  {
    username: "kubucod",
    password: "123@doro",
    description: "Invalid username and password",
  },
];
