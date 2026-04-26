import { test, expect } from "@playwright/test";

const DEFAULT_SETTINGS = {
  count: 1500, breakDuration: 300, isAlertOn: true,
  isAutoSwitchOn: false, theme: "default", bgImg: "",
  alarmName: "sciFiAlarm.mp3", isNewTaskOnTop: true, timerStatus: true,
  isDueDateNotificationsOn: true, defaultAlertBefore: 15,
  useBrowserNotifications: false,
};

function seedState(page: any, tasks: any[], settings = DEFAULT_SETTINGS) {
  return page.evaluate(({ tasks, settings }: { tasks: any[]; settings: any }) => {
    localStorage.setItem("taskLists", JSON.stringify([{
      id: 0, title: "Test", taskSelected: true, tasks,
    }]));
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, { tasks, settings });
}

test.describe("Due date notifications", () => {
  test("fires toast when task is past due on load", async ({ page }) => {
    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedState(page, [{
      id: 1, text: "Overdue task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: pastDue,
    }]);
    await page.reload();

    await expect(page.locator(".Toastify__toast")).toBeVisible({ timeout: 10000 });
    await expect(page.locator(".Toastify__toast")).toContainText("Overdue task");
  });

  test("does not fire toast when notifications are disabled", async ({ page }) => {
    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedState(page, [{
      id: 1, text: "Silent task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: pastDue,
    }], { ...DEFAULT_SETTINGS, isDueDateNotificationsOn: false });
    await page.reload();

    await page.waitForTimeout(3000);
    await expect(page.locator(".Toastify__toast")).toHaveCount(0);
  });

  test("does not fire toast for completed tasks", async ({ page }) => {
    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedState(page, [{
      id: 1, text: "Done task", completed: true,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: pastDue,
    }]);
    await page.reload();

    await page.waitForTimeout(3000);
    await expect(page.locator(".Toastify__toast")).toHaveCount(0);
  });
});
