<template>
  <div class="aff-btn-container" :class="{ 'align-center': center }">
    <a
      :href="href"
      target="_blank"
      rel="nofollow sponsored noopener"
      class="aff-btn"
      :class="variantClass"
    >
      <span class="btn-text">{{ text || '访问官网 · 开启高速体验' }}</span>
      <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>
    <span v-if="subtext" class="subtext">{{ subtext }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href: string
  text?: string
  subtext?: string
  variant?: 'primary' | 'gold' | 'outline'
  center?: boolean
}>()

const variantClass = computed(() => {
  if (props.variant === 'gold') return 'primary-gold'
  return ''
})
</script>

<style scoped>
.aff-btn-container {
  display: inline-flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 1rem 0;
}

.align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtext {
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
}
</style>
