import { Page, Locator, expect, test } from "@playwright/test";

export default class CartPage {
  readonly page: Page;
  readonly cartPrice1: Locator;
  readonly cartDetails: Locator;
  readonly checkOutBTN: Locator;
  readonly orderValidation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartPrice1 = page
      .locator("[class='cart_price']")
      .filter({ hasText: "Rs. 500" });
    this.cartDetails = page.locator("[class='cart_price']");
    this.checkOutBTN = page.locator("[class='btn btn-default check_out']");
    this.orderValidation = page.getByTestId("order-placed");
  }

  async verifyCartPriceUI() {
    await expect(this.cartPrice1).toHaveText("Rs. 500");
  }

  async verifyCartPriceLogically(storedPrice: string) {
    const cartPriceValue = (await this.cartDetails.allInnerTexts()).toString();
    if (cartPriceValue === storedPrice) {
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
