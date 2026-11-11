<template>
  <div class="airport-filter-engine">
    <!-- 顶部统计与控制栏 -->
    <div class="filter-controls">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索机场名称、协议（VLESS/SS）、线路（IEPL/BGP）或支持功能..."
          class="search-input"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
      </div>

      <div class="filter-selectors">
        <!-- 线路筛选 -->
        <div class="select-group">
          <label>线路架构：</label>
          <select v-model="selectedLine">
            <option value="all">全部线路</option>
            <option value="iepl">IEPL / IPLC 专线</option>
            <option value="bgp">BGP 智能中转</option>
            <option value="vless">VLESS 协议</option>
          </select>
        </div>

        <!-- 价格预算 -->
        <div class="select-group">
          <label>预算区间：</label>
          <select v-model="selectedPrice">
            <option value="all">全预算</option>
            <option value="cheap">低预算（≤ ¥15/月）</option>
            <option value="mid">中档平衡（¥15 - ¥30/月）</option>
            <option value="premium">旗舰商务（> ¥30/月）</option>
          </select>
        </div>

        <!-- 排序规则 -->
        <div class="select-group">
          <label>排序方式：</label>
          <select v-model="sortBy">
            <option value="rank">综合推荐排行</option>
            <option value="rating">官方权威评分</option>
            <option value="priceAsc">月均价格由低到高</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 筛选结果统计 -->
    <div class="filter-meta">
      <span>已筛选出 <strong>{{ filteredBrands.length }}</strong> 家优质机场服务商</span>
      <span v-if="hasFilter" class="reset-link" @click="resetFilters">重置筛选条件</span>
    </div>

    <!-- 品牌卡片网格 -->
    <div class="brand-grid">
      <div
        v-for="brand in filteredBrands"
        :key="brand.id"
        class="brand-card"
        :class="{ 'main-push': brand.isMainPush }"
      >
        <!-- 顶部标签与评分 -->
        <div class="card-top">
          <div class="brand-identity">
            <span class="rank-badge" :class="'rank-' + (brand.rank <= 3 ? brand.rank : 'default')">
              #{{ brand.rank }}
            </span>
            <h3 class="brand-name">
              <a :href="'/airports/' + brand.slug">{{ brand.name }}</a>
            </h3>
            <span v-if="brand.isMainPush" class="top-tag">★ 主推首选</span>
          </div>
          <div class="brand-rating">
            <span class="star-icon">★</span>
            <span class="rating-num">{{ brand.rating }}</span>
          </div>
        </div>

        <!-- 核心规格信息 -->
        <div class="specs-grid">
          <div class="spec-item">
            <span class="spec-label">线路类型</span>
            <span class="spec-value">{{ brand.lineType }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">入门价格</span>
            <span class="spec-value price-text">{{ brand.minPrice }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">支持协议</span>
            <span class="spec-value">{{ (brand.protocols || []).join(' / ') || 'Shadowsocks' }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">设备限制</span>
            <span class="spec-value">{{ brand.deviceLimit }}</span>
          </div>
        </div>

        <!-- 特色亮点摘要 -->
        <p class="brand-highlight">
          {{ (brand.features && brand.features[0]) || brand.minPriceDesc }}
        </p>

        <!-- 优惠码与跳转按钮 -->
        <div class="card-bottom">
          <div class="coupon-box" v-if="brand.coupon && brand.coupon !== '待核实'">
            <span class="coupon-label">优惠码:</span>
            <code class="coupon-text" @click="copyText(brand.coupon)">{{ brand.coupon }}</code>
          </div>
          <div class="card-actions">
            <a :href="'/airports/' + brand.slug" class="btn-review">
              评测报告
            </a>
            <a :href="brand.redirectPath" target="_blank" rel="nofollow sponsored noopener" class="btn-go">
              直达官网 →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import rawBrands from '../../../data/brands.json'

const brands = ref(rawBrands || [])
const searchQuery = ref('')
const selectedLine = ref('all')
const selectedPrice = ref('all')
const sortBy = ref('rank')

const hasFilter = computed(() => {
  return searchQuery.value !== '' || selectedLine.value !== 'all' || selectedPrice.value !== 'all' || sortBy.value !== 'rank'
})

function resetFilters() {
  searchQuery.value = ''
  selectedLine.value = 'all'
  selectedPrice.value = 'all'
  sortBy.value = 'rank'
}

function parsePrice(priceStr) {
  if (!priceStr) return 999
  const m = priceStr.match(/\d+/)
  return m ? parseInt(m[0]) : 999
}

const filteredBrands = computed(() => {
  let list = [...brands.value]

  // 搜索关键字过滤
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(b => {
      const nameMatch = b.name.toLowerCase().includes(q)
      const lineMatch = (b.lineType || '').toLowerCase().includes(q)
      const protoMatch = (b.protocols || []).some(p => p.toLowerCase().includes(q))
      const descMatch = (b.minPriceDesc || '').toLowerCase().includes(q)
      return nameMatch || lineMatch || protoMatch || descMatch
    })
  }

  // 线路过滤
  if (selectedLine.value === 'iepl') {
    list = list.filter(b => (b.lineType || '').toUpperCase().includes('IEPL') || (b.lineType || '').toUpperCase().includes('IPLC') || (b.lineType || '').includes('专线'))
  } else if (selectedLine.value === 'bgp') {
    list = list.filter(b => (b.lineType || '').toUpperCase().includes('BGP') || (b.lineType || '').includes('中转'))
  } else if (selectedLine.value === 'vless') {
    list = list.filter(b => (b.protocols || []).some(p => p.toUpperCase().includes('VLESS')) || (b.lineType || '').toUpperCase().includes('VLESS'))
  }

  // 价格过滤
  if (selectedPrice.value === 'cheap') {
    list = list.filter(b => parsePrice(b.minPrice) <= 15)
  } else if (selectedPrice.value === 'mid') {
    list = list.filter(b => {
      const p = parsePrice(b.minPrice)
      return p > 15 && p <= 30
    })
  } else if (selectedPrice.value === 'premium') {
    list = list.filter(b => parsePrice(b.minPrice) > 30)
  }

  // 排序
  if (sortBy.value === 'rating') {
    list.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'priceAsc') {
    list.sort((a, b) => parsePrice(a.minPrice) - parsePrice(b.minPrice))
  } else {
    list.sort((a, b) => a.rank - b.rank)
  }

  return list
})

function copyText(txt) {
  if (navigator.clipboard && txt) {
    navigator.clipboard.writeText(txt)
    alert('优惠码 ' + txt + ' 已复制到剪贴板！')
  }
}
</script>

<style scoped>
.airport-filter-engine {
  margin: 2rem 0;
}
.filter-controls {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 0.85rem;
  font-size: 1rem;
  color: #94a3b8;
}
.search-input {
  width: 100%;
  padding: 0.65rem 2.2rem 0.65rem 2.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s;
  background: #f8fafc;
}
.search-input:focus {
  border-color: #2563eb;
  background: #ffffff;
}
.clear-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.9rem;
}
.filter-selectors {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.select-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #475569;
}
.select-group select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #1e293b;
  background: #ffffff;
  cursor: pointer;
}
.filter-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.85rem;
  color: #64748b;
}
.reset-link {
  color: #2563eb;
  cursor: pointer;
  text-decoration: underline;
}
.brand-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}
.brand-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}
.brand-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}
.brand-card.main-push {
  border-color: #3b82f6;
  background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.85rem;
}
.brand-identity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rank-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}
.rank-1 { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
.rank-2 { background: #ffedd5; color: #ea580c; border: 1px solid #fdba74; }
.rank-3 { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
.rank-default { background: #f1f5f9; color: #475569; }
.brand-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}
.brand-name a {
  color: #0f172a;
  text-decoration: none;
}
.brand-name a:hover {
  color: #2563eb;
}
.top-tag {
  font-size: 0.7rem;
  background: #2563eb;
  color: #ffffff;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 600;
}
.brand-rating {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #f59e0b;
}
.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
  background: #f8fafc;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
}
.spec-item {
  display: flex;
  flex-direction: column;
}
.spec-label {
  font-size: 0.7rem;
  color: #94a3b8;
}
.spec-value {
  font-size: 0.78rem;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price-text {
  color: #dc2626;
  font-family: ui-monospace, monospace;
}
.brand-highlight {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.4;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 0.75rem;
}
.coupon-box {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
}
.coupon-label {
  color: #64748b;
}
.coupon-text {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
}
.card-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-review {
  flex: 1;
  text-align: center;
  padding: 0.45rem 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #334155 !important;
  background: #f1f5f9;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-review:hover {
  background: #e2e8f0;
}
.btn-go {
  flex: 1.2;
  text-align: center;
  padding: 0.45rem 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff !important;
  background: #2563eb;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-go:hover {
  background: #1d4ed8;
}
</style>
