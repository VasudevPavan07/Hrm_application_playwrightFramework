import {Page,Locator, expect} from  "@playwright/test"

export class LoginPage{

readonly page:Page;
readonly username:Locator;
readonly password : Locator;
readonly loginbutton :Locator;


constructor(page:Page){
    this.page =page;
    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginbutton = page.locator("//button[text()=' Login ']");
}

async gotoLoginPage(){
    await this.page.goto('/');
}

async login(un:string,pw:string){
    await this.username.fill(un);
    await this.password.fill(pw);
    await this.loginbutton.click();
}

async verifySuccesFullLogin(){
    await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
}





}