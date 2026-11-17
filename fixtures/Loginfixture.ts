import {test as base ,Page ,expect} from "@playwright/test"
import { LoginPage } from './../ObjectRepository/LoginPage';
import { DashBoardPage } from "../ObjectRepository/DashBoardPage";

type Myfixture ={

    loggedInFixture:Page

}

export const test =   base.extend<Myfixture>({

    loggedInFixture: async ({page},use)=>{
     const lp = new LoginPage(page);
    await lp.gotoLoginPage();
    const username = process.env.USER_NAME;
    const password = process.env.USER_PASSWORD;

    if (!username || !password) {
      throw new Error("USER_NAME and USER_PASSWORD must be set in .env");
    }
    await lp.login(process.env.USER_NAME!,process.env.USER_PASSWORD!);
    await lp.verifySuccesFullLogin();

    await use(page);

   

 try {
      await new DashBoardPage(page).logout();
    } catch {
      // don't let a logout problem hide the real test result
    }





    }
});
export {expect};