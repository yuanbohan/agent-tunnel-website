import "./styles.css";
import { siteContent } from "./site-content";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const screenshotMarkup = siteContent.hero.screenshots
  .map(
    (shot, index) => `
      <figure class="device-frame device-frame--${index + 1}">
        <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" />
        <figcaption>${escapeHtml(shot.caption)}</figcaption>
      </figure>
    `,
  )
  .join("");

const flowMarkup = siteContent.flow.steps
  .map(
    (step) => `
      <li class="step-list__item">
        <p class="step-list__number">${escapeHtml(step.number)}</p>
        <div>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.body)}</p>
        </div>
      </li>
    `,
  )
  .join("");

const contactLinksMarkup = siteContent.contact.card.links
  .map(
    (link) => `
      <a class="contact-link" href="${escapeHtml(link.href)}">
        <span class="contact-link__detail">${escapeHtml(link.detail)}</span>
        <span class="contact-link__label">${escapeHtml(link.label)}</span>
      </a>
    `,
  )
  .join("");

const COPY_ICON_SVG = `
  <svg class="copy-button__icon copy-button__icon--copy" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
  </svg>
`;

const CHECK_ICON_SVG = `
  <svg class="copy-button__icon copy-button__icon--check" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
  </svg>
`;

document.querySelector("#app").innerHTML = `
  <div class="site-shell">
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__inner">
        <header class="topbar">
          <div class="brandlock">
            <span class="brandlock__pill">${escapeHtml(siteContent.previewLabel)}</span>
            <span class="brandlock__name">${escapeHtml(siteContent.brand)}</span>
          </div>
        </header>

        <div class="hero__stage">
          <div class="hero__copy">
            <h1 id="hero-title">${escapeHtml(siteContent.hero.title)}</h1>
            <p class="hero__kicker">${escapeHtml(siteContent.hero.kicker)}</p>
          </div>

          <div class="hero__visuals" aria-hidden="true">
            ${screenshotMarkup}
          </div>
        </div>
      </div>
    </section>

    <main>
      <section class="install-strip" aria-labelledby="install-title">
        <div class="container install-strip__inner" data-testid="install-command">
          <p class="install-strip__eyebrow eyebrow eyebrow--dark" id="install-title">
            ${escapeHtml(siteContent.install.eyebrow)}
          </p>

          <div class="install-block">
            <div class="install-tabs" role="tablist" aria-label="Install platform">
              ${siteContent.install.platforms
                .map(
                  (platform, index) => `
                    <button
                      type="button"
                      role="tab"
                      class="install-tab${index === 0 ? " is-active" : ""}"
                      id="tab-${escapeHtml(platform.id)}"
                      aria-controls="panel-${escapeHtml(platform.id)}"
                      aria-selected="${index === 0 ? "true" : "false"}"
                      tabindex="${index === 0 ? "0" : "-1"}"
                      data-install-tab="${escapeHtml(platform.id)}"
                    >${escapeHtml(platform.label)}</button>
                  `,
                )
                .join("")}
            </div>

            ${siteContent.install.platforms
              .map(
                (platform, index) => `
                  <div
                    class="install-panel${index === 0 ? " is-active" : ""}"
                    role="tabpanel"
                    id="panel-${escapeHtml(platform.id)}"
                    aria-labelledby="tab-${escapeHtml(platform.id)}"
                    data-install-panel="${escapeHtml(platform.id)}"
                    ${index === 0 ? "" : "hidden"}
                  >
                    ${
                      platform.supported
                        ? `
                          <div class="install-command">
                            <pre>${escapeHtml(platform.command)}</pre>
                            <button
                              type="button"
                              class="copy-button"
                              data-copy-install
                              data-command="${escapeHtml(platform.command)}"
                              data-tooltip="${escapeHtml(siteContent.install.actionLabel)}"
                              aria-label="${escapeHtml(siteContent.install.actionLabel)}"
                            >
                              ${COPY_ICON_SVG}
                              ${CHECK_ICON_SVG}
                            </button>
                          </div>
                        `
                        : `
                          <p class="install-unsupported">
                            ${escapeHtml(platform.message)}
                          </p>
                        `
                    }
                  </div>
                `,
              )
              .join("")}

            <p class="install-verify" data-testid="install-verify">
              <code>${escapeHtml(siteContent.install.verify.command)}</code>
            </p>
          </div>
        </div>
      </section>

      <section class="section section--dark" id="how-it-works" aria-labelledby="flow-title">
        <div class="container section__grid">
          <div class="section__intro">
            <p class="eyebrow">${escapeHtml(siteContent.flow.eyebrow)}</p>
            <h2 id="flow-title">${escapeHtml(siteContent.flow.title)}</h2>
          </div>

          <div class="flow-layout" data-testid="how-it-works">
            <ol class="step-list">
              ${flowMarkup}
            </ol>
          </div>
        </div>
      </section>

      <section class="section section--light section--contact" id="contact" aria-labelledby="contact-title">
        <div class="container contact-grid" data-testid="contact-card">
          <div class="section__intro contact-intro">
            <p class="eyebrow eyebrow--dark">${escapeHtml(siteContent.contact.eyebrow)}</p>
            <h2 id="contact-title">${escapeHtml(siteContent.contact.title)}</h2>
            <p>${escapeHtml(siteContent.contact.body)}</p>
          </div>

          <aside class="contact-card" aria-label="${escapeHtml(siteContent.contact.card.title)}">
            <header class="contact-card__header">
              <span class="contact-card__dot" aria-hidden="true"></span>
              <h3 class="contact-card__title">${escapeHtml(siteContent.contact.card.title)}</h3>
            </header>
            <div class="contact-card__links">
              ${contactLinksMarkup}
            </div>
          </aside>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <span>${escapeHtml(siteContent.brand)}</span>
        <p>${escapeHtml(siteContent.footer.note)}</p>
      </div>
    </footer>
  </div>
`;

const defaultLabel = siteContent.install.actionLabel;
const copiedLabel = siteContent.install.copiedLabel;

document.querySelectorAll("[data-copy-install]").forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) return;
  let resetTimer;

  button.addEventListener("click", async () => {
    const command = button.dataset.command ?? "";
    try {
      await navigator.clipboard.writeText(command);
      button.classList.add("is-copied");
      button.dataset.tooltip = copiedLabel;
      button.setAttribute("aria-label", copiedLabel);
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.dataset.tooltip = defaultLabel;
        button.setAttribute("aria-label", defaultLabel);
      }, 1600);
    } catch {
      button.dataset.tooltip = defaultLabel;
    }
  });
});

const tabs = Array.from(document.querySelectorAll("[data-install-tab]"));
const panels = Array.from(document.querySelectorAll("[data-install-panel]"));

const activateTab = (targetId) => {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.installTab === targetId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });
  panels.forEach((panel) => {
    const isActive = panel.dataset.installPanel === targetId;
    panel.classList.toggle("is-active", isActive);
    if (isActive) {
      panel.removeAttribute("hidden");
    } else {
      panel.setAttribute("hidden", "");
    }
  });
};

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.installTab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    activateTab(next.dataset.installTab);
    next.focus();
  });
});
