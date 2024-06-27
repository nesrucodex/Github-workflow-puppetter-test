import { TestCaseInputs } from "../constants/pull_request.js";
import {
  captureScreenshot,
  loginToGitHub,
  setUp,
  writeReport,
} from "../libs/index.js";

const createPullRequest = async (page, repoUrl, prTitle, prDescription) => {
  try {
    await page.goto(repoUrl, { waitUntil: "networkidle2" });

    // Click the pull request tab/button
    const prTabSelector =
      'button[id^=":r"][aria-haspopup="true"].types__StyledButton-sc-ws60qy-0';
    await page.waitForSelector(prTabSelector, {
      visible: true,
      timeout: 30000,
    });
    await page.click(prTabSelector);

    // Click the "Open pull request" button
    const openPrButtonSelector =
      "#__primerPortalRoot__ div.flex-wrap span > span";
    await page.waitForSelector(openPrButtonSelector, {
      visible: true,
      timeout: 30000,
    });
    await page.click(openPrButtonSelector);

    // Clear the title input field before typing new title
    await page.waitForSelector("#pull_request_title", {
      visible: true,
      timeout: 30000,
    });
    await page.evaluate(() => {
      document.querySelector("#pull_request_title").value = "";
    });

    // Enter the pull request title
    await page.type("#pull_request_title", prTitle);

    // Clear the description input field before typing new description
    await page.waitForSelector("#pull_request_body", {
      visible: true,
      timeout: 30000,
    });
    await page.evaluate(() => {
      document.querySelector("#pull_request_body").value = "";
    });

    // Enter the pull request description
    await page.type("#pull_request_body", prDescription);

    // Click the "Create pull request" button
    await page.waitForSelector("div.my-2 button > span", {
      visible: true,
      timeout: 30000,
    });
    await page.click("div.my-2 button > span");

    console.log("Pull request creation successful!");
    return true;
  } catch (error) {
    console.error(`Error during pull request creation: ${error.message}`);
    return false;
  }
};

const printPullRequestCreationStatus = (prCreated) => {
  if (prCreated) {
    console.log("Pull request creation successful!");
  } else {
    console.log("Pull request creation failed.");
  }
};

export async function runTests() {
  for (const testCase of TestCaseInputs) {
    const { browser, page } = await setUp({ headless: false, slowMo: 20 });

    const {
      username,
      password,
      repoUrl,
      prTitle,
      prDescription,
      expectSuccess,
    } = testCase;

    await loginToGitHub(page, username, password);
    const prCreated = await createPullRequest(
      page,
      repoUrl,
      prTitle,
      prDescription
    );

    const { screenshotPathname } = await captureScreenshot(
      page,
      username,
      "pull_request"
    );

    await browser.close();

    printPullRequestCreationStatus(prCreated);
    writeReport({
      loggedIn: prCreated,
      testCase,
      screenshotPathname,
      pathname: "pull_request",
    });

    // Assert the result
    if (prCreated !== expectSuccess) {
      console.error(
        `Test case failed: Expected ${expectSuccess} but got ${prCreated}`
      );
    }
  }
}
