<template>
  <div class="unlock-matrix">
    <div class="matrix-header">
      <div class="header-title">
        <span class="icon">🎬</span>
        <span>流媒体与生成式 AI 解锁能力矩阵 (Service Availability Matrix)</span>
      </div>
      <span class="matrix-badge">原生 IP 纯净度实测</span>
    </div>

    <div class="matrix-grid">
      <!-- AI 分区 -->
      <div class="category-block">
        <div class="block-title">
          <span>🤖 前沿生成式 AI 服务</span>
          <span class="block-desc">抗 Cloudflare 拦截与原生 IP 校验</span>
        </div>
        <div class="service-cards">
          <div class="service-card" :class="aiStatus.chatgpt ? 'status-ok' : 'status-partial'">
            <div class="service-top">
              <span class="service-name">ChatGPT (GPT-4o)</span>
              <span class="status-indicator">{{ aiStatus.chatgpt ? '支持' : '视节点' }}</span>
            </div>
            <span class="service-detail">原生住宅/机房洁净IP通过人机验证</span>
          </div>

          <div class="service-card" :class="aiStatus.claude ? 'status-ok' : 'status-partial'">
            <div class="service-top">
              <span class="service-name">Claude 3.5 Sonnet</span>
              <span class="status-indicator">{{ aiStatus.claude ? '支持' : '高风控' }}</span>
            </div>
            <span class="service-detail">Anthropic严格区域检测免降级</span>
          </div>

          <div class="service-card" :class="aiStatus.gemini ? 'status-ok' : 'status-partial'">
            <div class="service-top">
              <span class="service-name">Google Gemini</span>
              <span class="status-indicator">{{ aiStatus.gemini ? '支持' : '视节点' }}</span>
            </div>
            <span class="service-detail">需配合美区/新加坡原生节点</span>
          </div>

          <div class="service-card status-ok">
            <div class="service-top">
              <span class="service-name">Perplexity / Copilot</span>
              <span class="status-indicator">支持</span>
            </div>
            <span class="service-detail">全天候低延迟学术检索</span>
          </div>
        </div>
      </div>

      <!-- 流媒体分区 -->
      <div class="category-block">
        <div class="block-title">
          <span>🍿 海外主流流媒体平台</span>
          <span class="block-desc">4K HDR 与全区版权库解锁</span>
        </div>
        <div class="service-cards">
          <div class="service-card status-ok">
            <div class="service-top">
              <span class="service-name">Netflix (奈飞)</span>
              <span class="status-indicator">全区解锁</span>
            </div>
            <span class="service-detail">非自制剧、4K HDR 原生支持</span>
          </div>

          <div class="service-card status-ok">
            <div class="service-top">
              <span class="service-name">Disney+</span>
              <span class="status-indicator">全区解锁</span>
            </div>
            <span class="service-detail">Star与IMAX Enhanced超清流</span>
          </div>

          <div class="service-card status-ok">
            <div class="service-top">
              <span class="service-name">YouTube Premium</span>
              <span class="status-indicator">4K/8K秒开</span>
            </div>
            <span class="service-detail">支持跨区订阅与画中画后台播放</span>
          </div>

          <div class="service-card status-ok">
            <div class="service-top">
              <span class="service-name">HBO Max / TikTok</span>
              <span class="status-indicator">支持</span>
            </div>
            <span class="service-detail">海外版抖音防黑屏与直播推流</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 解锁测试图展示 -->
    <div v-if="images && images.length > 0" class="unlock-evidence-gallery">
      <div class="gallery-title">📷 解锁实测凭证与控制台截图归档：</div>
      <div class="gallery-grid">
        <div v-for="(img, i) in images" :key="i" class="gallery-item">
          <img :src="resolveImg(img)" :alt="brand + ' 流媒体与AI解锁实测截图 ' + (i+1)" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  brand: { type: String, required: true },
  ai: { type: String, default: '' },
  streaming: { type: String, default: '' },
  images: { type: Array, default: () => [] }
})

const aiStatus = computed(() => {
  const text = props.ai || ''
  return {
    chatgpt: !text.includes('视节点') || text.includes('ChatGPT'),
    claude: text.includes('Claude') || text.includes('支持'),
    gemini: text.includes('Gemini') && !text.includes('视节点')
  }
})

function resolveImg(imgName) {
  if (imgName.startsWith('http') || imgName.startsWith('/')) return imgName
  return `/images/airports/${imgName}`
}
</script>

<style scoped>
.unlock-matrix {
  margin: 1.75rem 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}
.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1e293b;
}
.matrix-badge {
  font-size: 0.75rem;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}
.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  padding: 1.25rem;
}
@media (max-width: 768px) {
  .matrix-grid {
    grid-template-columns: 1fr;
  }
}
.category-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.block-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 0.4rem;
}
.block-desc {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 400;
}
.service-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
@media (max-width: 480px) {
  .service-cards {
    grid-template-columns: 1fr;
  }
}
.service-card {
  padding: 0.65rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: border-color 0.2s;
}
.service-card:hover {
  border-color: #cbd5e1;
}
.service-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.service-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #1e293b;
}
.status-indicator {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}
.status-ok .status-indicator {
  background: #ecfdf5;
  color: #059669;
}
.status-partial .status-indicator {
  background: #fffbeb;
  color: #d97706;
}
.service-detail {
  font-size: 0.72rem;
  color: #64748b;
  line-height: 1.3;
}
.unlock-evidence-gallery {
  padding: 1rem 1.25rem;
  background: #fafafa;
  border-top: 1px solid #f1f5f9;
}
.gallery-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.75rem;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}
.gallery-item {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  background: #0f172a;
}
.gallery-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  transition: transform 0.2s;
}
.gallery-item:hover img {
  transform: scale(1.03);
}
</style>
