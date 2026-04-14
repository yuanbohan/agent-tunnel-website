export const siteContent = {
  brand: "Agent Tunnel",
  previewLabel: "Private preview",
  hero: {
    titleLines: [
      "Orchestrate",
      "your agents",
      "from your phone.",
    ],
    screenshots: [
      {
        src: "/images/agent-tunnel-session-list.png",
        alt: "Mobile session list showing a live agent-tunnel session preview.",
      },
      {
        src: "/images/agent-tunnel-session-detail.png",
        alt: "Mobile session detail screen showing terminal output and input controls.",
      },
    ],
  },
  install: {
    eyebrow: "Install",
    actionLabel: "Copy install command",
    copiedLabel: "Copied!",
    platforms: [
      {
        id: "unix",
        label: "Mac/Linux",
        supported: true,
        command:
          "curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh",
      },
      {
        id: "windows",
        label: "Windows",
        supported: false,
        message: "not supported yet.",
      },
    ],
  },
  flow: {
    eyebrow: "How it works",
    title: "",
    steps: [
      {
        number: "01",
        title: "Install the app and tunnel",
        body:
          "Run the install command for tunnel and ask for the mobile app.",
      },
      {
        number: "02",
        title: "Create your account and sign in",
        body:
          "Use your invite code once and keep the same account for the app.",
      },
      {
        number: "03",
        title: "Create an agent token",
        body: "Generate a token in the app and keep it for the terminal.",
      },
      {
        number: "04",
        title: "",
        body: "",
        command: `export TUNNEL_AUTH_TOKEN=<your token>
tunnel claude`,
      },
    ],
  },
  contact: {
    eyebrow: "Get the mobile app",
    title: "Invite-only. Ask for it.",
    body: "",
    card: {
      title: "Request access",
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
    note: "Early preview. Shared with a small group of friends.",
  },
};
