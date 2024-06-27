import puppeteer from "puppeteer";
import { sleep, writeToFile } from "../utils/index.js";

export async function setUp(config = { headless: true, slowMo: 0 }) {
  const { headless, slowMo } = config;

  const browser = await puppeteer.launch({
    headless,
    slowMo,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1263, height: 632, deviceScaleFactor: 1 });

  return {
    browser,
    page,
  };
}

export async function loginToGitHub(page, username, password) {
  await page.goto("https://github.com/login");

  await page.type("#login_field", username);
  await page.type("#password", password);
  await page.click('[name="commit"]');

  await page.waitForNavigation();

  // await sleep(30_000);

  return { page };
}

export async function checkLoginStatus(page) {
  const loggedIn = await page.evaluate(() => {
    return document.querySelector("div.AppHeader-context-full span") !== null;
  });
  return { loggedIn };
}

export function printLoginStatus(loggedIn) {
  if (loggedIn) console.log("Login Successful");
  else console.log("Login Failed");
}
export async function captureScreenshot(page, username, folderName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const screenshotPathname = `reports/${folderName}/images/${username}-${timestamp}.png`;
  await page.screenshot({ path: screenshotPathname, fullPage: true });
  return { screenshotPathname };
}

export async function writeReport({
  loggedIn,
  testCase,
  screenshotPathname,
  pathname,
}) {
  writeToFile(
    `reports/${pathname}/report.txt`,
    `==> Test result for: \n\t ${JSON.stringify(testCase, null, 3)} \n\t ==> ${
      loggedIn ? "Passed!" : "Failed!"
    }\n\t # Screen shot at [${screenshotPathname}]\n\n`
  );
}
