import { expect, test } from "@playwright/test";

const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh";

test("shows the updated engineer-facing onboarding surface on desktop", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Run local agents. Check on phone.",
    }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: /github repository/i })).toHaveAttribute(
    "href",
    "https://github.com/yuanbohan/tunnel",
  );
  const heroVisual = page.getByTestId("hero-visual");
  await expect(heroVisual).toBeVisible();
  await expect(
    heroVisual.getByAltText(
      "Agent Tunnel mobile session list showing live sessions and recent output previews.",
    ),
  ).toBeVisible();
  await expect(heroVisual.getByTestId("hero-viewer-image")).toHaveCount(1);

  await heroVisual
    .getByRole("button", { name: "Show next screenshot" })
    .click();
  await expect(
    heroVisual.getByAltText(
      "Agent Tunnel mobile session detail showing the active terminal view.",
    ),
  ).toBeVisible();
  await expect(heroVisual.getByTestId("hero-viewer-image")).toHaveCount(1);

  await heroVisual
    .getByRole("button", { name: "Show previous screenshot" })
    .click();
  await expect(
    heroVisual.getByAltText(
      "Agent Tunnel mobile session list showing live sessions and recent output previews.",
    ),
  ).toBeVisible();

  const setupFlow = page.getByTestId("setup-flow");
  await expect(setupFlow).toBeVisible();
  await expect(setupFlow).toContainText(INSTALL_COMMAND);
  await expect(setupFlow).toContainText("tunnel auth login");
  await expect(setupFlow).toContainText("tunnel run claude");

  const contact = page.getByTestId("contact-card");
  await expect(contact).toBeVisible();
  await expect(
    contact.locator('a[href="mailto:yuanbo.han@gmail.com"]'),
  ).toBeVisible();
  await expect(
    contact.locator('a[href="https://github.com/yuanbohan"]'),
  ).toBeVisible();

  await expect(page.getByText("Sessions")).toHaveCount(0);
  await expect(page.getByText("Attach")).toHaveCount(0);
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

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Run local agents. Check on phone.",
    }),
  ).toBeVisible();
  await expect(page.getByTestId("hero-visual")).toBeVisible();
  const setupFlow = page.getByTestId("setup-flow");
  await expect(setupFlow).toBeVisible();
  await expect(setupFlow.getByText(INSTALL_COMMAND)).toBeVisible();
  await expect(setupFlow.getByText("tunnel auth login")).toBeVisible();
  await expect(setupFlow.getByText("tunnel run claude")).toBeVisible();
  await expect(page.getByTestId("contact-card")).toBeVisible();
});
