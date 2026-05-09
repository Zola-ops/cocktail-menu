<template>
  <div class="share-card-container">
    <!-- 隐藏的卡片模板，用于生成图片 -->
    <div ref="cardRef" class="share-card-template">
      <div class="card-bg">
        <!-- 装饰元素 -->
        <div class="card-decoration">
          <div class="deco-circle deco-1"></div>
          <div class="deco-circle deco-2"></div>
          <div class="deco-line deco-line-1"></div>
          <div class="deco-line deco-line-2"></div>
        </div>

        <!-- 主标题 -->
        <div class="card-header">
          <div class="card-title-group">
            <h1 class="card-title">{{ cocktail.name }}</h1>
            <p class="card-title-en">{{ cocktail.nameEn }}</p>
          </div>
          <div class="card-logo">🍸</div>
        </div>

        <!-- 描述 -->
        <div v-if="cocktail.description" class="card-description">
          {{ cocktail.description }}
        </div>

        <!-- 标签 -->
        <div class="card-tags">
          <span v-for="base in cocktail.base" :key="base" class="card-tag card-tag-base">
            {{ base }}
          </span>
          <span v-for="taste in cocktail.taste" :key="taste" class="card-tag card-tag-taste">
            {{ taste }}
          </span>
        </div>

        <!-- 配方 -->
        <div class="card-section">
          <h3 class="card-section-title">🧪 配方</h3>
          <div class="card-ingredients">
            <div v-for="(ing, index) in cocktail.ingredients" :key="index" class="card-ingredient">
              <span class="ingredient-name">{{ ing.name }}</span>
              <span class="ingredient-amount">{{ ing.amount }}</span>
            </div>
          </div>
        </div>

        <!-- 步骤预览 -->
        <div class="card-section">
          <h3 class="card-section-title">📝 制作步骤</h3>
          <div class="card-steps">
            <div v-for="(step, index) in cocktail.steps.slice(0, 3)" :key="index" class="card-step">
              <span class="step-number">{{ index + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
            <div v-if="cocktail.steps.length > 3" class="step-more">
              ...共 {{ cocktail.steps.length }} 步
            </div>
          </div>
        </div>

        <!-- 底部信息 -->
        <div class="card-footer">
          <div class="card-info">
            <span v-if="cocktail.glass">🥃 {{ cocktail.glass }}</span>
            <span v-if="cocktail.garnish">✨ {{ cocktail.garnish }}</span>
          </div>
          <div class="card-meta">
            <span class="card-difficulty" :class="'difficulty-' + cocktail.difficulty">
              {{ difficultyText }}
            </span>
          </div>
        </div>

        <!-- 水印 -->
        <div class="card-watermark">
          下班后的赛博酒馆
        </div>
      </div>
    </div>

    <!-- 操作界面 -->
    <div class="share-actions">
      <button @click="handleSaveImage" class="share-btn save-btn" :disabled="isGenerating">
        <svg v-if="isGenerating" class="loading-icon" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span v-else>💾</span>
        <span>{{ isGenerating ? '生成中...' : '保存图片' }}</span>
      </button>
      
      <button @click="handleShare" class="share-btn share-btn-main" :disabled="isGenerating">
        <span>📤</span>
        <span>分享</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import html2canvas from 'html2canvas'
import type { Cocktail } from '../types/cocktail'

const props = defineProps<{
  cocktail: Cocktail
}>()

const cardRef = ref<HTMLElement | null>(null)
const isGenerating = ref(false)

const difficultyText = computed(() => {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[props.cocktail.difficulty]
})

async function generateImage(): Promise<Blob | null> {
  if (!cardRef.value) return null

  try {
    const canvas = await html2canvas(cardRef.value, {
      backgroundColor: null,
      scale: 2, // 高清图片
      useCORS: true,
      logging: false
    })

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png', 1.0)
    })
  } catch (error) {
    console.error('生成图片失败:', error)
    return null
  }
}

async function handleSaveImage() {
  isGenerating.value = true
  
  try {
    const blob = await generateImage()
    
    if (blob) {
      // 创建下载链接
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${props.cocktail.name}-调酒配方.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

async function handleShare() {
  isGenerating.value = true
  
  try {
    const blob = await generateImage()
    
    if (blob) {
      // 检查是否支持分享 API
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], `${props.cocktail.name}-调酒配方.png`, { type: 'image/png' })
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${props.cocktail.name} - 调酒配方`,
            text: `${props.cocktail.description}\n\n基酒：${props.cocktail.base.join('、')}\n口味：${props.cocktail.taste.join('、')}`,
            files: [file]
          })
        } else {
          // 如果不支持分享文件，则只分享文字
          await navigator.share({
            title: `${props.cocktail.name} - 调酒配方`,
            text: `${props.cocktail.description}\n\n基酒：${props.cocktail.base.join('、')}\n口味：${props.cocktail.taste.join('、')}`
          })
        }
      } else {
        // 不支持分享 API，保存图片
        await handleSaveImage()
      }
    }
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      console.error('分享失败:', error)
      alert('分享失败，请重试')
    }
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.share-card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 隐藏的卡片模板 */
.share-card-template {
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 400px;
  font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
}

.share-card-template * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card-bg {
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 50%, #1a0a2e 100%);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  color: white;
  min-height: 600px;
}

/* 装饰元素 */
.card-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(211, 0, 197, 0.3) 0%, transparent 70%);
}

.deco-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  right: -50px;
}

.deco-2 {
  width: 150px;
  height: 150px;
  bottom: 100px;
  left: -30px;
  background: radial-gradient(circle, rgba(5, 217, 232, 0.3) 0%, transparent 70%);
}

.deco-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(255, 42, 109, 0.3), transparent);
  height: 1px;
}

.deco-line-1 {
  width: 100%;
  top: 30%;
}

.deco-line-2 {
  width: 60%;
  bottom: 15%;
  right: 0;
  background: linear-gradient(270deg, transparent, rgba(5, 217, 232, 0.3), transparent);
}

/* 头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.card-title-group {
  flex: 1;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #05d9e8, #ff2b6d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
  letter-spacing: 2px;
}

.card-title-en {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
}

.card-logo {
  font-size: 40px;
  filter: drop-shadow(0 0 10px rgba(255, 42, 109, 0.5));
}

/* 描述 */
.card-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
  position: relative;
  z-index: 1;
}

/* 标签 */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.card-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-tag-base {
  background: rgba(255, 42, 109, 0.2);
  color: #ff6b9d;
  border: 1px solid rgba(255, 42, 109, 0.4);
}

.card-tag-taste {
  background: rgba(5, 217, 232, 0.2);
  color: #05d9e8;
  border: 1px solid rgba(5, 217, 232, 0.4);
}

/* 配方和步骤区域 */
.card-section {
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.card-section-title {
  font-size: 14px;
  color: #05d9e8;
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 1px;
}

.card-ingredients {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-ingredient {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 2px solid #ff2b6d;
}

.ingredient-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

.ingredient-amount {
  font-size: 13px;
  color: #ff2b6d;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.card-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.step-number {
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #05d9e8, #d300c5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #0a0a0f;
  flex-shrink: 0;
}

.step-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  flex: 1;
}

.step-more {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-top: 4px;
}

/* 底部信息 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.card-info {
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.card-difficulty {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.difficulty-easy {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.4);
}

.difficulty-medium {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.4);
}

.difficulty-hard {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.4);
}

/* 水印 */
.card-watermark {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}

/* 操作按钮 */
.share-actions {
  display: flex;
  gap: 12px;
}

.share-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  letter-spacing: 1px;
}

.save-btn {
  background: rgba(5, 217, 232, 0.1);
  color: #05d9e8;
  border: 1px solid rgba(5, 217, 232, 0.3);
}

.save-btn:hover:not(:disabled) {
  background: rgba(5, 217, 232, 0.2);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.3);
}

.share-btn-main {
  background: linear-gradient(135deg, #ff2b6d, #d300c5);
  color: white;
  box-shadow: 0 0 20px rgba(255, 42, 109, 0.4);
}

.share-btn-main:hover:not(:disabled) {
  box-shadow: 0 0 30px rgba(255, 42, 109, 0.6);
  transform: translateY(-2px);
}

.share-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-icon {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
