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

test.describe("Recurring alerts", () => {
  test("one-shot reminder does not re-fire after first notification", async ({ page }) => {
    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedState(page, [{
      id: 1, text: "One shot task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: pastDue,
      reminder: {
        enabled: true, alertBefore: 15,
        recurrence: "none", lastNotifiedAt: null,
      },
    }]);
    await page.reload();

    await expect(page.locator(".Toastify__toast")).toBeVisible({ timeout: 10000 });
    await expect(page.locator(".Toastify__toast")).toContainText("One shot task");

    // Wait for toast to auto-close
    await expect(page.locator(".Toastify__toast")).toHaveCount(0, { timeout: 10000 });

    // Verify lastNotifiedAt was set (proving it won't fire again with recurrence: "none")
    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return null;
      const lists = JSON.parse(data);
      const task = lists.flatMap((l: any) => l.tasks).find((t: any) => t.id === 1);
      return task?.reminder;
    });
    expect(stored?.lastNotifiedAt).toBeTruthy();
    expect(stored?.recurrence).toBe("none");
  });

  test("daily recurring alert sets lastNotifiedAt for future re-fire", async ({ page }) => {
    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedState(page, [{
      id: 1, text: "Daily task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: pastDue,
      reminder: {
        enabled: true, alertBefore: 15,
        recurrence: "daily", lastNotifiedAt: null,
      },
    }]);
    await page.reload();

    await expect(page.locator(".Toastify__toast")).toBeVisible({ timeout: 10000 });
    await expect(page.locator(".Toastify__toast")).toContainText("Daily task");

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return null;
      const lists = JSON.parse(data);
      const task = lists.flatMap((l: any) => l.tasks).find((t: any) => t.id === 1);
      return task?.reminder;
    });
    expect(stored?.lastNotifiedAt).toBeTruthy();
    expect(stored?.recurrence).toBe("daily");
  });

  test("already-notified daily task does not re-fire within 24 hours", async ({ page }) => {
    const pastDue = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recentlyNotified = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedState(page, [{
      id: 1, text: "Already notified", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: pastDue,
      reminder: {
        enabled: true, alertBefore: 15,
        recurrence: "daily", lastNotifiedAt: recentlyNotified,
      },
    }]);
    await page.reload();

    await page.waitForTimeout(3000);
    await expect(page.locator(".Toastify__toast")).toHaveCount(0);
  });
});
