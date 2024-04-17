import { test as setup } from "@playwright/test";
import HomePage from "../../pageObjects/homePage";
import SignupLoginPage from "../../pageObjects/signup-login-page";

const authFile = "./.auth/LoginAuth.json";

setup("Sign in", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new SignupLoginPage(page);
  await homePage.navigateToPage("/login");
  await loginPage.loginForm("hedipi6572@acname.com", "password");
  await homePage.assertPageUrl("/");

  await page.context().storageState({ path: authFile });
});
