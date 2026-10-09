<template>
  <section class="hero-section">
    <div class="container hero-content">
      <div class="eyebrow">
        <span>🌿 AI Botanical Intelligence</span>
      </div>
      <h1 class="hero-title">
        拍下植物 <span class="highlight">探索自然生命的奥秘</span>
      </h1>
      <p class="hero-desc">
        无论是在公园漫步还是照料阳台盆栽，拍一张叶片或花朵特写，AI 瞬间识别植物品种，并奉上专属水分、光照养护秘籍。
      </p>
      
      <div class="hero-stats">
        <div class="stat-pill">🌱 涵盖30,000+常见植物物种</div>
        <div class="stat-pill">💧 专属浇水与光照指南</div>
        <div class="stat-pill">🐾 宠物安全与毒性辨别</div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero-section {
  padding: 50px 0 24px;
  text-align: center;
}

.hero-content {
  max-width: 820px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 16px;
  color: var(--text-main);
}

.highlight {
  color: var(--primary);
  background: linear-gradient(135deg, #16a34a 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-pill {
  background: #fff;
  border: 1px solid var(--border);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
