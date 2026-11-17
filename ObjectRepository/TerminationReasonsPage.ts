import { expect, Locator, Page } from "@playwright/test";

export class TerminationReasonsPage {
  readonly page: Page;
  readonly configurationMenu: Locator;
  readonly terminationReasonsMenuItem: Locator;
  readonly addButton: Locator;
  readonly nameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.configurationMenu = page
      .getByRole("navigation", { name: "Topbar Menu" })
      .getByText("Configuration", { exact: true });
    this.terminationReasonsMenuItem = page.getByRole("menuitem", {
      name: "Termination Reasons",
    });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.nameInput = page
      .locator(".oxd-input-group")
      .filter({ hasText: "Name" })
      .getByRole("textbox");
    this.saveButton = page.getByRole("button", { name: "Save" });
  }

  async gotoTerminationReasons() {
    await this.configurationMenu.click();
    await this.terminationReasonsMenuItem.click();
    await expect(this.page).toHaveURL(/\/pim\/viewTerminationReasons$/);
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.page.getByText("Add Termination Reason")).toBeVisible();
  }

  async enterReason(reason: string) {
    await this.nameInput.fill(reason);
  }

  async saveReason() {
    await this.saveButton.click();
  }

  async deleteReason(reason: string) {
    const reasonRow = this.page.getByRole("row").filter({ hasText: reason });
    if ((await reasonRow.count()) === 0) {
      return;
    }

    await reasonRow.getByRole("button").first().click();
    await this.page
      .getByRole("dialog")
      .getByRole("button", { name: /Yes, Delete/ })
      .click();
    await expect(reasonRow).toHaveCount(0);
  }
}
