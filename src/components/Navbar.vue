<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="brand">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">AI Plant Identifier</span>
        <span class="badge">Vue3 Study</span>
      </div>

      <nav class="nav-links">
        <a href="#finder" class="nav-link active">识别植物</a>
        <a href="#features" class="nav-link">养护指南</a>
        <a href="#faq" class="nav-link">常见解答</a>
      </nav>

      <div class="nav-actions">
        <button class="action-btn" @click="handleTips">🌱 教学演示</button>
      </div>
    </div>
  </header>
</template>

<script setup>
const handleTips = () => {
  alert('Vue 3 教学示范项目：采用 Vue 3 单文件组件、组合式 API，无敏感环境变量及后端配置。');
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  height: 64px;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-main);
}

.logo-icon {
  font-size: 1.4rem;
}

.badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 999px;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.action-btn {
  padding: 8px 16px;
  background-color: var(--primary);
  color: #fff;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 640px) {
  .nav-links {
    display: none;
  }
}
</style>
