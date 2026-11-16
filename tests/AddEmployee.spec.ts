import { expect } from "@playwright/test";
import { LoginPage } from "../ObjectRepository/LoginPage";
import { DashBoardPage } from "../ObjectRepository/DashBoardPage'";
import { PimPage } from "../ObjectRepository/PimPage";
import { AddEmployeePage } from "../ObjectRepository/AddEmployeePage";
import { test } from "../fixtures/Loginfixture";

test.describe("Add employee test", () => {
  // test.beforeEach("login", async ({ page }) => {
  //   const lp = new LoginPage(page);
  //  await lp.gotoLoginPage();
  // await  lp.login("Admin", "admin123");
  // await  lp.verifySuccesFullLogin();
  // });

  // test.afterEach("logout", async ({ loginFixture }) => {
  //   const hp = new DashBoardPage(loginFixture);
  //   await hp.logout();
  // });

  test("add an employee", async ({ loggedInFixture}) => {
    const hp = new DashBoardPage(loggedInFixture);
    await hp.gotoPim();
    const pimpage = new PimPage(loggedInFixture);
    await pimpage.clickOnAdd();
    await pimpage.verifySuccesfullyNaviagationToAddEmployeeDetailsPage();

    const addEmpDetailspage = new AddEmployeePage(loggedInFixture);
    const empNo = Math.floor(Math.random() * 10000) + 1 + "";
    await addEmpDetailspage.enterEmployeeDetails(
      "kumar",
      "sangakara",
      "srilanka",
      empNo,
      "kumar" + empNo,
      "Test@123",
    );

    await addEmpDetailspage.saveEmpDetails();
    await addEmpDetailspage.verifySuccessfulSubmissionofEmpDetails();

    await hp.gotoPim();

    await pimpage.verifyEmpDetails(empNo);
  });
});
