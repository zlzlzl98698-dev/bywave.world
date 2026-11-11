<div align="center">

<img src="public/logo.png" alt="bywave博客官方标识" width="120" height="120" style="border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />

# bywave.world
### 网络可观测性与机场节点权威评测站 · 全球网络选型指南

[![VitePress](https://img.shields.io/badge/VitePress-v1.6.4-646CFF?style=flat-square&logo=vitepress)](https://vitepress.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Pagefind Search](https://img.shields.io/badge/Pagefind-v1.6.0-FF5722?style=flat-square)](https://pagefind.app/)
[![SEO / GEO Optimized](https://img.shields.io/badge/SEO%20%2F%20GEO-100%25%20Optimized-00C853?style=flat-square&logo=google)](https://bywave.world/)
[![Pages Count](https://img.shields.io/badge/Static%20Pages-1%2C760%2B-blue?style=flat-square)](https://bywave.world/sitemap.xml)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

[🌐 访问在线官网](https://bywave.world/) · [📖 评测方法论](https://bywave.world/methodology) · [🔬 关于实验室](https://bywave.world/about) · [🗺️ 网站地图](https://bywave.world/sitemap.xml)

</div>

---

## 📌 项目概述 (Overview)

**bywave.world** 是一个基于 **VitePress 1.6.4 SSG** 架构构建的高性能、现代化网络技术博客与机场节点权威评测矩阵。

项目汇聚了 **42 家翻墙机场品牌** 的真实评测数据、网络拓扑观测经验、客户端配置进阶以及网络风控知识。全站所有页面均采用静态预渲染（SSG）生成，具备毫秒级首屏加载性能、零客户端 JS 依赖抓取能力，并深度针对 **Google / Bing / 百度 / 神马** 以及 **AI 生成式搜索引擎 (GEO/AEO)** 进行了全维度索引与语义优化。

---

## ✨ 核心亮点 (Key Features)

### 1. 🏆 六大超万字核心专题与 SEO/GEO 知识矩阵
每个专题不仅包含 **10,000+ 字** 深度解析支柱页，还下设专属分类体系与成体系的长尾问答，形成网状互联的内容集群：
- **[42 家翻墙机场推荐天梯榜](/recommend/)**：根据专线质量、晚高峰抗压性、SLA 保证与性价比，提供分级选型天梯。
- **[42 家深度机场实测评测库](/airports/)**：单篇平均超 14,000 字，包含 BGP/IEPL/IPLC 真实拓扑拆解、晚高峰单线程带宽测速、IP 纯净度检测及防踩坑指南。
- **[免费节点与公益资源警示](/free-nodes/)**：解析免费节点中间人嗅探、明文传输、DNS 污染风险，提供沙箱运行安全隔离规范。
- **[机场选型与疑难解答全景 FAQ](/faq/)**：针对节点超时、TCP/UDP 握手震荡、流媒体 403 阻断等高频痛点提供系统解决方案。
- **[机场跑路预警与风控雷达](/alerts/)**：从支付网关异常、超常规大促、客服工单失联等多维度构建 72 小时资金避险预警机制。
- **[免费试用与退款保障机场指南](/trial/)**：甄选支持 1 元试用或 24 小时无理由退款的商家，大幅降低用户试错成本。

### 2. 🔬 E-E-A-T 实验室权威可信基础设施
- **[关于实验室 (/about)](https://bywave.world/about)**：公开硬件测试基准、多地域（华东/华南/华北）物理宿主机环境、三大运营商骨干网络探针分布及利益冲突披露（FTC 声明）。
- **[评测方法论 (/methodology)](https://bywave.world/methodology)**：公开丢包率（PLR）、抖动方差（Jitter）、单线程饱和带宽计算公式，以及 Cloudflare Turnstile、ChatGPT、Netflix 原生解锁验证标准。

### 3. 🛡️ 顶尖搜索引擎与技术 SEO 基础设施
- **100% 绝对 Canonical 规范化**：全站 1,760+ 页面自引用 HTTPS 绝对地址，防止参数污染与权重分散。
- **商用推广外链隔离**：所有推广出站链接严格携带 `rel="nofollow sponsored noopener"`，有效规避算法连坐风险。
- **多引擎抓取友好**：预设对 Googlebot、bingbot、Baiduspider、yisouspider 的友好抓取声明。
- **多维 Schema.org 结构化数据**：首页输出 `WebSite` + `Organization`；评测页输出严格对齐正文的 `Review` + `Product` + `BreadcrumbList`；技术文章输出 `Article`。
- **现代化 Favicon 矩阵**：内置矢量 SVG、32-bit PNG-in-ICO 及全尺寸高分移动端触摸图标。

---

## 🏗️ 目录结构 (Directory Structure)

```text
bywave.world/
├── .vitepress/
│   ├── config.mts              # VitePress 站点核心配置 (SEO Head/Nav/Sidebar/Hooks)
│   └── theme/                  # 主题样式定制与组件扩展
├── airports/                   # 42 家机场单篇深度评测 (每篇 13,000~15,000 字)
├── recommend/                  # 42 家综合推荐专题支柱与长尾矩阵
├── free-nodes/                 # 免费节点专题支柱与安全指南
├── faq/                        # 机场疑难排查全景 FAQ 矩阵
├── alerts/                     # 跑路预警与风控雷达专题
├── trial/                      # 免费试用与退款保障专题
├── lines/                      # 专线拓扑技术专栏 (IEPL/IPLC/BGP)
├── clients/                    # 客户端实战指南 (Clash/Shadowrocket/Sing-box等)
├── unlock/                     # AI 与流媒体解锁技术专栏
├── protocols/                  # 传输协议底层解析 (VLESS/Shadowsocks/Hysteria2)
├── guides/                     # 场景化选型与安全配置指南
├── public/                     # 静态资源 (图标/图片/robots.txt/logo)
├── data/                       # 品牌评测与结构化数据源 (brands.json)
├── scripts/                    # 自动化脚本集 (矩阵生成/图标流水线/内容强化)
│   ├── generate_favicons.js           # 自动生成高清 SVG/PNG/ICO 图标
│   ├── generate_vitepress_matrix.js   # 全站长尾内容与目录结构生成
│   ├── generate_six_mega_topics.js    # 生成六大万字支柱专题
│   └── deepen_42_airports.js          # 42 家万字级深度评测生成
├── about.md                    # 关于实验室 (E-E-A-T 基础设施)
├── methodology.md              # 评测方法论与数学建模
├── index.md                    # 站点首页
├── package.json
└── README.md
```

---

## 🚀 快速上手 (Quick Start)

### 环境要求
- **Node.js**: `>= 18.0.0`
- **包管理器**: `npm` / `pnpm` / `yarn`

### 1. 克隆代码仓库
```bash
git clone https://github.com/zlzlzl98698-dev/bywave.world.git
cd bywave.world
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地启动开发服务器
```bash
npm run dev
```
本地服务默认启动于 `http://localhost:5173/`。

### 4. 生产环境全量构建
构建流水线将依次自动执行：**Favicon 转换 -> 内容矩阵生成 -> 六大专题生成 -> VitePress SSG 编译 -> Pagefind 索引生成**。
```bash
npm run build
```
编译产物输出至 `.vitepress/dist/`，包含 1,760+ 静态 HTML 页面及 `sitemap.xml`。

### 5. 本地预览生产构建产物
```bash
npm run preview
```

---

## 🌐 生产部署 (Deployment)

由于项目为纯静态 SSG 架构，可无缝部署至任意现代静态托管平台：

### 选项 A: Cloudflare Pages (推荐)
1. 连接 GitHub 仓库至 Cloudflare Dashboard。
2. 构建设置：
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `.vitepress/dist`
   - **Node.js Version**: `18` 或更高
3. 绑定主域名 `bywave.world`。并在 **Rules -> Redirect Rules** 中将 `www.bywave.world` 301 重定向至 `https://bywave.world/`。

### 选项 B: Vercel
1. 导入 GitHub 仓库。
2. 配置 Build Command: `npm run build`，Output Directory: `.vitepress/dist`。

---

## 🔍 搜索引擎接入指南 (Search Engine Onboarding)

全站公共 `<head>` 已预置各大站长平台验证插槽（位于 `.vitepress/config.mts`），支持通过环境变量或直接填写：

| 平台 | 验证方式 / 环境变量 | 站点地图提交地址 |
| :--- | :--- | :--- |
| **Google Search Console** | `GOOGLE_SITE_VERIFICATION` | `https://bywave.world/sitemap.xml` |
| **Bing Webmaster Tools** | `BING_SITE_VERIFICATION` | `https://bywave.world/sitemap.xml` |
| **神马站长平台 (yisou)** | `SHENMA_SITE_VERIFICATION` | `https://bywave.world/sitemap.xml` |
| **百度搜索资源平台** | `BAIDU_SITE_VERIFICATION` | `https://bywave.world/sitemap.xml` |

---

## ⚖️ 免责声明 (Disclaimer)

1. 本项目所有内容均来自实验室在合法合规测试环境下的网络性能测速、网络拓扑观测与公开网络协议学术研究。
2. 本项目不提供、不销售任何未经许可的翻墙服务或代理工具。
3. 请严格遵守用户所在国家及地区的法律法规，合理合法使用互联网。

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 授权开源。
