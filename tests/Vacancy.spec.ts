import { readFileSync } from "node:fs";
import path from "node:path";
import { DashBoardPage } from "../ObjectRepository/DashBoardPage";
import { VacancyPage } from "../ObjectRepository/VacancyPage";
import { expect, test } from "../fixtures/Loginfixture";

const vacancyDataPath = path.resolve(__dirname, "../testData/VacancyData.json");
const vacancyData: {
  vacancyNamePrefix: string;
  jobTitle: string;
  description: string;
  hiringManagerQuery: string;
  hiringManager: string;
  numberOfPositions: string;
} = JSON.parse(readFileSync(vacancyDataPath, "utf-8"));

test("adds a vacancy", async ({ loggedInFixture }) => {
  const dashboardPage = new DashBoardPage(loggedInFixture);
  const vacancyPage = new VacancyPage(loggedInFixture);
  const vacancyName = `${vacancyData.vacancyNamePrefix} ${Date.now()}`;
  let cleanupNeeded = false;
  let testFailed = false;

  try {
    await dashboardPage.gotoRecruitment();
    await vacancyPage.gotoVacancies();
    await vacancyPage.openAddForm();
    await vacancyPage.enterVacancyName(vacancyName);
    await vacancyPage.selectJobTitle(vacancyData.jobTitle);
    await vacancyPage.enterDescription(vacancyData.description);
    await vacancyPage.selectHiringManager(
      vacancyData.hiringManagerQuery,
      vacancyData.hiringManager,
    );
    await vacancyPage.enterNumberOfPositions(vacancyData.numberOfPositions);
    cleanupNeeded = true;
    await vacancyPage.saveVacancy();
    await vacancyPage.gotoVacancies();
    await expect(vacancyPage.getVacancyRow(vacancyName)).toBeVisible();
  } catch (error) {
    testFailed = true;
    throw error;
  } finally {
    if (cleanupNeeded) {
      try {
        await vacancyPage.deleteVacancy(vacancyName);
      } catch (cleanupError) {
        if (!testFailed) {
          throw cleanupError;
        }
        console.error(
          `Failed to delete vacancy "${vacancyName}" after a test failure.`,
          cleanupError,
        );
      }
    }
  }
});
