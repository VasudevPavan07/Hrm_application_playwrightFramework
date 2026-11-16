# Project rules: OrangeHRM Playwright framework

- Playwright + TypeScript, Page Object Model.
- Page objects live in /ObjectRepository. Tests live in /tests.
- Custom fixtures live in /fixtures. Test data lives in /testData.
- Helpers live in /Utils. Environment values live in /config.
- Before writing anything, read the existing files in these folders.
  Reuse existing page objects, fixtures and utilities. Never duplicate them.
- Follow the naming and code style of the existing files.
- Prefer getByRole, getByLabel, getByPlaceholder. Avoid XPath unless unavoidable.
- No waitForTimeout. Use web-first assertions.
- No hardcoded data in tests. Use /testData.
- Every test needs at least one meaningful assertion.
- Run only the test being written, never the full suite.
- Tests import `test` and `expect` from "../fixtures/Loginfixture".
- Use the `loggedInFixture` fixture (a logged-in Page) in every test. Never log in inside a test.
- Create page objects from `loggedInFixture`, following the pattern in the existing add-employee test.
- Locator rules below take priority over the style of existing code.
- Credentials come from environment variables, never hardcoded.
