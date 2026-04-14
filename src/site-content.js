export const siteContent = {
  brand: "Agent Tunnel",
  previewLabel: "Private preview",
  hero: {
    title: "Orchestrate your agents from your phone.",
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
        title: "Install the tunnel CLI on your computer",
      },
      {
        number: "02",
        title: "Request and install the mobile app on your phone",
      },
      {
        number: "03",
        title: "Create your account, sign in, and generate a token",
      },
      {
        number: "04",
        title: "Run tunnel in your terminal",
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
