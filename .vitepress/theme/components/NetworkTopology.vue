<template>
  <div class="network-topology">
    <div class="topo-header">
      <div class="topo-title">
        <span class="pulse-dot"></span>
        <span>网络拓扑走向与数据流传输可观测图 (Network Path Observatory)</span>
      </div>
      <span class="topo-type-tag">{{ type || 'IEPL 专线' }} 链路架构</span>
    </div>

    <div class="topo-canvas">
      <!-- 节点 1: 用户终端 -->
      <div class="topo-node">
        <div class="node-icon">💻</div>
        <div class="node-name">用户终端设备</div>
        <div class="node-desc">Win / macOS / iOS / Android</div>
        <div class="node-badge">Clash / 小火箭 / sing-box</div>
      </div>

      <!-- 连线 1 -->
      <div class="topo-arrow">
        <div class="arrow-line"></div>
        <span class="arrow-text">TLS 协议加密</span>
      </div>

      <!-- 节点 2: 国内中转入口 -->
      <div class="topo-node highlight">
        <div class="node-icon">🛡️</div>
        <div class="node-name">国内多线 BGP 接入机房</div>
        <div class="node-desc">上海 / 广州 / 北京 骨干网</div>
        <div class="node-badge status-good">隐藏真实境外 IP</div>
      </div>

      <!-- 连线 2: 专线跨境通道 -->
      <div class="topo-arrow dedicated">
        <div class="arrow-line dedicated-line"></div>
        <span class="arrow-text dedicated-text">⚡ {{ type || 'IEPL' }} 跨境内网专线（不过 GFW 公网）</span>
      </div>

      <!-- 节点 3: 境外落地与解锁 -->
      <div class="topo-node">
        <div class="node-icon">🌐</div>
        <div class="node-name">境外原生落地机房</div>
        <div class="node-desc">香港 / 日本 / 新加坡 / 美西</div>
        <div class="node-badge">原生广播与住宅 IP 池</div>
      </div>

      <!-- 连线 3 -->
      <div class="topo-arrow">
        <div class="arrow-line"></div>
        <span class="arrow-text">极速交付</span>
      </div>

      <!-- 节点 4: 目标服务 -->
      <div class="topo-node service-node">
        <div class="node-icon">🚀</div>
        <div class="node-name">全球目标云服务</div>
        <div class="node-desc">ChatGPT / Netflix / GitHub</div>
        <div class="node-badge status-good">4K 秒开 / 无降级</div>
      </div>
    </div>

    <div class="topo-footer">
      <span>🔒 <strong>链路安全特征：</strong>全程内网专线隔离传输，免受公网国际海缆突发拥堵与骨干网 QoS 丢包压制；端到端加密防护规避主动探测。</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  brand: { type: String, default: '' },
  type: { type: String, default: 'IEPL' }
})
</script>

<style scoped>
.network-topology {
  margin: 1.75rem 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}
.topo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.topo-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1e293b;
}
.pulse-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.topo-type-tag {
  font-size: 0.75rem;
  color: #1e40af;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}
.topo-canvas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  background: #fcfcfd;
  overflow-x: auto;
  gap: 0.5rem;
}
.topo-node {
  flex: 1;
  min-width: 140px;
  max-width: 170px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.85rem 0.6rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.topo-node.highlight {
  border-color: #3b82f6;
  background: #f0f7ff;
}
.topo-node.service-node {
  border-color: #10b981;
  background: #f0fdf4;
}
.node-icon {
  font-size: 1.5rem;
}
.node-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #0f172a;
}
.node-desc {
  font-size: 0.72rem;
  color: #64748b;
}
.node-badge {
  margin-top: 0.3rem;
  font-size: 0.68rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  background: #f1f5f9;
  color: #475569;
}
.node-badge.status-good {
  background: #ecfdf5;
  color: #059669;
}
.topo-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  min-width: 70px;
  text-align: center;
}
.arrow-line {
  width: 100%;
  height: 2px;
  background: #cbd5e1;
  position: relative;
}
.arrow-line::after {
  content: '';
  position: absolute;
  right: -2px;
  top: -3px;
  width: 0;
  height: 0;
  border-left: 6px solid #cbd5e1;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}
.arrow-text {
  font-size: 0.68rem;
  color: #94a3b8;
  margin-top: 0.25rem;
  white-space: nowrap;
}
.topo-arrow.dedicated {
  min-width: 120px;
}
.dedicated-line {
  height: 3px;
  background: #2563eb;
}
.dedicated-line::after {
  border-left-color: #2563eb;
  top: -3.5px;
}
.dedicated-text {
  font-size: 0.7rem;
  font-weight: 600;
  color: #2563eb;
}
.topo-footer {
  padding: 0.75rem 1.25rem;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  font-size: 0.8rem;
  color: #64748b;
}
@media (max-width: 900px) {
  .topo-canvas {
    flex-direction: column;
    gap: 1rem;
  }
  .topo-node {
    width: 100%;
    max-width: 320px;
  }
  .topo-arrow {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
  .arrow-text {
    transform: rotate(-90deg);
  }
}
</style>
