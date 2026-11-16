import { Page, Locator, expect } from "@playwright/test";

export class AddEmployeePage {
  readonly page: Page;
  readonly firstname: Locator;
  readonly middleName: Locator;
  readonly lastname: Locator;
  readonly employeeId: Locator;
  readonly loginDetailsCheckBox: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly saveButton: Locator;
  readonly inputByLabel = (label: string) =>
    this.page
      .locator(".oxd-input-group")
      .filter({
        has: this.page.locator("label", { hasText: new RegExp(`^${label}$`) }),
      })
      .locator("input");

  constructor(page: Page) {
    this.page = page;
    this.firstname = page.locator("input[name='firstName']");
    this.middleName = page.locator("input[name='middleName']");
    this.lastname = page.locator("input[name='lastName']");
    this.employeeId = page
      .locator(".oxd-input-group")
      .filter({ has: page.locator("label", { hasText: "Employee Id" }) })
      .locator("input");
    this.loginDetailsCheckBox = page.locator("//input[@type='checkbox']/..");

    this.username = this.inputByLabel("Username");
    this.password = this.inputByLabel("Password");
    this.confirmPassword = this.inputByLabel("Confirm Password");
    this.saveButton = page.locator("//button[text()=' Save ']");
  }

  async enterEmployeeDetails(
    fn: string,
    mn: string,
    ln: string,
    eid: string,
    un: string,
    pw: string,
  ) {
    await this.firstname.fill(fn);
    await this.lastname.fill(ln);
    await this.middleName.fill(mn);
    await this.employeeId.fill(eid);
    await expect(this.employeeId).not.toHaveValue("");
    await this.loginDetailsCheckBox.check();
    await expect(this.loginDetailsCheckBox).toBeChecked();

    await this.username.fill(un);
    await this.password.fill(pw);
    await this.confirmPassword.fill(pw);
  }

  async saveEmpDetails() {
    await this.saveButton.click();
  }


async verifySuccessfulSubmissionofEmpDetails(){
    await expect(this.page.locator("//h6[text()='Personal Details']")).toBeVisible();
}

}
