<template>
  <div class="brand-card" :class="{ 'featured-card': isFeatured }">
    <div class="card-header">
      <div class="title-wrap">
        <span class="rank-badge" :class="{ 'rank-first': rank === 1 }">#{{ rank }}</span>
        <h3 class="brand-name">{{ name }}</h3>
        <span v-if="isFeatured" class="featured-tag">全站主推</span>
      </div>
      <div class="status-wrap">
        <span class="noc-badge" :class="statusClass">
          <span class="status-dot" :class="dotClass"></span>
          {{ statusText }}
        </span>
      </div>
    </div>

    <div class="card-body">
      <div class="info-grid">
        <div class="info-item">
          <span class="label">入门价格</span>
          <span class="val price">{{ price }}</span>
        </div>
        <div class="info-item">
          <span class="label">线路架构</span>
          <span class="val">{{ lines }}</span>
        </div>
        <div class="info-item">
          <span class="label">传输协议</span>
          <span class="val font-mono">{{ protocol }}</span>
        </div>
        <div class="info-item">
          <span class="label">运营年份</span>
          <span class="val font-mono">{{ year }}</span>
        </div>
      </div>

      <p class="features-desc">{{ features }}</p>

      <div v-if="coupon" class="coupon-box">
        <span class="coupon-label">专属优惠券:</span>
        <code class="coupon-code">{{ coupon }}</code>
      </div>
    </div>

    <div class="card-footer">
      <a :href="detailUrl" class="detail-link">查看完整评测报告 →</a>
      <a
        :href="affUrl"
        target="_blank"
        rel="nofollow sponsored noopener"
        class="aff-btn"
        :class="{ 'primary-gold': isFeatured }"
      >
        <span>前往官网直达</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rank: number
  name: string
  price: string
  lines: string
  protocol: string
  year: string | number
  features: string
  coupon?: string
  affUrl: string
  detailUrl: string
  status?: string
  isFeatured?: boolean
}>()

const statusText = computed(() => props.status || (props.rank <= 10 ? 'Operational' : 'Stable'))
const statusClass = computed(() => {
  if (statusText.value === 'Operational') return 'operational'
  if (statusText.value === 'Stable') return 'stable'
  if (statusText.value === '待核实') return 'unverified'
  return 'partial'
})
const dotClass = computed(() => {
  if (statusClass.value === 'operational') return 'green'
  if (statusClass.value === 'stable') return 'blue'
  return 'amber'
})
</script>

<style scoped>
.brand-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.25rem 0;
  transition: all 0.25s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}

.brand-card:hover {
  border-color: #0284c7;
  box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.featured-card {
  border: 1.5px solid #f59e0b;
  background: #fffdfa;
  box-shadow: 0 2px 12px rgba(245, 158, 11, 0.08);
}

.featured-card:hover {
  border-color: #d97706;
  box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.18);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rank-badge {
  font-family: var(--vp-font-family-mono);
  font-weight: 800;
  font-size: 0.85rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: #f1f5f9;
  color: #475569;
}

.rank-first {
  background: #f59e0b;
  color: #ffffff;
}

.brand-name {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1.15rem !important;
  font-weight: 700;
  color: #0f172a !important;
  border: none !important;
}

.featured-tag {
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fde68a;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #f1f5f9;
  margin-bottom: 0.85rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item .label {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.2rem;
}

.info-item .val {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
}

.info-item .price {
  color: #0284c7;
  font-weight: 700;
}

.font-mono {
  font-family: var(--vp-font-family-mono);
}

.features-desc {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.55;
  margin: 0.75rem 0;
}

.coupon-box {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f9ff;
  border: 1px dashed #bae6fd;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.coupon-label {
  font-size: 0.75rem;
  color: #0369a1;
}

.coupon-code {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  color: #0284c7;
  background: transparent !important;
  padding: 0 !important;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.detail-link {
  font-size: 0.85rem;
  color: #0284c7;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.detail-link:hover {
  color: #0369a1;
  text-decoration: underline;
}
</style>
