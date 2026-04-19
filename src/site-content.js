export const siteContent = {
  brand: "Agent Tunnel",
  previewLabel: "Preview",
  nav: [
    { label: "Setup", href: "#setup" },
    { label: "Access", href: "#access" },
  ],
  githubUrl: "https://github.com/yuanbohan/tunnel",
  hero: {
    eyebrow: "Terminal to phone",
    titleLines: ["Run local agents.", "Check them on phone."],
    actions: [
      { label: "Install tunnel", href: "#setup", variant: "primary" },
      { label: "Request access", href: "#access", variant: "secondary" },
    ],
    terminal: {
      eyebrow: "Core flow",
      lines: [
        {
          command: "tunnel auth login",
          note: "Save local auth on the machine.",
        },
        {
          command: "tunnel run claude",
          note: "Wrap the launcher you already use.",
        },
      ],
    },
    screenshots: [
      {
        src: "/images/agent-tunnel-session-list.png",
        alt: "Agent Tunnel mobile session list with recent output previews.",
        label: "Sessions",
      },
      {
        src: "/images/agent-tunnel-session-detail.png",
        alt: "Agent Tunnel mobile session detail with terminal output and input controls.",
        label: "Attach",
      },
    ],
  },
  setup: {
    eyebrow: "Setup",
    title: "Install. Auth. Run.",
    body: "",
    actionLabel: "Copy command",
    copiedLabel: "Copied",
    steps: [
      {
        number: "01",
        title: "Install",
        command:
          "curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh",
      },
      {
        number: "02",
        title: "Auth",
        command: "tunnel auth login",
      },
      {
        number: "03",
        title: "Run",
        command: "tunnel run claude",
      },
    ],
  },
  access: {
    eyebrow: "Access",
    title: "Request access.",
    body: "Android preview build by request.",
    card: {
      title: "Contact",
      links: [
        {
          label: "yuanbo.han@gmail.com",
          detail: "Email",
          href: "mailto:yuanbo.han@gmail.com",
        },
        {
          label: "@yuanbohan",
          detail: "GitHub",
          href: "https://github.com/yuanbohan",
        },
      ],
    },
  },
  footer: {
    note: "Run local. Check from phone.",
  },
};
