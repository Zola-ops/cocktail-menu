<template>
  <div class="share-card-container">
    <div ref="cardRef" class="share-card-template">
      <div class="card-bg">
        <div class="card-decoration">
          <div class="deco-circle deco-1"></div>
          <div class="deco-circle deco-2"></div>
          <div class="deco-line deco-line-1"></div>
          <div class="deco-line deco-line-2"></div>
        </div>

        <div class="card-header">
          <div class="card-title-group">
            <h1 class="card-title">{{ cocktail.name }}</h1>
            <p class="card-title-en">{{ cocktail.nameEn }}</p>
          </div>
          <div class="card-logo">🍸</div>
        </div>

        <div v-if="cocktail.description" class="card-description">
          {{ cocktail.description }}
        </div>

        <div class="card-tags">
          <span v-for="base in cocktail.base" :key="base" class="card-tag card-tag-base">
            {{ base }}
          </span>
          <span v-for="taste in cocktail.taste" :key="taste" class="card-tag card-tag-taste">
            {{ taste }}
          </span>
        </div>

        <div class="card-section">
          <h3 class="card-section-title">🧪 配方</h3>
          <div class="card-ingredients">
            <div v-for="(ing, index) in cocktail.ingredients" :key="index" class="card-ingredient">
              <span class="ingredient-name">{{ ing.name }}</span>
              <span class="ingredient-amount">{{ ing.amount }}</span>
            </div>
          </div>
        </div>

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

        <div class="card-watermark">
          下班后的赛博酒馆
        </div>
      </div>
    </div>

    <!-- 分享选项弹窗 -->
    <div v-if="showShareOptions" class="share-options-overlay" @click.self="showShareOptions = false">
      <div class="share-options-modal">
        <div class="share-options-header">
          <h3 class="share-options-title">选择分享方式</h3>
          <button @click="showShareOptions = false" class="share-options-close">✕</button>
        </div>
        <div class="share-options-list">
          <button @click="handleShareImage" class="share-option-btn">
            <div class="share-option-icon" style="background: linear-gradient(135deg, #ff2b6d, #d300c5);">🖼️</div>
            <div class="share-option-content">
              <div class="share-option-title">分享图片</div>
              <div class="share-option-desc">将精美的调酒卡片图片分享给好友</div>
            </div>
          </button>
          <button @click="handleShareLink" class="share-option-btn">
            <div class="share-option-icon" style="background: linear-gradient(135deg, #05d9e8, #00bcd4);">🔗</div>
            <div class="share-option-content">
              <div class="share-option-title">复制链接</div>
              <div class="share-option-desc">复制应用链接到剪贴板</div>
            </div>
          </button>
          <button @click="handleSaveImage" class="share-option-btn">
            <div class="share-option-icon" style="background: linear-gradient(135deg, #d300c5, #05d9e8);">💾</div>
            <div class="share-option-content">
              <div class="share-option-title">保存到本地</div>
              <div class="share-option-desc">将卡片图片保存到设备相册</div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="share-actions">
      <button @click="handleSaveImage" class="share-btn save-btn" :disabled="isGenerating">
        <svg v-if="isGenerating" class="loading-icon" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span v-else>💾</span>
        <span>{{ isGenerating ? '生成中...' : '保存图片' }}</span>
      </button>
      
      <button @click="showShareOptions = true" class="share-btn share-btn-main" :disabled="isGenerating">
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
const showShareOptions = ref(false)

const difficultyText = computed(() => {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[props.cocktail.difficulty]
})

async function generateImage(): Promise<Blob | null> {
  if (!cardRef.value) return null

  try {
    const canvas = await html2canvas(cardRef.value, {
      backgroundColor: '#1a1a2e',
      scale: 2,
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
  showShareOptions.value = false
  
  try {
    const blob = await generateImage()
    
    if (blob) {
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

async function handleShareImage() {
  isGenerating.value = true
  showShareOptions.value = false
  
  try {
    const blob = await generateImage()
    
    if (blob) {
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], `${props.cocktail.name}-调酒配方.png`, { type: 'image/png' })
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${props.cocktail.name} - 调酒配方`,
            text: `${props.cocktail.description}\n\n基酒：${props.cocktail.base.join('、')}\n口味：${props.cocktail.taste.join('、')}`,
            files: [file]
          })
        } else {
          await navigator.share({
            title: `${props.cocktail.name} - 调酒配方`,
            text: `${props.cocktail.description}\n\n基酒：${props.cocktail.base.join('、')}\n口味：${props.cocktail.taste.join('、')}`
          })
        }
      } else {
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

async function handleShareLink() {
  showShareOptions.value = false
  
  try {
    const shareText = `${props.cocktail.name}\n${props.cocktail.nameEn}\n\n${props.cocktail.description}\n\n基酒：${props.cocktail.base.join('、')}\n口味：${props.cocktail.taste.join('、')}\n\n来自「下班后的赛博酒馆」`
    
    await navigator.clipboard.writeText(shareText)
    alert('已复制到剪贴板！')
  } catch (error) {
    console.error('复制失败:', error)
    alert('复制失败，请重试')
  }
}

function handleShare() {
  showShareOptions.value = true
}
</script>

<style scoped>
.share-card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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

.card-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
  position: relative;
  z-index: 1;
}

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

.card-watermark {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}

/* 分享选项弹窗 */
.share-options-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.share-options-modal {
  background: linear-gradient(180deg, #1a1a2e 0%, #0a0a0f 100%);
  border: 1px solid rgba(211, 0, 197, 0.3);
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.share-options-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.share-options-title {
  font-family: 'Orbitron', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #f0f0f0;
  letter-spacing: 1px;
}

.share-options-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #808080;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-options-close:hover {
  background: rgba(255, 42, 109, 0.2);
  color: #ff2b6d;
}

.share-options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.share-option-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.share-option-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(5, 217, 232, 0.3);
  transform: translateY(-2px);
}

.share-option-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.share-option-content {
  flex: 1;
}

.share-option-title {
  font-family: 'Orbitron', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #f0f0f0;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.share-option-desc {
  font-size: 12px;
  color: #808080;
  line-height: 1.4;
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
  background: rgba(5, 217, 232, 0.15);
  color: #05d9e8;
  border: 1px solid rgba(5, 217, 232, 0.4);
}

.save-btn:hover:not(:disabled) {
  background: rgba(5, 217, 232, 0.25);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.4);
  transform: translateY(-2px);
}

.share-btn-main {
  background: linear-gradient(135deg, #ff2b6d, #d300c5);
  color: white;
  box-shadow: 0 0 20px rgba(255, 42, 109, 0.5);
}

.share-btn-main:hover:not(:disabled) {
  box-shadow: 0 0 30px rgba(255, 42, 109, 0.7);
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