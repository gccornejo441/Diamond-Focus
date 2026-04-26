import { test, expect } from "@playwright/test";

function seedTasks(page: any, tasks: any[]) {
  return page.evaluate((t: any[]) => {
    const lists = [{
      id: 0, title: "Test List", taskSelected: true, tasks: t,
    }];
    localStorage.setItem("taskLists", JSON.stringify(lists));
  }, tasks);
}

test.describe("Due date display", () => {
  test("shows no indicator for tasks without due date", async ({ page }) => {
    await page.goto("/");
    await seedTasks(page, [{
      id: 1, text: "No date task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
    }]);
    await page.reload();
    await expect(page.getByText("No date task")).toBeVisible();
    await expect(page.getByTestId("due-date-indicator")).toHaveCount(0);
  });

  test("shows due label for future tasks", async ({ page }) => {
    const future = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedTasks(page, [{
      id: 2, text: "Future task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: future,
    }]);
    await page.reload();
    const indicator = page.getByTestId("due-date-indicator");
    await expect(indicator).toBeVisible();
    await expect(indicator).toContainText("due");
  });

  test("shows overdue label for past-due tasks", async ({ page }) => {
    const past = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedTasks(page, [{
      id: 3, text: "Overdue task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: past,
    }]);
    await page.reload();
    const indicator = page.getByTestId("due-date-indicator");
    await expect(indicator).toBeVisible();
    await expect(indicator).toContainText("overdue");
  });

  test("shows soon styling for tasks due within 1 hour", async ({ page }) => {
    const soon = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    await page.goto("/");
    await seedTasks(page, [{
      id: 4, text: "Soon task", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: soon,
    }]);
    await page.reload();
    const indicator = page.getByTestId("due-date-indicator");
    await expect(indicator).toBeVisible();
    await expect(indicator).toContainText("due");
  });
});
