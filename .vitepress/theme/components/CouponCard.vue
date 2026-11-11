<template>
  <div class="coupon-card">
    <div class="coupon-badge">限时专属特惠</div>
    <div class="coupon-body">
      <div class="coupon-info">
        <span class="coupon-label">优惠码：</span>
        <code class="coupon-code">{{ code }}</code>
        <span v-if="desc" class="coupon-desc">{{ desc }}</span>
      </div>
      <div class="coupon-actions">
        <button class="btn-copy" @click="copyCode">
          {{ copied ? '已复制 ✓' : '复制优惠码' }}
        </button>
        <a :href="url" target="_blank" rel="nofollow sponsored noopener" class="btn-direct">
          立即激活并访问官网 →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  desc: { type: String, default: '' },
  url: { type: String, required: true }
})

const copied = ref(false)

function copyCode() {
  if (navigator.clipboard && props.code) {
    navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}
</script>

<style scoped>
.coupon-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #2563eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
}
.coupon-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.coupon-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.coupon-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.coupon-label {
  font-size: 0.95rem;
  color: #64748b;
}
.coupon-code {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  background: #f1f5f9;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
}
.coupon-desc {
  font-size: 0.88rem;
  color: #475569;
  background: #f8fafc;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.coupon-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.btn-copy {
  padding: 0.5rem 1rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #2563eb;
  background: #ffffff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-copy:hover {
  background: #eff6ff;
  border-color: #2563eb;
}
.btn-direct {
  padding: 0.5rem 1.15rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff !important;
  background: #2563eb;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s ease;
  display: inline-block;
}
.btn-direct:hover {
  background: #1d4ed8;
}
@media (max-width: 640px) {
  .coupon-body {
    flex-direction: column;
    align-items: flex-start;
  }
  .coupon-actions {
    width: 100%;
  }
  .btn-direct, .btn-copy {
    flex: 1;
    text-align: center;
  }
}
</style>
