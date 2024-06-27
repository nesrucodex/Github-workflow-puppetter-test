import { TestCaseInputs } from "../constants/create_repo.js";
import {
  captureScreenshot,
  loginToGitHub,
  setUp,
  writeReport,
} from "../libs/index.js";

const createRepositoryOrAlreadyExists = async (page, repoName) => {
  await page.goto("https://github.com/new");
  await page.type("[data-testid='repository-name-input']", repoName);

  // Scroll the button into view and click it
  await page.evaluate(() => {
    const button = document.querySelector("div.aBKvw span > span");
    button.scrollIntoView();
  });

  // Wait for the button to be visible and clickable
  await page.waitForSelector("div.aBKvw span > span", { visible: true });
  await page.click("div.aBKvw span > span");

  const isRepoAlreadyExists = await page.evaluate(async () => {
    const messageElement = document.querySelector("#RepoNameInput-message");
    messageElement && messageElement.scrollIntoView();

    return (
      (!!messageElement &&
        messageElement.innerHTML.includes("already exists")) ||
      messageElement.innerHTML.includes("not be blank")
    );
  });

  if (isRepoAlreadyExists) {
    return true; // Repository already exists
  }

  try {
    await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 });
  } catch (error) {
    console.error("Navigation timeout or error occurred");
    return false;
  }

  return false;
};

const checkRepoCreationStatus = async (page) => {
  const repoCreated = await page.evaluate(() => {
    return document
      .querySelector(".Box-header.Box-header--blue h3")
      ?.innerHTML?.includes("Quick setup");
  });
  return repoCreated;
};

const printRepoCreationStatus = (repoCreated) => {
  if (repoCreated) {
    console.log("Repository creation successful!");
  } else {
    console.log("Repository creation failed.");
  }
};

export async function runTests() {
  for (const testCase of TestCaseInputs) {
    const { browser, page } = await setUp({ headless: false, slowMo: 20 });

    const { username, password, repoName } = testCase;

    await loginToGitHub(page, username, password);
    await createRepositoryOrAlreadyExists(page, repoName);

    const { screenshotPathname } = await captureScreenshot(
      page,
      username,
      "repo_creation"
    );

    const repoCreated = await checkRepoCreationStatus(page);

    await browser.close();

    printRepoCreationStatus(repoCreated);
    writeReport({
      loggedIn: repoCreated,
      testCase,
      screenshotPathname,
      pathname: "repo_creation",
    });
  }
}
