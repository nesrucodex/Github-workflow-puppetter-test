import { TestCaseInputs } from "../constants/create_branch.js";
import {
  captureScreenshot,
  loginToGitHub,
  setUp,
  writeReport,
} from "../libs/index.js";

const createNewBranch = async (page, repoUrl, branchName) => {
  await page.goto(repoUrl, { waitUntil: "networkidle2" });

  // Click to open branch menu
  await page.waitForSelector(
    "div.eLcVee a:nth-of-type(1) span:nth-of-type(2) span",
    { visible: true }
  );
  await page.click("div.eLcVee a:nth-of-type(1) span:nth-of-type(2) span");

  // Click the "New branch" button
  await page.waitForSelector("div.application-main header span > span", {
    visible: true,
  });
  await page.click("div.application-main header span > span");

  // Type the new branch name
  await page.waitForSelector("#__primerPortalRoot__ input", { visible: true });
  await page.type("#__primerPortalRoot__ input", branchName);

  // Click the "Create new branch" button
  await page.waitForSelector("button.gFhByl > span > span", { visible: true });
  await page.click("button.gFhByl > span > span");

  try {
    await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 });
  } catch (error) {
    console.error("Navigation timeout or error occurred");
    return false;
  }

  return true;
};

const checkBranchCreationStatus = async (page, branchName) => {
  const branchCreated = await page.evaluate((branchName) => {
    const branchSelector = `a[title='${branchName}']`;
    return !!document.querySelector(branchSelector);
  }, branchName);
  return branchCreated;
};

const printBranchCreationStatus = (branchCreated) => {
  if (branchCreated) {
    console.log("Branch creation successful!");
  } else {
    console.log("Branch creation failed.");
  }
};

export async function runTests() {
  for (const testCase of TestCaseInputs) {
    const { browser, page } = await setUp({ headless: false, slowMo: 20 });

    const { username, password, repoUrl, branchName } = testCase;

    await loginToGitHub(page, username, password);
    const branchCreated = await createNewBranch(page, repoUrl, branchName);

    const { screenshotPathname } = await captureScreenshot(
      page,
      username,
      "create_branch"
    );

    await browser.close();

    printBranchCreationStatus(branchCreated);
    writeReport({
      loggedIn: branchCreated,
      testCase,
      screenshotPathname,
      pathname: "create_branch",
    });
  }
}
