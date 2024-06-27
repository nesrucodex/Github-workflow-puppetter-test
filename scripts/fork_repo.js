import { TestCaseInputs } from "../constants/fork_repo.js";
import {
  captureScreenshot,
  loginToGitHub,
  setUp,
  writeReport,
} from "../libs/index.js";

const forkRepository = async (
  page,
  repoOwner,
  forkRepoName,
  description,
  nthOfType
) => {
  try {
    // Navigate to the specified repository owner
    await page.goto(`https://github.com/${repoOwner}?tab=repositories`, {
      waitUntil: "networkidle2",
    });

    const repoPathname = `li:nth-of-type(${nthOfType}) h3 > a`;
    const repoExists = await page.evaluate((repoPathname) => {
      const linkElement = document.querySelector(repoPathname);
      if (!linkElement) return false;
      linkElement.scrollIntoView();
      return true;
    }, repoPathname);

    if (!repoExists) {
      console.error(`Repository not found at position: ${nthOfType}`);
      return false;
    }

    // Click on the repository link
    await page.waitForSelector(repoPathname, { visible: true, timeout: 30000 });
    await page.click(repoPathname);

    // Wait for the repository page to load
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Click on the fork button
    await page.waitForSelector("#fork-button", {
      visible: true,
      timeout: 30000,
    });
    await page.click("#fork-button");

    // Type in the repository name to fork
    await page.waitForSelector("[data-testid='repository-name-input']", {
      visible: true,
      timeout: 30000,
    });
    await page.type("[data-testid='repository-name-input']", forkRepoName);

    // Click on the description field and type in a description
    await page.waitForSelector("#\\:rg\\:", { visible: true, timeout: 30000 });
    await page.type("#\\:rg\\:", description);

    // Click on the "Create fork" button
    const forkButtonSelector = "div.aBKvw span > span";
    await page.evaluate((forkButtonSelector) => {
      const button = document.querySelector(forkButtonSelector);
      button.scrollIntoView();
    }, forkButtonSelector);

    await page.waitForSelector(forkButtonSelector, {
      visible: true,
      timeout: 30000,
    });
    await page.click(forkButtonSelector);

    // Wait for navigation to the forked repository page
    try {
      await page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 60000,
      });
    } catch (error) {
      console.error(
        "Navigation timeout or error occurred during fork creation"
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error during repository fork: ${error.message}`);
    return false;
  }
};

const checkForkCreationStatus = async (page, forkRepoName) => {
  try {
    const forkCreated = await page.evaluate((forkRepoName) => {
      const repoTitleElement = document.querySelector(
        "#repo-title-component a"
      );
      return repoTitleElement?.innerHTML?.includes(forkRepoName) ?? false;
    }, forkRepoName);
    return forkCreated;
  } catch (error) {
    console.error(`Error checking fork creation status: ${error.message}`);
    return false;
  }
};

const printForkCreationStatus = (forkCreated) => {
  if (forkCreated) {
    console.log("Repository fork creation successful!");
  } else {
    console.log("Repository fork creation failed.");
  }
};

export async function runTests() {
  for (const testCase of TestCaseInputs) {
    const { browser, page } = await setUp({ headless: false, slowMo: 20 });

    const {
      username,
      password,
      repoOwner,
      forkRepoName,
      description,
      nthOfType,
    } = testCase;

    try {
      await loginToGitHub(page, username, password);

      const forkCreated = await forkRepository(
        page,
        repoOwner,
        forkRepoName,
        description,
        nthOfType
      );

      const screenshotPathname = await captureScreenshot(
        page,
        username,
        "fork_creation"
      );

      printForkCreationStatus(forkCreated);
      await writeReport({
        loggedIn: forkCreated,
        testCase,
        screenshotPathname,
        pathname: "fork_creation",
      });
    } catch (error) {
      console.error(`Test case execution error: ${error.message}`);
    } finally {
      await browser.close();
    }
  }
}
