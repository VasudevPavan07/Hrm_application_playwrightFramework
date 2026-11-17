import { expect, Locator, Page } from "@playwright/test";

export class BuzzPage {
  readonly page: Page;
  readonly postInput: Locator;
  readonly postButton: Locator;
  readonly feed: Locator;
  readonly postBodies: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postInput = page.getByRole("textbox", {
      name: "What's on your mind?",
    });
    this.postButton = page.getByRole("button", { name: "Post", exact: true });
    this.feed = page.locator(".orangehrm-buzz-newsfeed-posts");
    this.postBodies = this.feed.locator(".orangehrm-buzz-post-body-text");
  }

  async createPost(text: string) {
    await this.postInput.fill(text);
    await this.postButton.click();
  }

  getPostBody(text: string) {
    return this.feed.getByText(text, { exact: true });
  }

  async deletePost(text: string) {
    const postBody = this.getPostBody(text);
    if ((await postBody.count()) === 0) {
      return;
    }

    const postCard = this.feed
      .locator(".oxd-grid-item")
      .filter({ hasText: text });
    await postCard.getByRole("button").first().click();
    await this.page
      .getByRole("menu")
      .getByText("Delete Post", { exact: true })
      .click();
    await this.page
      .getByRole("dialog")
      .getByRole("button", { name: /Yes, Delete/ })
      .click();
    await expect(postCard).toHaveCount(0);
  }
}
