import {Page,Locator, expect} from "@playwright/test"

export class PimPage{


    readonly page:Page;
    readonly addButton:Locator;
    readonly employeeIdInput:Locator;
    readonly searchButton :Locator;
    readonly resultInfo :Locator;

    constructor(page:Page){
     this.page =page;
     this.addButton =page.locator("//button[text()=' Add ']");
     this.employeeIdInput =page.locator("//label[text()='Employee Id']/../..//input");
     this.searchButton =page.locator("//button[text()=' Search ']");
     this.resultInfo=page.locator("//div[@class='oxd-table-card']/descendant::div[@role='cell'][2]/div");
    }


async clickOnAdd(){
  await  this.addButton.click();
}

async verifySuccesfullyNaviagationToAddEmployeeDetailsPage(){
    await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee");
}

async verifyEmpDetails(empno:string){
  await  this.employeeIdInput.fill(empno);
  await  this.searchButton.click();
 expect((await this.resultInfo.textContent())?.trim()).toBe(empno);
}







}