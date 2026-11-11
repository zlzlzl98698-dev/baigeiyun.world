<template>
  <div class="observatory-disclaimer" :class="typeClass">
    <div class="disclaimer-header">
      <span class="disclaimer-icon">{{ icon }}</span>
      <strong class="disclaimer-title">{{ title }}</strong>
    </div>
    <div class="disclaimer-content">
      <slot>
        {{ text }}
      </slot>
    </div>
    <div v-if="verifyDate" class="disclaimer-footer">
      <span>最后核验日期: {{ verifyDate }} | 数据来源: 独立网络观测台实验室</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'info' | 'gold' | 'warning' | 'risk'
  title?: string
  text?: string
  verifyDate?: string
}>()

const typeClass = computed(() => {
  if (props.type === 'gold') return 'gold'
  if (props.type === 'warning' || props.type === 'risk') return 'red'
  return ''
})

const icon = computed(() => {
  if (props.type === 'gold') return '🏆'
  if (props.type === 'warning' || props.type === 'risk') return '⚠️'
  return 'ℹ️'
})

const title = computed(() => {
  if (props.title) return props.title
  if (props.type === 'gold') return '全站首选主推说明'
  if (props.type === 'risk') return '风控与数据真实性声明'
  return '网络可观测性评测准则'
})
</script>

<style scoped>
.disclaimer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.disclaimer-title {
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 700;
}

.disclaimer-content {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #334155;
}

.disclaimer-footer {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #cbd5e1;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  color: #64748b;
}
</style>
