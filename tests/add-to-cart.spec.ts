import { test, type Page } from "@playwright/test";
import HomePage from "../pageObjects/homePage";
import CartPage from "../pageObjects/cartPage";
import CheckOut from "../pageObjects/checkOut";

test("Add item to cart and checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkOut = new CheckOut(page);

  await homePage.navigateToPage("/");
  const storedPriceForItem = await homePage.storeProductInfo();
  await homePage.clickButton(homePage.addToCartBtn);
  await homePage.clickButton(homePage.viewCart);
  await homePage.assertPageUrl("/view_cart");
  await cartPage.verifyCartPriceUI();

  await cartPage.verifyCartPriceLogically(storedPriceForItem);

  await homePage.clickButton(cartPage.checkOutBTN);

  await homePage.assertPageUrl("/checkout");
  await homePage.blockAds();

  await homePage.clickButton(cartPage.checkOutBTN);
  await checkOut.validateTitle();

  await checkOut.fillInCreditCardForm();

  await homePage.clickButton(checkOut.clickPayBTN);

  await cartPage.validateOrderPlaced();
});
