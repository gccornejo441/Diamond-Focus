import { test, expect } from "@playwright/test";

test.describe("Due date on task creation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByPlaceholder("What's your next task?")).toBeVisible();
  });

  test("creates a task without a due date", async ({ page }) => {
    const input = page.getByPlaceholder("What's your next task?");
    await input.fill("No deadline task");
    await input.press("Enter");
    await expect(page.getByText("No deadline task")).toBeVisible();
  });

  test("creates a task with a due date", async ({ page }) => {
    const input = page.getByPlaceholder("What's your next task?");
    await input.fill("Deadline task");
    await page.getByLabel("Toggle due date picker").click();
    const dateInput = page.getByLabel("Due date", { exact: true });
    await expect(dateInput).toBeVisible();
    await dateInput.fill("2030-12-25T10:00");
    await input.press("Enter");
    await expect(page.getByText("Deadline task")).toBeVisible();

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return null;
      const lists = JSON.parse(data);
      const task = lists.flatMap((l: any) => l.tasks).find((t: any) => t.text === "Deadline task");
      return task?.dueDate;
    });
    expect(stored).toBeTruthy();
    expect(stored).toContain("2030-12-25");
  });

  test("clears due date before submitting", async ({ page }) => {
    const input = page.getByPlaceholder("What's your next task?");
    await input.fill("Cleared date task");
    await page.getByLabel("Toggle due date picker").click();
    await page.getByLabel("Due date", { exact: true }).fill("2030-06-15T09:00");
    await page.getByLabel("Clear due date").click();
    await input.press("Enter");

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return "missing";
      const lists = JSON.parse(data);
      const task = lists.flatMap((l: any) => l.tasks).find((t: any) => t.text === "Cleared date task");
      return task?.dueDate;
    });
    expect(stored).toBeNull();
  });

  test("due date persists after page reload", async ({ page }) => {
    const input = page.getByPlaceholder("What's your next task?");
    await input.fill("Persistent task");
    await page.getByLabel("Toggle due date picker").click();
    await page.getByLabel("Due date", { exact: true }).fill("2030-03-01T08:00");
    await input.press("Enter");
    await page.reload();

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return null;
      const lists = JSON.parse(data);
      const task = lists.flatMap((l: any) => l.tasks).find((t: any) => t.text === "Persistent task");
      return task?.dueDate;
    });
    expect(stored).toContain("2030-03-01");
  });
});
