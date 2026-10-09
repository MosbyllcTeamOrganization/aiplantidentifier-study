<template>
  <section id="finder" class="finder-section">
    <div class="container">
      <div class="finder-card">
        <!-- 模式切换: 拍照/上传 vs 特征描述 (学习: Tab 响应式状态) -->
        <div class="mode-tabs">
          <button
            class="tab-btn"
            :class="{ active: activeMode === 'photo' }"
            @click="activeMode = 'photo'"
          >
            📸 上传植物照片 / 叶片特写
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeMode === 'text' }"
            @click="activeMode = 'text'"
          >
            🌿 描述植物形态与特征
          </button>
        </div>

        <!-- 模式 1: 图片上传 (学习: Drag & Drop + FileReader 浏览器本地预览) -->
        <div v-if="activeMode === 'photo'" class="upload-container">
          <div
            v-if="!imagePreview"
            class="dropzone"
            :class="{ dragging: isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden-file-input"
              @change="handleFileChange"
            />
            <div class="drop-icon">🌸</div>
            <p class="drop-title">拖拽植物叶片或花朵照片到这里，或点击上传</p>
            <p class="drop-hint">建议拍摄清晰的叶脉纹理或花朵正面，光线充足效果更佳</p>
          </div>

          <div v-else class="preview-box">
            <img :src="imagePreview" alt="植物预览图" class="preview-img" />
            <div class="preview-actions">
              <span class="file-name">{{ fileName }}</span>
              <button class="remove-btn" @click="clearImage">✕ 重新选择</button>
            </div>
          </div>
        </div>

        <!-- 模式 2: 特征描述 (学习: 动态表单绑定) -->
        <div v-else class="text-container">
          <label class="input-label" for="plant-desc">
            描述植物的叶型、花色、茎秆及生长环境:
          </label>
          <textarea
            id="plant-desc"
            v-model="textDescription"
            class="textarea"
            rows="4"
            placeholder="例如：叶片很大像开裂的龟甲，墨绿色有光泽，有很长气生根垂下来，室内水培或土培..."
          ></textarea>
        </div>

        <!-- 辅助过滤项 -->
        <div class="filters-row">
          <div class="filter-item">
            <label>植物大类 (可选):</label>
            <select v-model="selectedType" class="select-input">
              <option
                v-for="item in plantTypes"
                :key="item.id"
                :value="item.id"
              >
                {{ item.label }}
              </option>
            </select>
          </div>

          <div class="filter-item">
            <label>花朵颜色 / 特殊气味:</label>
            <input
              v-model="plantColor"
              type="text"
              class="text-input"
              placeholder="如：白花黄心 / 无花纯观叶 / 柠檬清香"
            />
          </div>
        </div>

        <!-- 识别提交按钮 -->
        <div class="action-row">
          <button
            class="identify-btn"
            :disabled="isAnalyzing || (!imagePreview && !textDescription.trim())"
            @click="runIdentification"
          >
            <span v-if="isAnalyzing">⏳ 正在比对植物植物志数据库...</span>
            <span v-else>🌿 立即识别植物</span>
          </button>
        </div>

        <!-- 识别结果展示 -->
        <div v-if="hasResult" class="result-area">
          <div class="result-header">
            <h3>🌱 植物百科与养护建议</h3>
            <span class="confidence-tag">AI 植物志物种匹配完毕</span>
          </div>

          <div class="result-grid">
            <article
              v-for="item in results"
              :key="item.id"
              class="result-card"
            >
              <div class="card-thumb">
                <img :src="item.imageUrl" :alt="item.commonName" class="thumb-img" />
              </div>
              <div class="card-body">
                <div class="card-top">
                  <div>
                    <h4 class="plant-name">
                      {{ item.commonName }}
                      <span class="scientific-name"><i>{{ item.scientificName }}</i></span>
                    </h4>
                    <span class="taxonomy-info">{{ item.family }} · {{ item.genus }}</span>
                  </div>
                  <div class="confidence-badge">{{ item.confidence }}% 匹配度</div>
                </div>

                <p class="match-reason">{{ item.matchReason }}</p>

                <div class="traits-box">
                  <span
                    v-for="(trait, idx) in item.traits"
                    :key="idx"
                    class="trait-badge"
                  >
                    {{ trait }}
                  </span>
                </div>

                <!-- 养护指南卡片 (学习: 嵌套对象渲染) -->
                <div class="care-guide-grid">
                  <div class="care-item">
                    <span class="care-icon">☀️ 光照:</span>
                    <span class="care-text">{{ item.care.light }}</span>
                  </div>
                  <div class="care-item">
                    <span class="care-icon">💧 水分:</span>
                    <span class="care-text">{{ item.care.water }}</span>
                  </div>
                  <div class="care-item">
                    <span class="care-icon">🌡️ 温度:</span>
                    <span class="care-text">{{ item.care.temperature }}</span>
                  </div>
                  <div class="care-item">
                    <span class="care-icon">🪴 土壤:</span>
                    <span class="care-text">{{ item.care.soil }}</span>
                  </div>
                </div>

                <div class="safety-tip">
                  <strong>🐾 安全与毒性提醒:</strong> {{ item.safetyTip }}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { PLANT_TYPES, MOCK_PLANT_RESULTS } from '../data/mockData';

const plantTypes = PLANT_TYPES;
const activeMode = ref('photo');
const isDragging = ref(false);
const fileInputRef = ref(null);
const imagePreview = ref(null);
const fileName = ref('');
const textDescription = ref('');
const selectedType = ref('all');
const plantColor = ref('');
const isAnalyzing = ref(false);
const hasResult = ref(false);
const results = ref([]);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFile = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    alert('请选择有效的图片文件！');
    return;
  }
  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) handleFile(file);
};

const handleDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file) handleFile(file);
};

const clearImage = () => {
  imagePreview.value = null;
  fileName.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
};

const runIdentification = () => {
  isAnalyzing.value = true;
  hasResult.value = false;

  setTimeout(() => {
    results.value = MOCK_PLANT_RESULTS;
    isAnalyzing.value = false;
    hasResult.value = true;
  }, 750);
};
</script>

<style scoped>
.finder-section {
  padding: 10px 0 50px;
}

.finder-card {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
  padding: 32px;
}

.mode-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 8px;
  background: var(--background);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--primary-light);
  color: var(--primary);
}

.dropzone {
  border: 2px dashed #86efac;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: #fdfdfd;
  cursor: pointer;
  transition: all 0.2s;
}

.dropzone:hover, .dropzone.dragging {
  border-color: var(--primary);
  background: var(--primary-light);
}

.hidden-file-input {
  display: none;
}

.drop-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.drop-title {
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 4px;
}

.drop-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.preview-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--background);
  border-radius: 10px;
}

.preview-img {
  max-height: 220px;
  border-radius: 8px;
  object-fit: contain;
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.file-name {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.remove-btn {
  background: #fee2e2;
  color: #dc2626;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
}

.text-container {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: var(--text-main);
}

.textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

.textarea:focus {
  border-color: var(--primary);
}

.filters-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.filter-item label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-muted);
}

.select-input, .text-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fff;
  font-size: 0.95rem;
}

.action-row {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.identify-btn {
  background: var(--primary);
  color: #fff;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.2s;
}

.identify-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.identify-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-area {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  padding-top: 28px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.result-header h3 {
  font-size: 1.25rem;
  color: var(--text-main);
}

.confidence-tag {
  background: var(--primary-light);
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
}

.result-grid {
  display: grid;
  gap: 20px;
}

.result-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.card-thumb {
  width: 150px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  flex: 1;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.plant-name {
  font-size: 1.3rem;
  color: var(--text-main);
  font-weight: 700;
}

.scientific-name {
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-left: 6px;
}

.taxonomy-info {
  display: block;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.confidence-badge {
  background: var(--primary);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.match-reason {
  font-size: 0.92rem;
  color: var(--text-body);
  margin: 8px 0 12px;
  line-height: 1.5;
}

.traits-box {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.trait-badge {
  background: #fff;
  border: 1px solid var(--border);
  padding: 3px 8px;
  font-size: 0.78rem;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 500;
}

.care-guide-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-bottom: 12px;
}

.care-item {
  font-size: 0.85rem;
}

.care-icon {
  font-weight: 600;
  color: var(--text-main);
  margin-right: 4px;
}

.care-text {
  color: var(--text-body);
}

.safety-tip {
  background: #fef3c7;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #92400e;
  border-left: 3px solid #f59e0b;
}

@media (max-width: 640px) {
  .filters-row {
    grid-template-columns: 1fr;
  }
  .result-card {
    flex-direction: column;
  }
  .card-thumb {
    width: 100%;
    height: 160px;
  }
  .care-guide-grid {
    grid-template-columns: 1fr;
  }
}
</style>
