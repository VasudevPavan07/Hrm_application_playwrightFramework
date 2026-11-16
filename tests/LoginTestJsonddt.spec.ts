import {test , expect} from "@playwright/test"
import fs from "fs"
import { LoginPage } from "../ObjectRepository/LoginPage";

const jsonpath = "testData/LoginDatauser.json"
const loginData:any = JSON.parse(fs.readFileSync(jsonpath,"utf-8"));

test.describe("json login test" ,async ()=>{ 

    for(const {username,password,valid} of loginData){

    test(` login test for ${username}` , async ({page})=>{
        const lp = new LoginPage(page);
          console.log(password + " "+ username)
    //   await  lp.gotoLoginPage();
    //    await  lp.login(username,password)
        // if(valid){
        //   await  lp.verifySuccesFullLogin();
        // }
        // else{
        //     expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        // }

    })}

});


