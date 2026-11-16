import { test, expect } from "@playwright/test";
import { LoginPage } from "../ObjectRepository/LoginPage";

test.describe("login test", async () => {
  // let logindata: string[][] = [
  //   ["Admin", "admin123", true],
  //   ["admin", "Admin123", "invalid"],
  //   ["", "", "inavlid"],
  // ];

  type Logindata ={
    username:string,
    password:string,
    valid:boolean
  }


let data :Logindata[] =[{username:"Admin" ,password:"admin123" ,valid:true},
  {username:"admin123",password:"Admin",valid:false},{username:"",password:"",valid:false}
]



  data.forEach((user) => {
    test(`login test for  users ${user.username}`, async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.gotoLoginPage();
      await lp.login(user.username, user.password);

      if (user.valid) {
        await lp.verifySuccesFullLogin();
      } else {
        await expect(page).toHaveURL(
          "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
      }
    });
  });
});
