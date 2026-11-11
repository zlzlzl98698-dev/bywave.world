<template>
  <div class="cluster-hierarchy-view">
    <div class="hierarchy-header">
      <div class="title-wrap">
        <span class="icon">📑</span>
        <h3 class="hierarchy-title">{{ title || '三级内容集群与深度 SEO 文章矩阵规划' }}</h3>
      </div>
      <span class="cluster-tag">10 大集群 × 10 篇高价值独立长尾题</span>
    </div>

    <div class="clusters-list">
      <div v-for="(c, cIdx) in clusters" :key="cIdx" class="cluster-card">
        <div class="cluster-head">
          <div class="cluster-index-badge">集群 {{ cIdx + 1 }}</div>
          <h4 class="cluster-name">{{ c.name }}</h4>
        </div>
        <p class="cluster-desc">{{ c.desc }}</p>

        <div class="cluster-topics">
          <div class="topics-title">🎯 独立搜索价值文章标题与长尾词映射（全量规划）：</div>
          <ol class="topic-items">
            <li v-for="(art, aIdx) in c.articles" :key="aIdx" class="topic-item">
              <a :href="art.url" class="art-title-link">
                <span class="art-num">{{ aIdx + 1 }}.</span>
                <span class="art-title-text">{{ art.title }}</span>
                <span class="read-arrow">阅读全文 →</span>
              </a>
              <div class="art-meta">
                <span class="art-intent">意图：{{ art.intent }}</span>
                <span class="art-kw">关键词：<code>{{ art.keyword }}</code></span>
                <span class="art-pain">痛点：{{ art.painPoint }}</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  clusters: { type: Array, required: true }
})
</script>

<style scoped>
.cluster-hierarchy-view {
  margin: 2rem 0;
}
.hierarchy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.hierarchy-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}
.cluster-tag {
  font-size: 0.75rem;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
}
.clusters-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.cluster-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
.cluster-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}
.cluster-index-badge {
  font-size: 0.7rem;
  font-weight: 700;
  background: #0f172a;
  color: #ffffff;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}
.cluster-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
}
.cluster-desc {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}
.cluster-topics {
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.85rem 1rem;
  border: 1px solid #f1f5f9;
}
.topics-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.6rem;
}
.topic-items {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.topic-item {
  font-size: 0.85rem;
  color: #1e293b;
  line-height: 1.4;
}
.art-title-link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  color: #0f172a;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s ease;
  line-height: 1.45;
}
.art-title-link:hover {
  color: #2563eb;
  transform: translateX(2px);
}
.art-num {
  color: #2563eb;
  font-family: ui-monospace, monospace;
}
.art-title-text {
  border-bottom: 1px dashed #cbd5e1;
}
.art-title-link:hover .art-title-text {
  border-bottom-color: #2563eb;
}
.read-arrow {
  font-size: 0.78rem;
  color: #2563eb;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0.8;
  margin-left: 0.25rem;
}
.art-title-link:hover .read-arrow {
  opacity: 1;
}
.art-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.2rem;
}
.art-meta code {
  color: #2563eb;
  background: #eff6ff;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}
</style>
