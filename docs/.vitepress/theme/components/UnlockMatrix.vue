<template>
  <div class="unlock-matrix">
    <div class="matrix-header">
      <h4 class="matrix-title">🎬 AI 生产力与全球流媒体解锁矩阵 (Availability Matrix)</h4>
      <span class="matrix-subtitle">实测工具: RegionRestrictionCheck / 单节点探测</span>
    </div>

    <div class="services-grid">
      <div v-for="item in services" :key="item.name" class="service-card" :class="item.status">
        <div class="service-top">
          <span class="service-name">{{ item.name }}</span>
          <span class="service-badge" :class="item.status">{{ statusBadgeText(item.status) }}</span>
        </div>
        <div class="service-detail">{{ item.note || defaultNote(item.status) }}</div>
      </div>
    </div>

    <div v-if="images && images.length" class="unlock-screenshots">
      <div class="screenshots-title">📸 解锁存证原始截图</div>
      <div class="screenshots-grid">
        <div v-for="(img, idx) in images" :key="idx" class="screenshot-item">
          <img :src="img" :alt="'解锁状态截图 ' + (idx + 1)" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ServiceItem {
  name: string
  status: 'operational' | 'stable' | 'partial' | 'unavailable' | 'unverified'
  note?: string
}

defineProps<{
  services: ServiceItem[]
  images?: string[]
}>()

function statusBadgeText(status: string) {
  switch (status) {
    case 'operational': return '原生全解锁'
    case 'stable': return '稳定支持'
    case 'partial': return '视节点而定'
    case 'unavailable': return '限制/未解锁'
    default: return '待核实'
  }
}

function defaultNote(status: string) {
  switch (status) {
    case 'operational': return '原生 IP 支持，全功能无阻断'
    case 'stable': return '主流出口节点顺畅访问'
    case 'partial': return '部分敏感节点需手动切换'
    case 'unavailable': return '受地域版权或风控策略限制'
    default: return '暂无独立实测数据存证'
  }
}
</script>

<style scoped>
.unlock-matrix {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}

.matrix-header {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.matrix-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1rem !important;
  color: #0284c7 !important;
  font-weight: 700 !important;
  border: none !important;
}

.matrix-subtitle {
  font-size: 0.75rem;
  color: #64748b;
  font-family: var(--vp-font-family-mono);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}

.service-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.2s ease;
}

.service-card:hover {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.service-card.operational {
  border-left: 3px solid #10b981;
}

.service-card.stable {
  border-left: 3px solid #3b82f6;
}

.service-card.partial {
  border-left: 3px solid #f59e0b;
}

.service-card.unavailable {
  border-left: 3px solid #ef4444;
}

.service-card.unverified {
  border-left: 3px solid #94a3b8;
}

.service-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.service-name {
  font-weight: 700;
  font-size: 0.85rem;
  color: #0f172a;
}

.service-badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
}

.service-badge.operational {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.service-badge.stable {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.service-badge.partial {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}

.service-badge.unavailable {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.service-badge.unverified {
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #cbd5e1;
}

.service-detail {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.35;
}

.unlock-screenshots {
  margin-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.screenshots-title {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.75rem;
}

.screenshot-item {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.screenshot-item img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
