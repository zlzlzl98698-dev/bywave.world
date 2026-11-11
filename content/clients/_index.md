---
title: "全平台代理客户端安装、核心调优与疑难排障 (万字客户端生态支柱页)"
description: "Windows / macOS / iOS / Android / Linux 及 OpenWrt 软路由客户端权威操作手册。全面拆解 Clash Verge Rev、v2rayN、Shadowrocket 小火箭、sing-box 核心配置、TUN 全局模式与 DNS 泄露防御。"
layout: "list"
---

# 全平台代理客户端安装、核心调优与疑难排障

## 1. 现代代理客户端的技术流派与核心演进

代理客户端是用户终端与机场基础设施之间的沟通桥梁。随着老旧的 Shadowsocks 原版客户端与经典 Clash for Windows（原作者停止维护）的退出，代理客户端生态在 2024 - 2026 年迎来了跨越式升级，形成了以 **Mihomo (Clash.Meta)** 与 **sing-box** 为两大底座的核心生态。

```
┌────────────────────────────────────────────────────────────────────────┐
│                        现代代理客户端推荐选型矩阵                      │
├─────────────┬───────────────────────────┬──────────────────────────────┤
│ 操作系统     │ 首选主力推荐 (推荐小白/进阶) │ 极客高级选型 (推荐开发者)    │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ Windows     │ Clash Verge Rev (Mihomo)  │ v2rayN 7.x / sing-box 原生   │
│ macOS       │ Clash Verge Rev for Mac   │ Surge Mac (抓包与策略路由)   │
│ iOS / iPad  │ Shadowrocket (小火箭)      │ Stash / Quantumult X / Loon  │
│ Android     │ FlClash / v2rayNG         │ sing-box for Android (SFA)   │
│ OpenWrt路由 │ OpenClash (透明网关)       │ PassWall / HomeProxy         │
└─────────────┴───────────────────────────┴──────────────────────────────┘
```

---

## 2. 核心进阶技术：TUN 模式与 DNS 防泄露

### 2.1 什么是 TUN 模式？为什么要开启 TUN？
传统的“系统代理（System Proxy）”仅对主动遵从系统代理设置的应用程序（如 Chrome、Edge、Safari）生效，许多命令行工具（Terminal、Git、Docker）、桌面客户端游戏以及远程开发工具（VS Code SSH）会无视系统代理，导致直接走本地公网而连接超时。

**TUN (Network Tunnel) 虚拟网卡模式**：
- 在操作系统底层创建一张虚拟网卡（Virtual Adapter）。
- 通过路由表接管操作系统的 **Layer 3 (IP 层)** 全量网络数据包。
- 无论是浏览器、桌面 App、命令行还是后台进程，所有流量均无条件流经虚拟网卡分流，实现真正的全系统无感透明代理。

### 2.2 DNS Leak (DNS 泄露) 的致命危害与规避
如果您访问境外网站时，本地计算设备依然向本地运营商的 DNS 服务器（如 114.114.114.114 或本地电信 DNS）发起明文查询，运营商即可通过 DNS 日志完整获悉您访问过的所有域名。
- **最佳实践**：在客户端中启用 **Fake-IP 模式**，并将 Remote DNS 设置为加密的 DoH/DoT（如 `https://1.1.1.1/dns-query`），彻底阻断明文域名泄漏。

相关详细图文教程：
- [Clash Verge Rev (Mihomo) 终极调优全指南](/clients/clash-verge-rev/)
- [iOS 小火箭 (Shadowrocket) 2026 美区下载与分流手册](/clients/shadowrocket/)
- [sing-box 通用核心高性能配置实操](/clients/sing-box/)
- [OpenWrt 软路由透明网关 OpenClash 深度部署](/clients/openclash/)
