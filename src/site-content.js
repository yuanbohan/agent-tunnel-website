export const siteContent = {
  brand: "移动编程",
  previewLabel: "内测",
  githubUrl: "https://github.com/yuanbohan/tunnel",
  hero: {
    eyebrow: "本地到手机",
    titleLines: ["本地运行智能体，", "手机电脑协同"],
    actions: [
      { label: "安装 tunnel", href: "#setup", variant: "primary" },
    ],
    screenshots: [
      {
        src: "/images/agent-tunnel-session-list.png",
        alt: "移动编程手机端会话列表，展示运行中的会话和最近输出预览。",
      },
      {
        src: "/images/agent-tunnel-session-detail.png",
        alt: "移动编程手机端会话详情，展示当前终端输出。",
      },
      {
        src: "/images/agent-tunnel-session-keyboard.png",
        alt: "移动编程手机端会话，打开屏幕键盘用于回复。",
      },
    ],
  },
  setup: {
    eyebrow: "开始使用",
    title: "安装，登录，运行",
    body: "",
    actionLabel: "复制命令",
    copiedLabel: "已复制",
    steps: [
      {
        number: "01",
        title: "安装",
        command:
          "curl -fsSL https://raw.githubusercontent.com/yuanbohan/tunnel/main/install.sh | sh",
      },
      {
        number: "02",
        title: "登录",
        command: "tunnel auth login",
      },
      {
        number: "03",
        title: "运行",
        command: "tunnel run claude",
      },
    ],
  },
  footer: {
    note: "本地运行，手机电脑协同",
    icpRecord: {
      label: "京ICP备2026024624号-1",
      href: "https://beian.miit.gov.cn/",
    },
    policeRecord: {
      label: "",
      href: "https://beian.mps.gov.cn/#/query/webSearch",
    },
  },
};
