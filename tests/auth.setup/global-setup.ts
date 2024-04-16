import { Browser, chromium, Page } from "@playwright/test";
import HomePage from "../../pageObjects/homePage";
import SignupLoginPage from "../../pageObjects/signup-login-page";

async function globalSetup() {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  const homePage = new HomePage(page);
  const loginPage = new SignupLoginPage(page);

  await page.goto("https://automationexercise.com/login");
  await page.locator("[data-qa='login-email']").fill("hedipi6572@acname.com");
  await page.locator("[data-qa='login-password']").fill("password");
  await page.locator("[data-qa='login-button']").click();

  await page.context().storageState({ path: "./.auth/LoginAuth.json" });
  await browser.close();
}

export default globalSetup;
