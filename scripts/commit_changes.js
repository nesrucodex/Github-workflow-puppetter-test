import { TestCaseInputs } from "../constants/commit_changes.js";
import {
  captureScreenshot,
  loginToGitHub,
  setUp,
  writeReport,
} from "../libs/index.js";

const commitChanges = async (page, repoUrl, commitMessage, changeText) => {
  try {
    // Navigate to the repository
    await page.goto(repoUrl, { waitUntil: "networkidle2" });

    // Click the edit button
    await page.waitForSelector("div.ehcSsh button > svg", {
      visible: true,
      timeout: 30000,
    });
    await page.click("div.ehcSsh button > svg");

    // Click inside the code editor
    await page.waitForSelector("div.cm-content > div:nth-of-type(1)", {
      visible: true,
      timeout: 30000,
    });
    await page.click("div.cm-content > div:nth-of-type(1)");

    // Clear the editor before typing new text
    await page.evaluate(() => {
      document.querySelector("div.cm-content").innerText = "";
    });

    // Enter the changes
    await page.type("div.cm-content", changeText);

    // Click the commit changes button
    await page.waitForSelector("div.cnECWi > button > span > span", {
      visible: true,
      timeout: 30000,
    });
    await page.click("div.cnECWi > button > span > span");

    // Clear the commit message input field before typing new message
    await page.waitForSelector("#commit-message-input", {
      visible: true,
      timeout: 30000,
    });
    await page.evaluate(() => {
      document.querySelector("#commit-message-input").value = "";
    });

    // Enter the commit message
    await page.type("#commit-message-input", commitMessage);

    // Confirm the commit
    await page.waitForSelector("button.gFhByl > span > span", {
      visible: true,
      timeout: 30000,
    });
    await page.click("button.gFhByl > span > span");

    // Wait for the commit to complete
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Take a screenshot after commit changes button is clicked
    const { screenshotPathname } = await captureScreenshot(
      page,
      "nanu",
      "commit_changes"
    );

    return { success: true, screenshotPathname };
  } catch (error) {
    console.error(`Error during commit changes: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const printCommitStatus = (commitResult) => {
  if (commitResult.success) {
    console.log("Commit changes successful!");
  } else {
    console.log("Commit changes failed: ", commitResult.error);
  }
};

export async function runTests() {
  for (const testCase of TestCaseInputs) {
    const { browser, page } = await setUp({ headless: false, slowMo: 20 });

    const { username, password, repoUrl, commitMessage, changeText } = testCase;

    try {
      await loginToGitHub(page, username, password);

      const commitResult = await commitChanges(
        page,
        repoUrl,
        commitMessage,
        changeText
      );

      printCommitStatus(commitResult);

      await writeReport({
        loggedIn: commitResult.success,
        testCase,
        screenshotPathname: commitResult.screenshotPathname,
        pathname: "commit_changes",
      });
    } catch (error) {
      console.error(`Test case execution error: ${error.message}`);
    } finally {
      await browser.close();
    }
  }
}
