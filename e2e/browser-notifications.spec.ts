import { test, expect } from "@playwright/test";

const DEFAULT_SETTINGS = {
  count: 1500, breakDuration: 300, isAlertOn: true,
  isAutoSwitchOn: false, theme: "default", bgImg: "",
  alarmName: "sciFiAlarm.mp3", isNewTaskOnTop: true, timerStatus: true,
  isDueDateNotificationsOn: true, defaultAlertBefore: 15,
  useBrowserNotifications: false,
};

test.describe("Browser notifications", () => {
  test("fires browser Notification when enabled and permitted", async ({ page }) => {
    await page.addInitScript(() => {
      const calls: string[] = [];
      (window as any).__notificationCalls = calls;
      (window as any).Notification = class {
        static permission = "granted";
        static requestPermission() { return Promise.resolve("granted" as NotificationPermission); }
        constructor(title: string, options?: { body?: string }) {
          calls.push(`${title}: ${options?.body}`);
        }
      };
    });

    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await page.evaluate(({ tasks, settings }: { tasks: any[]; settings: any }) => {
      localStorage.setItem("taskLists", JSON.stringify([{
        id: 0, title: "Test", taskSelected: true, tasks,
      }]));
      localStorage.setItem("appSettings", JSON.stringify(settings));
    }, {
      tasks: [{
        id: 1, text: "Browser notify task", completed: false,
        favorite: false, createdAt: new Date().toISOString(),
        dueDate: pastDue,
      }],
      settings: { ...DEFAULT_SETTINGS, useBrowserNotifications: true },
    });
    await page.reload();

    await expect(page.locator(".Toastify__toast")).toBeVisible({ timeout: 10000 });

    const calls = await page.evaluate(() => (window as any).__notificationCalls);
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0]).toContain("Browser notify task");
  });

  test("does not fire browser Notification when disabled", async ({ page }) => {
    await page.addInitScript(() => {
      const calls: string[] = [];
      (window as any).__notificationCalls = calls;
      (window as any).Notification = class {
        static permission = "granted";
        static requestPermission() { return Promise.resolve("granted" as NotificationPermission); }
        constructor(title: string, options?: { body?: string }) {
          calls.push(`${title}: ${options?.body}`);
        }
      };
    });

    const pastDue = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    await page.goto("/");
    await page.evaluate(({ tasks, settings }: { tasks: any[]; settings: any }) => {
      localStorage.setItem("taskLists", JSON.stringify([{
        id: 0, title: "Test", taskSelected: true, tasks,
      }]));
      localStorage.setItem("appSettings", JSON.stringify(settings));
    }, {
      tasks: [{
        id: 1, text: "No browser task", completed: false,
        favorite: false, createdAt: new Date().toISOString(),
        dueDate: pastDue,
      }],
      settings: { ...DEFAULT_SETTINGS, useBrowserNotifications: false },
    });
    await page.reload();

    await expect(page.locator(".Toastify__toast")).toBeVisible({ timeout: 10000 });

    const calls = await page.evaluate(() => (window as any).__notificationCalls);
    expect(calls.length).toBe(0);
  });
});
