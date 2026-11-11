<template>
  <div v-if="visible" class="mobile-sticky-bar">
    <div class="sticky-content">
      <div class="sticky-left">
        <span class="sticky-brand">{{ brand }}</span>
        <span v-if="coupon" class="sticky-coupon" @click="copyCoupon">
          券码: <strong>{{ coupon }}</strong> (点击复制)
        </span>
      </div>
      <a :href="url" target="_blank" rel="nofollow sponsored noopener" class="sticky-btn">
        直达官网 →
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  brand: { type: String, required: true },
  coupon: { type: String, default: '' },
  url: { type: String, required: true }
})

const visible = ref(true)

function copyCoupon() {
  if (navigator.clipboard && props.coupon) {
    navigator.clipboard.writeText(props.coupon)
    alert('优惠码 ' + props.coupon + ' 已复制到剪贴板！')
  }
}
</script>

<style scoped>
.mobile-sticky-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
  padding: 0.65rem 1rem;
  z-index: 99;
}
@media (max-width: 768px) {
  .mobile-sticky-bar {
    display: block;
  }
}
.sticky-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
}
.sticky-left {
  display: flex;
  flex-direction: column;
}
.sticky-brand {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
}
.sticky-coupon {
  font-size: 0.72rem;
  color: #2563eb;
  cursor: pointer;
}
.sticky-btn {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: #ffffff !important;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  white-space: nowrap;
}
</style>
