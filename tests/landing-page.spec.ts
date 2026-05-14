import { expect, test } from "@playwright/test";

const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh";

test("shows the updated engineer-facing onboarding surface on desktop", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("移动编程 | 本地运行智能体，手机电脑协同工作");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "本地运行智能体， 手机电脑协同",
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
      "移动编程手机端会话列表，展示运行中的会话和最近输出预览。",
    ),
  ).toBeVisible();
  await expect(heroVisual.getByTestId("hero-viewer-image")).toHaveCount(1);

  await heroVisual
    .getByRole("button", { name: "Show next screenshot" })
    .click();
  await expect(
    heroVisual.getByAltText(
      "移动编程手机端会话详情，展示当前终端输出。",
    ),
  ).toBeVisible();
  await expect(heroVisual.getByTestId("hero-viewer-image")).toHaveCount(1);

  await heroVisual
    .getByRole("button", { name: "Show previous screenshot" })
    .click();
  await expect(
    heroVisual.getByAltText(
      "移动编程手机端会话列表，展示运行中的会话和最近输出预览。",
    ),
  ).toBeVisible();

  const setupFlow = page.getByTestId("setup-flow");
  await expect(setupFlow).toBeVisible();
  await expect(setupFlow).toContainText(INSTALL_COMMAND);
  await expect(setupFlow).toContainText("tunnel auth login");
  await expect(setupFlow).toContainText("tunnel run claude");

  await expect(page.getByRole("link", { name: "申请体验" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "申请内测" })).toHaveCount(0);
  await expect(page.getByTestId("contact-card")).toHaveCount(0);
  await expect(page.locator("footer").getByText("移动编程")).toHaveCount(0);
  await expect(page.getByText("本地运行，手机电脑协同")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "京ICP备2026024624号-1" }),
  ).toHaveAttribute("href", "https://beian.miit.gov.cn/");

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
      name: "本地运行智能体， 手机电脑协同",
    }),
  ).toBeVisible();
  await expect(page.getByTestId("hero-visual")).toBeVisible();
  const setupFlow = page.getByTestId("setup-flow");
  await expect(setupFlow).toBeVisible();
  await expect(setupFlow.getByText(INSTALL_COMMAND)).toBeVisible();
  await expect(setupFlow.getByText("tunnel auth login")).toBeVisible();
  await expect(setupFlow.getByText("tunnel run claude")).toBeVisible();
  await expect(page.getByRole("link", { name: "申请体验" })).toHaveCount(0);
  await expect(page.getByTestId("contact-card")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "京ICP备2026024624号-1" }),
  ).toBeVisible();
});
