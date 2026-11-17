import { readFileSync } from "node:fs";
import path from "node:path";
import { BuzzPage } from "../ObjectRepository/BuzzPage";
import { DashBoardPage } from "../ObjectRepository/DashBoardPage";
import { expect, test } from "../fixtures/Loginfixture";

const buzzPostDataPath = path.resolve(
  __dirname,
  "../testData/BuzzPostData.json",
);
const buzzPostData: { postPrefix: string } = JSON.parse(
  readFileSync(buzzPostDataPath, "utf-8"),
);

test("creates a Buzz post and deletes it", async ({ loggedInFixture }) => {
  const dashboardPage = new DashBoardPage(loggedInFixture);
  const buzzPage = new BuzzPage(loggedInFixture);
  const postText = `${buzzPostData.postPrefix} ${Date.now()}`;
  let cleanupNeeded = false;

  try {
    await dashboardPage.gotoBuzz();
    cleanupNeeded = true;
    await buzzPage.createPost(postText);
    await expect(buzzPage.getPostBody(postText)).toBeVisible();
    await expect(buzzPage.postBodies.first()).toHaveText(postText);
  } finally {
    if (cleanupNeeded) {
      await buzzPage.deletePost(postText);
    }
  }
});
