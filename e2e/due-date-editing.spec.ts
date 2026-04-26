import { test, expect } from "@playwright/test";

function seedTasks(page: any, tasks: any[]) {
  return page.evaluate((t: any[]) => {
    localStorage.setItem("taskLists", JSON.stringify([{
      id: 0, title: "Test List", taskSelected: true, tasks: t,
    }]));
  }, tasks);
}

test.describe("Due date editing in sidebar", () => {
  test("sets due date on a task via sidebar", async ({ page }) => {
    await page.goto("/");
    await seedTasks(page, [{
      id: 1, text: "Edit me", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
    }]);
    await page.reload();

    await page.getByText("Edit me").click({ button: "right" });
    await page.getByText("View").click();

    const dateInput = page.getByLabel("Edit due date");
    await expect(dateInput).toBeVisible();
    await dateInput.fill("2030-06-15T14:00");

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return null;
      const lists = JSON.parse(data);
      return lists.flatMap((l: any) => l.tasks).find((t: any) => t.text === "Edit me")?.dueDate;
    });
    expect(stored).toContain("2030-06-15");
  });

  test("clears due date via sidebar", async ({ page }) => {
    const future = new Date(Date.now() + 86400000).toISOString();
    await page.goto("/");
    await seedTasks(page, [{
      id: 2, text: "Clear me", completed: false,
      favorite: false, createdAt: new Date().toISOString(),
      dueDate: future,
    }]);
    await page.reload();

    await page.getByText("Clear me").click({ button: "right" });
    await page.getByText("View").click();

    await page.getByLabel("Clear due date").click();

    const stored = await page.evaluate(() => {
      const data = localStorage.getItem("taskLists");
      if (!data) return "missing";
      const lists = JSON.parse(data);
      return lists.flatMap((l: any) => l.tasks).find((t: any) => t.text === "Clear me")?.dueDate;
    });
    expect(stored).toBeNull();
  });
});
