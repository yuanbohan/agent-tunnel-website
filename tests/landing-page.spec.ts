import { expect, test } from "@playwright/test";

const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh";

test("shows the v1 onboarding surface on desktop", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "View and operate your agent from your phone.",
    }),
  ).toBeVisible();

  await expect(page.getByTestId("install-command")).toBeVisible();
  await expect(page.getByTestId("install-command")).toContainText(
    INSTALL_COMMAND,
  );

  const macTab = page.getByRole("tab", { name: /mac\/linux/i });
  const winTab = page.getByRole("tab", { name: /windows/i });
  await expect(macTab).toHaveAttribute("aria-selected", "true");
  await expect(winTab).toHaveAttribute("aria-selected", "false");

  const copyButton = page.getByRole("button", { name: /copy install command/i });
  await expect(copyButton).toBeEnabled();
  await expect(copyButton).toHaveAttribute("data-tooltip", /copy install command/i);

  await winTab.click();
  await expect(winTab).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByText(/windows is not supported yet/i),
  ).toBeVisible();
  await expect(copyButton).toBeHidden();
  await macTab.click();
  await expect(copyButton).toBeVisible();

  const verify = page.getByTestId("install-verify");
  await expect(verify).toBeVisible();
  await expect(verify).toContainText("tunnel --version");

  await expect(page.getByTestId("how-it-works")).toBeVisible();

  const contact = page.getByTestId("contact-card");
  await expect(contact).toBeVisible();
  await expect(
    contact.locator('a[href="mailto:yuanbo.han@gmail.com"]'),
  ).toBeVisible();
  await expect(
    contact.locator('a[href="https://github.com/yuanbohan"]'),
  ).toBeVisible();

  await expect(page.getByText(/android/i)).toHaveCount(0);
  await expect(page.getByRole("button", { name: /android/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^ios$/i })).toHaveCount(0);
  await expect(page.getByTestId("video-placeholder")).toHaveCount(0);
  await expect(page.getByText(/URL pending/i)).toHaveCount(0);
  await expect(page.getByRole("navigation")).toHaveCount(0);
});

test("keeps the mobile view readable without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const hasOverflow = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    return document.documentElement.scrollWidth > width + 2;
  });

  expect(hasOverflow).toBe(false);
  await expect(page.getByTestId("install-command")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /copy install command/i }),
  ).toBeEnabled();
  await expect(page.getByTestId("install-verify")).toBeVisible();
  await expect(page.getByTestId("contact-card")).toBeVisible();
});
