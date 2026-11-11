import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'bywave博客',
  description: '网络可观测性与机场节点权威评测站 | 2026 深度实测与全网选型指南',
  lang: 'zh-CN',
  cleanUrls: true,
  srcExclude: ['**/README.md', '**/TODO.md'],
  sitemap: {
    hostname: 'https://bywave.world'
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'bywave博客' }],
    ['meta', { name: 'keywords', content: '机场推荐, 机场评测, 光速云, 暮光加速, 飞猫云, IEPL专线, IPLC专线, 科学上网, 翻墙机场, Clash教程, Shadowrocket, ChatGPT解锁, 跨境电商网络, 节点测速' }],
    ['meta', { property: 'og:site_name', content: 'bywave博客' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://bywave.world/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://bywave.world/logo.png' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'bywave博客',
      'url': 'https://bywave.world/',
      'description': '专业网络可观测性与机场节点权威评测站，覆盖42家机场深度实测、IEPL/IPLC专线拓扑、客户端配置指南与AI流媒体解锁。',
      'publisher': {
        '@type': 'Organization',
        'name': 'bywave博客',
        'url': 'https://bywave.world/'
      }
    })]
  ],
  themeConfig: {
    siteTitle: 'bywave博客',
    logo: '/logo.png',
    nav: [
      { text: '机场评测库', link: '/airports/' },
      { text: '专线与拓扑', link: '/lines/' },
      { text: '客户端指南', link: '/clients/' },
      { text: '流媒体与AI', link: '/unlock/' },
      { text: '协议底层', link: '/protocols/' },
      { text: '场景与避坑', link: '/guides/' }
    ],
    sidebar: {
      '/airports/': [
        {
          text: '机场评测与矩阵导航',
          items: [
            { text: '📊 42 家机场评测总览库', link: '/airports/' },
            { text: '💎 旗舰高奢与企业专线评测', link: '/airports/premium/' },
            { text: '💰 平价高性价比与轻量备用', link: '/airports/budget/' }
          ]
        },
        {
          text: '头部主推与核心机场实测',
          items: [
            { text: '★ NO.1 光速云 (主推首选·IEPL双专线)', link: '/airports/guangsu' },
            { text: '2. 暮光加速 (BGP智能调度)', link: '/airports/muguang' },
            { text: '3. 飞猫云 (IEPL专线集群)', link: '/airports/feimao' },
            { text: '4. 微风网络 (大带宽大流量)', link: '/airports/weifeng' },
            { text: '5. 大佬云 (老牌稳定性保障)', link: '/airports/dalaoyun' },
            { text: '6. 星岛梦 (原生IP纯净节点)', link: '/airports/xingdaomeng' },
            { text: '7. 二猫云 (高性价比中转)', link: '/airports/ermao' },
            { text: '8. 无忧链接 (智能低延迟选线)', link: '/airports/wuyou' },
            { text: '9. 唯兔云 (轻量平价高防)', link: '/airports/weitu' },
            { text: '10. Firefly (多端自研全生态)', link: '/airports/firefly' }
          ]
        },
        {
          text: '全量 42 家机场深度评测目录',
          collapsed: true,
          items: [
            { text: 'SOGO云', link: '/airports/sogo' },
            { text: 'U1S1', link: '/airports/u1s1' },
            { text: '一翻云', link: '/airports/yifan' },
            { text: '光年梯', link: '/airports/guangnian' },
            { text: '全球云', link: '/airports/quanqiu' },
            { text: '可信云', link: '/airports/kexin' },
            { text: '宇宙云', link: '/airports/yuzhou' },
            { text: '极连云', link: '/airports/jilian' },
            { text: '灵猫网络', link: '/airports/lingmao' },
            { text: '速界', link: '/airports/sujie' },
            { text: '梯子云', link: '/airports/tiziyun' },
            { text: '隐形人', link: '/airports/yinxingren' },
            { text: '闪电鼠', link: '/airports/shandianshu' },
            { text: '山月云', link: '/airports/shanyue' },
            { text: '神行云', link: '/airports/shenxing' },
            { text: '云界线', link: '/airports/yunjiexian' },
            { text: '榴莲云', link: '/airports/liulianyun' },
            { text: '环球梯', link: '/airports/huanqiuti' },
            { text: 'WgetCloud', link: '/airports/wgetcloud' },
            { text: '白月光', link: '/airports/baiyueguang' },
            { text: '飞鸟云', link: '/airports/flyingbird' },
            { text: 'CyberGuard', link: '/airports/cyberguard' },
            { text: '灵动云', link: '/airports/lingdongyun' },
            { text: '肥猫云', link: '/airports/fatcat' },
            { text: '山水云', link: '/airports/shanshuiyun' },
            { text: '青云梯', link: '/airports/qingyunti' },
            { text: 'TNT Cloud', link: '/airports/tntcloud' },
            { text: '龙猫云', link: '/airports/longmaoyun' },
            { text: '浪网', link: '/airports/langwang' },
            { text: 'EdgeNova', link: '/airports/edgenova' },
            { text: '萤火虫', link: '/airports/yinghuochong' },
            { text: 'sslar', link: '/airports/sslar' }
          ]
        }
      ],
      '/lines/': [
        {
          text: '专线网络与底层拓扑',
          items: [
            { text: '🌐 专线网络知识图谱支柱', link: '/lines/' },
            { text: '⚡ 物理内网跨境专线技术 (IEPL/IPLC)', link: '/lines/dedicated/' },
            { text: '🔀 骨干中转调度与公网直连 (BGP/Anycast)', link: '/lines/transit/' }
          ]
        }
      ],
      '/clients/': [
        {
          text: '跨平台客户端配置指南',
          items: [
            { text: '📱 客户端生态全景支柱', link: '/clients/' },
            { text: '💻 桌面端调优 (Clash/v2rayN/Surge)', link: '/clients/desktop/' },
            { text: '📱 移动端实操 (小火箭/Stash/FlClash)', link: '/clients/mobile/' }
          ]
        }
      ],
      '/unlock/': [
        {
          text: '流媒体与 AI 原生解锁',
          items: [
            { text: '🎬 流媒体与AI解锁知识支柱', link: '/unlock/' },
            { text: '🍿 海外流媒体全区解锁矩阵 (Netflix/Disney+)', link: '/unlock/streaming/' },
            { text: '🤖 大模型原生节点 (ChatGPT/Claude/Gemini)', link: '/unlock/ai/' }
          ]
        }
      ],
      '/protocols/': [
        {
          text: '科学上网协议与底层安全',
          items: [
            { text: '🔒 协议底层与密码学支柱', link: '/protocols/' },
            { text: '🚀 新一代现代代理协议 (VLESS/Hysteria2)', link: '/protocols/modern/' },
            { text: '🛡️ 经典加密协议与反封锁 (Trojan/SS/VMess)', link: '/protocols/classic/' }
          ]
        }
      ],
      '/guides/': [
        {
          text: '场景选型与避坑保障',
          items: [
            { text: '🧭 场景选型决策知识支柱', link: '/guides/' },
            { text: '💼 专业与出海业务方案 (电商/直播/游戏)', link: '/guides/business/' },
            { text: '🚨 机场消费避坑与防跑路 (维权/测速辨真)', link: '/guides/security/' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档、机场与教程...',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    footer: {
      message: 'bywave博客 (bywave.world) | 网络可观测性实验室客观实测与选型指南',
      copyright: 'Copyright © 2026 bywave博客. All Rights Reserved.'
    }
  }
})
