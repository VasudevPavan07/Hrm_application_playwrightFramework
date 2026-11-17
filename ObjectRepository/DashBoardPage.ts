import { Page, Locator, expect } from "@playwright/test";

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
readonly menuToggle:Locator;



constructor(page:Page){
    this.page =page;
    this.adminLink =  page.locator("");
    this.profileIcon = page.locator("li[class='oxd-userdropdown']");
    this.logoutButton = page.locator("//a[text()='Logout']");
    this.pimlink = page.locator("//span[text()='PIM']");
    this.dashboardLink = page.locator("");
    this.performanceLink = page.locator("");
    this.leaveLink = page.locator("");
    this.recruitmentLink = page.getByRole("link", { name: "Recruitment", exact: true });
    this.timeLink =page.locator("");
    this.myinfolink = page.locator("");
    this.buzzLink = page.getByRole("link", { name: "Buzz", exact: true });
    this.menuToggle = page.locator(".oxd-topbar-header-hamburger");
}

async logout(){
    await this.profileIcon.click();
    await this.logoutButton.click();
}

async gotoPim(){
    await this.pimlink.click();
}

async gotoBuzz(){
    await expect(this.buzzLink).toBeAttached();
    if (!(await this.buzzLink.isVisible())) {
        await this.menuToggle.click();
    }
    await expect(this.buzzLink).toBeVisible();
    await this.buzzLink.click();
    await expect(this.page).toHaveURL(/\/buzz\/viewBuzz$/);
}

async gotoRecruitment(){
    await expect(this.recruitmentLink).toBeAttached();
    if (!(await this.recruitmentLink.isVisible())) {
        await this.menuToggle.click();
    }
    await expect(this.recruitmentLink).toBeVisible();
    await this.recruitmentLink.click();
    await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates$/);
}









}