import { expect, Locator, Page } from "@playwright/test";

export class VacancyPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly vacancyNameInput: Locator;
  readonly jobTitleDropdown: Locator;
  readonly descriptionInput: Locator;
  readonly hiringManagerInput: Locator;
  readonly numberOfPositionsInput: Locator;
  readonly saveButton: Locator;
  readonly vacanciesTab: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole("button", { name: "Add" });
    this.vacancyNameInput = page
      .locator(".oxd-input-group")
      .filter({ hasText: "Vacancy Name" })
      .getByRole("textbox");
    this.jobTitleDropdown = page
      .locator(".oxd-input-group")
      .filter({ hasText: "Job Title" })
      .locator(".oxd-select-text");
    this.descriptionInput = page.getByRole("textbox", {
      name: "Type description here",
    });
    this.hiringManagerInput = page.getByRole("textbox", {
      name: "Type for hints...",
    });
    this.numberOfPositionsInput = page
      .locator(".oxd-input-group")
      .filter({ hasText: "Number of Positions" })
      .getByRole("textbox");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.vacanciesTab = page.getByRole("link", {
      name: "Vacancies",
      exact: true,
    });
    this.searchButton = page.getByRole("button", {
      name: "Search",
      exact: true,
    });
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(
      this.page.getByRole("heading", { name: "Add Vacancy" }),
    ).toBeVisible();
  }

  async enterVacancyName(name: string) {
    await this.vacancyNameInput.fill(name);
  }

  async selectJobTitle(title: string) {
    await this.jobTitleDropdown.click();
    const option = this.page.getByRole("option", {
      name: title,
      exact: true,
    });
    await expect(option).toBeVisible();
    await option.click();
  }

  async enterDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async selectHiringManager(query: string, managerName: string) {
    await this.hiringManagerInput.fill(query);
    const suggestion = this.page
      .getByRole("listbox")
      .getByRole("option", { name: managerName, exact: true });
    await expect(suggestion).toBeVisible();
    await suggestion.click();
    await expect(this.hiringManagerInput).toHaveValue(managerName);
  }

  async enterNumberOfPositions(numberOfPositions: string) {
    await this.numberOfPositionsInput.fill(numberOfPositions);
  }

  async saveVacancy() {
    await this.saveButton.click();
  }

  async gotoVacancies() {
    await this.vacanciesTab.click();
    await expect(this.page).toHaveURL(/\/recruitment\/viewJobVacancy$/);
    await this.searchButton.click();
  }

  getVacancyRow(name: string) {
    return this.page.getByRole("row").filter({ hasText: name });
  }

  async deleteVacancy(name: string) {
    if (!this.page.url().endsWith("/recruitment/viewJobVacancy")) {
      await this.gotoVacancies();
    }

    const vacancyRow = this.getVacancyRow(name);
    if ((await vacancyRow.count()) === 0) {
      return;
    }

    await vacancyRow.getByRole("button").first().click();
    await this.page
      .getByRole("dialog")
      .getByRole("button", { name: /Yes, Delete/ })
      .click();
    await expect(vacancyRow).toHaveCount(0);
  }
}
