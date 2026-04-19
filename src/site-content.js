export const siteContent = {
  brand: "Agent Tunnel",
  previewLabel: "Preview",
  githubUrl: "https://github.com/yuanbohan/tunnel",
  hero: {
    eyebrow: "Local to phone",
    titleLines: ["Run local agents.", "Check on phone."],
    actions: [
      { label: "Install tunnel", href: "#setup", variant: "primary" },
      { label: "Request access", href: "#access", variant: "secondary" },
    ],
    screenshots: [
      {
        src: "/images/agent-tunnel-session-list.png",
        alt: "Agent Tunnel mobile session list showing live sessions and recent output previews.",
      },
      {
        src: "/images/agent-tunnel-session-detail.png",
        alt: "Agent Tunnel mobile session detail showing the active terminal view.",
      },
      {
        src: "/images/agent-tunnel-session-keyboard.png",
        alt: "Agent Tunnel mobile session with the on-screen keyboard open for replying.",
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
