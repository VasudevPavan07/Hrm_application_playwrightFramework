import { Page, Locator } from "@playwright/test";

export class DashBoardPage{

readonly page:Page;
readonly profileIcon:Locator;
readonly logoutButton:Locator;
readonly  adminLink:Locator;
readonly pimlink:Locator;
readonly leaveLink:Locator;
readonly timeLink:Locator;
readonly recruitmentLink:Locator;
readonly myinfolink:Locator;
readonly performanceLink:Locator;
readonly dashboardLink:Locator;
readonly buzzLink:Locator;



constructor(page:Page){
    this.page =page;
    this.adminLink =  page.locator("");
    this.profileIcon = page.locator("li[class='oxd-userdropdown']");
    this.logoutButton = page.locator("//a[text()='Logout']");
    this.pimlink = page.locator("//span[text()='PIM']");
    this.dashboardLink = page.locator("");
    this.performanceLink = page.locator("");
    this.leaveLink = page.locator("");
    this.recruitmentLink =page.locator("");
    this.timeLink =page.locator("");
    this.myinfolink = page.locator("");
    this.buzzLink = page.locator("")
}


async logout(){
    await this.profileIcon.click();
    await this.logoutButton.click();
}

async gotoPim(){
    await this.pimlink.click();
}









}