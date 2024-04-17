import { Page, Locator, expect, test } from "@playwright/test";

export default class CartPage {
  readonly page: Page;
  readonly cartPriceUI: Locator;
  readonly cartPriceBE: Locator;
  readonly itemInCartTitleUI: Locator;
  readonly itemInCartTitleBE: Locator;
  readonly checkOutBTN: Locator;
  readonly orderValidation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartPriceUI = page
      .locator("[class='cart_price']")
      .filter({ hasText: "Rs. 500" });
    this.cartPriceBE = page.locator("[class='cart_price']");
    this.itemInCartTitleUI = page
      .getByRole("link")
      .filter({ hasText: "Blue Top" });
    this.itemInCartTitleBE = page.locator("[href='/product_details/1']");
    this.checkOutBTN = page.locator("[class='btn btn-default check_out']");
    this.orderValidation = page.getByTestId("order-placed");
  }

  async verifyCartDetailsUI() {
    await expect(this.cartPriceUI).toHaveText("Rs. 500");
    await expect(this.itemInCartTitleUI).toHaveText("Blue Top");
  }

  async verifyCartPriceLogically(storedDetails: string[]) {
    const cartPriceValue = (await this.cartPriceBE.allInnerTexts()).toString();
    const cartItemTitle = (
      await this.itemInCartTitleBE.allInnerTexts()
    ).toString();
    if (
      cartPriceValue === storedDetails[0] &&
      cartItemTitle === storedDetails[1]
    ) {
      return true;
    } else {
      test.fail();
    }
  }

  async validateOrderPlaced() {
    this.orderValidation.isVisible();
    const textFetched = (await this.orderValidation.allInnerTexts())
      .toString()
      .toUpperCase();
    await expect(textFetched).toBe("ORDER PLACED!");
  }
}
