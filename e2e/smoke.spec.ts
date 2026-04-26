import { test, expect } from "@playwright/test";

test("task input placeholder is visible on load", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByPlaceholder("What's your next task?")
  ).toBeVisible();
});
