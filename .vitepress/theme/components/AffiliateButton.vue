<template>
  <div class="aff-btn-wrapper">
    <a :href="url" target="_blank" rel="nofollow sponsored noopener" class="aff-btn" :class="sizeClass">
      <span class="btn-text">{{ text || '立即前往官网订阅体验' }}</span>
      <span class="btn-icon">→</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: { type: String, required: true },
  text: { type: String, default: '' },
  size: { type: String, default: 'normal' }
})

const sizeClass = computed(() => {
  return props.size === 'large' ? 'aff-btn-large' : ''
})
</script>

<style scoped>
.aff-btn-wrapper {
  margin: 1.25rem 0;
  display: inline-block;
}
.aff-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #ffffff !important;
  background: #2563eb;
  border-radius: 7px;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
  transition: all 0.2s ease;
}
.aff-btn:hover {
  background: #1d4ed8;
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
  transform: translateY(-1px);
}
.aff-btn-large {
  padding: 0.85rem 2rem;
  font-size: 1.05rem;
  border-radius: 8px;
}
.btn-icon {
  font-size: 1.1rem;
  transition: transform 0.2s;
}
.aff-btn:hover .btn-icon {
  transform: translateX(3px);
}
</style>
