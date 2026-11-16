import {test as base ,Page ,expect} from "@playwright/test"
import { LoginPage } from './../ObjectRepository/LoginPage';
import { DashBoardPage } from "../ObjectRepository/DashBoardPage'";

type Myfixture ={

    loggedInFixture:Page

}

export const test =   base.extend<Myfixture>({

    loggedInFixture: async ({page},use)=>{
     const lp = new LoginPage(page);
    await lp.gotoLoginPage();
    await lp.login(process.env.USER_NAME!,process.env.USER_PASSWORD!);
    await lp.verifySuccesFullLogin();

    await use(page);

    const hp = new DashBoardPage(page);
    await hp.logout();

    }
});
export {expect};