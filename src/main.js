import "./styles.css";
import { siteContent } from "./site-content";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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

const GITHUB_MARK_SVG = `
  <svg class="github-link__icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.69 0 8.24c0 3.64 2.29 6.72 5.47 7.81.4.08.55-.18.55-.39 0-.19-.01-.82-.01-1.49-2.01.38-2.53-.5-2.69-.95-.09-.23-.48-.95-.82-1.14-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.84.72 1.26 1.87.91 2.33.69.07-.53.28-.91.51-1.12-1.78-.21-3.64-.91-3.64-4.04 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.29.82 2.19 0 3.14-1.87 3.83-3.65 4.04.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.47.55.39A8.26 8.26 0 0 0 16 8.24C16 3.69 12.42 0 8 0Z"></path>
  </svg>
`;

const renderCopyButton = (value, label) => `
  <button
    type="button"
    class="copy-button"
    data-copy-value="${escapeHtml(value)}"
    data-tooltip="${escapeHtml(label)}"
    aria-label="${escapeHtml(label)}"
  >
    ${COPY_ICON_SVG}
    ${CHECK_ICON_SVG}
  </button>
`;

const heroTitleMarkup = siteContent.hero.titleLines
  .map((line) => `<span class="hero__title-line">${escapeHtml(line)}</span>`)
  .join("");

const navMarkup = siteContent.nav
  .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
  .join("");

const heroTerminalMarkup = siteContent.hero.terminal.lines
  .map(
    (line) => `
      <li class="terminal-card__line">
        <code class="terminal-card__command">$ ${escapeHtml(line.command)}</code>
        <p class="terminal-card__note">${escapeHtml(line.note)}</p>
      </li>
    `,
  )
  .join("");

const heroScreenshotMarkup = siteContent.hero.screenshots
  .map(
    (shot, index) => `
      <figure class="phone-shot phone-shot--hero phone-shot--${index + 1}">
        <span class="phone-shot__label">${escapeHtml(shot.label)}</span>
        <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" />
      </figure>
    `,
  )
  .join("");

const setupStepsMarkup = siteContent.setup.steps
  .map(
    (step) => `
      <article class="step-row">
        <div class="step-row__head">
          <p class="step-row__number">${escapeHtml(step.number)}</p>
          <div class="step-row__copy">
            <h3>${escapeHtml(step.title)}</h3>
            ${step.body ? `<p>${escapeHtml(step.body)}</p>` : ""}
          </div>
        </div>
        <div class="command-shell">
          <pre><code>${escapeHtml(step.command)}</code></pre>
          ${renderCopyButton(step.command, siteContent.setup.actionLabel)}
        </div>
      </article>
    `,
  )
  .join("");

const contactLinksMarkup = siteContent.access.card.links
  .map(
    (link) => `
      <a class="contact-link" href="${escapeHtml(link.href)}">
        <span class="contact-link__detail">${escapeHtml(link.detail)}</span>
        <span class="contact-link__label">${escapeHtml(link.label)}</span>
      </a>
    `,
  )
  .join("");

document.querySelector("#app").innerHTML = `
  <div class="site-shell">
    <header class="masthead">
      <div class="container masthead__inner">
        <a class="brandlock" href="#top" aria-label="${escapeHtml(siteContent.brand)} home">
          <span class="brandlock__pill">${escapeHtml(siteContent.previewLabel)}</span>
          <span class="brandlock__name">${escapeHtml(siteContent.brand)}</span>
        </a>
        <div class="masthead__actions">
          <nav class="masthead__nav" aria-label="Primary">
            ${navMarkup}
          </nav>
          <a
            class="github-link"
            href="${escapeHtml(siteContent.githubUrl)}"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
          >
            ${GITHUB_MARK_SVG}
          </a>
        </div>
      </div>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero__inner">
          <div class="hero__copy">
            <p class="eyebrow">${escapeHtml(siteContent.hero.eyebrow)}</p>
            <h1 id="hero-title">${heroTitleMarkup}</h1>
            <div class="hero__actions">
              ${siteContent.hero.actions
                .map(
                  (action) => `
                    <a class="button button--${escapeHtml(action.variant)}" href="${escapeHtml(action.href)}">
                      ${escapeHtml(action.label)}
                    </a>
                  `,
                )
                .join("")}
            </div>
          </div>

          <div class="hero__visual" data-testid="hero-visual">
            <article class="terminal-card">
              <div class="terminal-card__topline">
                <p>${escapeHtml(siteContent.hero.terminal.eyebrow)}</p>
              </div>
              <ol class="terminal-card__lines">
                ${heroTerminalMarkup}
              </ol>
            </article>

            <div class="hero__phones">
              ${heroScreenshotMarkup}
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="setup" aria-labelledby="setup-title">
        <div class="container section__stack">
          <div class="section__intro section__intro--split">
            <div>
              <p class="eyebrow">${escapeHtml(siteContent.setup.eyebrow)}</p>
              <h2 id="setup-title">${escapeHtml(siteContent.setup.title)}</h2>
            </div>
            ${siteContent.setup.body ? `<p class="section__lede">${escapeHtml(siteContent.setup.body)}</p>` : ""}
          </div>

          <div class="steps-list" data-testid="setup-flow">
            ${setupStepsMarkup}
          </div>
        </div>
      </section>

      <section class="section section--access" id="access" aria-labelledby="access-title">
        <div class="container access-grid">
          <div class="section__intro">
            <p class="eyebrow">${escapeHtml(siteContent.access.eyebrow)}</p>
            <h2 id="access-title">${escapeHtml(siteContent.access.title)}</h2>
            <p class="section__lede">${escapeHtml(siteContent.access.body)}</p>
          </div>

          <aside class="contact-card" data-testid="contact-card" aria-label="${escapeHtml(siteContent.access.card.title)}">
            <header class="contact-card__header">
              <span class="contact-card__dot" aria-hidden="true"></span>
              <h3>${escapeHtml(siteContent.access.card.title)}</h3>
            </header>
            ${siteContent.access.card.note ? `<p class="contact-card__note">${escapeHtml(siteContent.access.card.note)}</p>` : ""}
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

const defaultLabel = siteContent.setup.actionLabel;
const copiedLabel = siteContent.setup.copiedLabel;

document.querySelectorAll("[data-copy-value]").forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) return;
  let resetTimer;

  button.addEventListener("click", async () => {
    const value = button.dataset.copyValue ?? "";
    try {
      await navigator.clipboard.writeText(value);
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
