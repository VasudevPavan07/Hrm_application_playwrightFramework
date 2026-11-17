import { readFileSync } from "node:fs";
import path from "node:path";
import { DashBoardPage } from "../ObjectRepository/DashBoardPage";
import { TerminationReasonsPage } from "../ObjectRepository/TerminationReasonsPage";
import { expect, test } from "../fixtures/Loginfixture";

const terminationReasonDataPath = path.resolve(
  __dirname,
  "../testData/TerminationReasonData.json",
);
const terminationReasonData: { reasonPrefix: string } = JSON.parse(
  readFileSync(terminationReasonDataPath, "utf-8"),
);

test("adds and deletes a termination reason", async ({ loggedInFixture }) => {
  const dashboardPage = new DashBoardPage(loggedInFixture);
  const terminationReasonsPage = new TerminationReasonsPage(loggedInFixture);
  const timestamp = new Date().toISOString().replace(/[^\d]/g, "");
  const reasonName = `${terminationReasonData.reasonPrefix} ${timestamp}`;
  let cleanupNeeded = false;

  try {
    await dashboardPage.gotoPim();
    await terminationReasonsPage.gotoTerminationReasons();
    await terminationReasonsPage.openAddForm();
    await terminationReasonsPage.enterReason(reasonName);
    cleanupNeeded = true;
    await terminationReasonsPage.saveReason();
    await expect(
      loggedInFixture.getByRole("row").filter({ hasText: reasonName }),
    ).toBeVisible();
  } finally {
    if (cleanupNeeded) {
      await terminationReasonsPage.deleteReason(reasonName);
    }
  }
});
