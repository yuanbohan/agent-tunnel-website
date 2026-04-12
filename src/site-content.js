export const siteContent = {
  brand: "Agent Tunnel",
  previewLabel: "Private preview",
  hero: {
    title: "View and operate your agent from your phone.",
    kicker: "No web client. No extra surface.",
    screenshots: [
      {
        src: "/images/agent-tunnel-session-list.png",
        alt:
          "Mobile session list showing a live agent-tunnel session preview.",
        caption: "See live sessions as soon as tunnel comes online.",
      },
      {
        src: "/images/agent-tunnel-session-detail.png",
        alt:
          "Mobile session detail screen showing terminal output and input controls.",
        caption: "Open the live terminal view and continue the same session.",
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
        message: "Windows is not supported yet.",
      },
    ],
    verify: {
      command: "tunnel --version",
    },
  },
  flow: {
    eyebrow: "How it works",
    title: "A short path to a live session.",
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
        title: "Run tunnel and open the session",
        body:
          "Start tunnel with the CLI agent you already run, then open the matching session on your phone.",
      },
    ],
  },
  contact: {
    eyebrow: "Get the mobile app",
    title: "Invite-only. Ask for it.",
    body:
      "No app-store listing yet. Send a short note and I\u2019ll share the build.",
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
