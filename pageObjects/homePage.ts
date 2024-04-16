import { Page, Locator, expect } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly addToCartBtn: Locator;
  readonly viewCart: Locator;
  readonly productInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator("[data-product-id='1']").first();
    this.viewCart = page
      .locator("[class=text-center]")
      .filter({ hasText: "View Cart" });
    this.productInfo = page.locator("[class='productinfo text-center']");
  }

  async navigateToPage(url: string) {
    await this.page.goto(url);
  }

  async assertPageUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async assertText(selector: Locator, text: string) {
    await expect(selector).toHaveText(text);
  }

  async clickButton(selector: Locator) {
    await selector.click();
  }

  async storeProductInfo() {
    var productDetails = await this.productInfo.allInnerTexts();
    var specifiedProduct = productDetails.slice(0, 1).toString();
    var productPrice = specifiedProduct.slice(0, 7);
    return productPrice;
  }
}
