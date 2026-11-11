<template>
  <div class="speedtest-report">
    <div class="report-header">
      <div class="header-left">
        <span class="report-icon">⚡</span>
        <h4 class="report-title">{{ brand }} 节点性能实测报告</h4>
      </div>
      <div class="header-right">
        <span class="test-time">{{ testDate }} (晚高峰实测)</span>
      </div>
    </div>

    <div class="nodes-container">
      <div v-for="node in nodes" :key="node.name" class="node-row">
        <div class="node-info">
          <span class="node-status-dot"></span>
          <span class="node-name">{{ node.name }}</span>
          <span class="node-latency font-mono">{{ node.latency }}ms</span>
        </div>
        <div class="speed-bar-wrap">
          <div class="speed-bar-fill" :style="{ width: calcWidth(node.speed) }"></div>
        </div>
        <div class="node-speed font-mono">{{ node.speed }} Mbps</div>
      </div>
    </div>

    <div v-if="summary" class="report-summary">
      <span class="summary-badge">综合指标</span>
      <span class="summary-text">{{ summary }}</span>
    </div>

    <div v-if="imageSrc" class="image-evidence">
      <div class="evidence-header">
        <span>📸 测速凭证原始截图 (可观测性实验存证)</span>
      </div>
      <div class="image-wrapper">
        <img :src="imageSrc" :alt="brand + ' 节点测速实测报告截图'" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NodeItem {
  name: string
  latency: number
  speed: number
}

const props = defineProps<{
  brand: string
  testDate: string
  nodes: NodeItem[]
  summary?: string
  imageSrc?: string
  maxSpeed?: number
}>()

const max = props.maxSpeed || 600

function calcWidth(speed: number) {
  const pct = Math.min(Math.round((speed / max) * 100), 100)
  return `${pct}%`
}
</script>

<style scoped>
.speedtest-report {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.report-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1rem !important;
  color: #0f172a !important;
  font-weight: 700 !important;
  border: none !important;
}

.test-time {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  color: #64748b;
}

.nodes-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.node-row {
  display: grid;
  grid-template-columns: 180px 1fr 100px;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

@media (max-width: 640px) {
  .node-row {
    grid-template-columns: 120px 1fr 75px;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
}

.node-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.node-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.node-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.85rem;
}

.node-latency {
  font-size: 0.75rem;
  color: #0284c7;
  margin-left: auto;
}

.speed-bar-wrap {
  background: #e2e8f0;
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
  position: relative;
}

.speed-bar-fill {
  background: linear-gradient(90deg, #0284c7 0%, #2563eb 100%);
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease;
}

.node-speed {
  text-align: right;
  font-weight: 700;
  color: #0284c7;
  font-size: 0.85rem;
}

.font-mono {
  font-family: var(--vp-font-family-mono);
}

.report-summary {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.825rem;
}

.summary-badge {
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.summary-text {
  color: #475569;
  font-family: var(--vp-font-family-mono);
}

.image-evidence {
  margin-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.evidence-header {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.image-wrapper {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  max-width: 100%;
}

.image-wrapper img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
