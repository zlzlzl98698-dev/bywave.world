<template>
  <div class="speedtest-report">
    <div class="report-header">
      <div class="header-left">
        <span class="pulse-indicator"></span>
        <span class="report-title">网络吞吐与延迟实测基准 (Performance Benchmark)</span>
      </div>
      <div class="header-right">
        <span class="tag-status" :class="hasImage ? 'status-measured' : 'status-vendor'">
          {{ hasImage ? '🟢 实测证据已归档 (Measured Data)' : '🔵 官方基准配置 (Vendor Baseline)' }}
        </span>
        <span v-if="testedAt" class="tag-date">测试时间: {{ testedAt }}</span>
      </div>
    </div>

    <!-- 真实测速证据截图 -->
    <div v-if="img" class="evidence-box">
      <div class="img-wrapper">
        <img :src="imgUrl" :alt="brand + ' 节点晚高峰测速截图'" class="speedtest-img" loading="lazy" />
      </div>
      <p class="img-caption">
        <strong>图 1：</strong> {{ brand }} 节点吞吐带宽与延迟离散度实测截图（归档于 bywave 可观测性实验室）。
      </p>
    </div>

    <!-- 测速数据表格 -->
    <div v-if="metrics && metrics.length > 0" class="metrics-table-wrapper">
      <table class="metrics-table">
        <thead>
          <tr>
            <th>节点区域</th>
            <th>平均延迟 (Ping)</th>
            <th>实测下载带宽 (Download)</th>
            <th>链路状态评估</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(m, idx) in metrics" :key="idx">
            <td class="region-col"><strong>{{ m.region }}</strong></td>
            <td class="mono-col">{{ m.latency }}</td>
            <td class="speed-col">
              <span class="speed-val">{{ m.speed }}</span>
              <div class="speed-bar-bg">
                <div class="speed-bar" :style="{ width: getSpeedPercent(m.speed) }"></div>
              </div>
            </td>
            <td>
              <span class="status-pill" :class="getStatusClass(m.status)">
                {{ m.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-footer">
      <span class="audit-note">
        💡 <strong>测试环境说明：</strong>采用本地百兆/千兆对称光纤出口直连国内中转 BGP 入口，规避跨网互联波动；实测晚高峰数据已剔除异常瞬时抖动。
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  brand: { type: String, required: true },
  img: { type: String, default: '' },
  testedAt: { type: String, default: '' },
  metrics: { type: Array, default: () => [] }
})

const hasImage = computed(() => !!props.img)
const imgUrl = computed(() => {
  if (!props.img) return ''
  if (props.img.startsWith('http') || props.img.startsWith('/')) return props.img
  return `/images/airports/${props.img}`
})

function getSpeedPercent(speedStr) {
  if (!speedStr) return '30%'
  const num = parseInt(speedStr)
  if (isNaN(num)) return '40%'
  const pct = Math.min(Math.max((num / 600) * 100, 10), 100)
  return `${pct}%`
}

function getStatusClass(status) {
  if (status === '优异' || status === '极佳') return 'pill-good'
  if (status === '良好' || status === '稳定') return 'pill-normal'
  return 'pill-fair'
}
</script>

<style scoped>
.speedtest-report {
  margin: 1.75rem 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.pulse-indicator {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}
.report-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: #1e293b;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.tag-status {
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}
.status-measured {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.status-vendor {
  background: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}
.tag-date {
  font-size: 0.78rem;
  color: #64748b;
}
.evidence-box {
  padding: 1.25rem;
  background: #fafafa;
  border-bottom: 1px solid #f1f5f9;
}
.img-wrapper {
  max-width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #0f172a;
}
.speedtest-img {
  width: 100%;
  height: auto;
  display: block;
}
.img-caption {
  font-size: 0.82rem;
  color: #64748b;
  margin-top: 0.5rem;
  margin-bottom: 0;
  text-align: center;
}
.metrics-table-wrapper {
  overflow-x: auto;
  padding: 0.75rem 1.25rem;
}
.metrics-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.metrics-table th {
  text-align: left;
  padding: 0.6rem 0.75rem;
  color: #64748b;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
  background: transparent;
}
.metrics-table td {
  padding: 0.7rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}
.region-col {
  color: #0f172a;
}
.mono-col {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  color: #2563eb;
}
.speed-col {
  min-width: 160px;
}
.speed-val {
  font-weight: 700;
  font-family: ui-monospace, SFMono-Regular, monospace;
  color: #0f172a;
}
.speed-bar-bg {
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  margin-top: 4px;
  overflow: hidden;
}
.speed-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  border-radius: 3px;
}
.status-pill {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.pill-good {
  background: #ecfdf5;
  color: #059669;
}
.pill-normal {
  background: #eff6ff;
  color: #2563eb;
}
.pill-fair {
  background: #fffbeb;
  color: #d97706;
}
.report-footer {
  padding: 0.75rem 1.25rem;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  font-size: 0.8rem;
  color: #64748b;
}
</style>
