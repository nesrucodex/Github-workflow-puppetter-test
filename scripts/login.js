import { TestCaseInputs } from "../constants/login.js";
import {
  captureScreenshot,
  checkLoginStatus,
  loginToGitHub,
  printLoginStatus,
  setUp,
  writeReport,
} from "../libs/index.js";

export async function runTests() {
  for (const testCase of TestCaseInputs) {
    const { browser, page } = await setUp();

    const { username, password } = testCase;

    await loginToGitHub(page, username, password);

    const { screenshotPathname } = await captureScreenshot(
      page,
      username,
      "login"
    );
    const { loggedIn } = await checkLoginStatus(page);

    await browser.close();

    printLoginStatus(loggedIn);
    writeReport({ loggedIn, testCase, screenshotPathname, pathname: "login" });
  }
}
