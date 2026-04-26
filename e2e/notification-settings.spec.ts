import { test, expect } from "@playwright/test";

test.describe("Notification settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByPlaceholder("What's your next task?")).toBeVisible();
  });

  async function openNotificationSettings(page: import("@playwright/test").Page) {
    await page.locator("#toggle-sidebar ~ div").getByRole("button", { name: "Open dropdown" }).click();
    await page.getByLabel("Open Settings settings").click();
    await page.getByText("Notifications").click();
  }

  test("opens notification settings panel", async ({ page }) => {
    await openNotificationSettings(page);
    await expect(page.getByText("Notification Settings")).toBeVisible();
  });

  test("toggles due date notifications and saves", async ({ page }) => {
    await openNotificationSettings(page);

    await page.locator("label[for='isDueDateNotificationsOn']").last().click();

    await page.getByRole("button", { name: "Save" }).click();

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("appSettings");
      return data ? JSON.parse(data).isDueDateNotificationsOn : null;
    });
    expect(stored).toBe(false);
  });

  test("changes default alert timing", async ({ page }) => {
    await openNotificationSettings(page);

    await page.locator("#defaultAlertBefore").selectOption("30");
    await page.getByRole("button", { name: "Save" }).click();

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("appSettings");
      return data ? JSON.parse(data).defaultAlertBefore : null;
    });
    expect(stored).toBe(30);
  });
});
