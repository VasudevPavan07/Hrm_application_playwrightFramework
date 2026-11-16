import {test as base,expect,Page} from "@playwright/test"
import { LoginPage } from './../ObjectRepository/LoginPage';

type Role = 'admin'|'superadmin'|'user'

const credentials:Record<Role,{username:string;password:string}> = {
    superadmin:{username:'superadmin@testmail.com',password:'superadmin123'},
    user:{username:'user@testmail.com',password:'user123'},
    admin:{username:'admmin@testmail.com',password:'admin123'}
}

type MyDynamicFixture ={
    role :Role,
    lp :LoginPage,
    LoggedInPage:Page
}


export const test = base.extend<MyDynamicFixture>({
 
    role :['user',{option:true}],

    lp : async ({page},use)=>{
        await use(new LoginPage(page));
},


   LoggedInPage : async ({lp,page,role},use)=>{
      const {username,password} =  credentials[role];
     await lp.gotoLoginPage();
     await lp.login(username,password);
     await use(page);

   }




})

export {expect};



