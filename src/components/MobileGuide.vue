<template>
  <Transition name="slide-up">
    <div v-if="showGuide" class="mobile-guide-overlay" @click="closeGuide">
      <div class="guide-content" @click.stop>
        <div class="guide-header">
          <div class="guide-icon">👆</div>
          <h3>欢迎来到赛博酒馆</h3>
          <p class="guide-subtitle">首次使用？来看看这些快捷操作</p>
        </div>

        <div class="guide-list">
          <div class="guide-item">
            <div class="guide-icon-small">👆</div>
            <div class="guide-text">
              <h4>滑动浏览</h4>
              <p>上下滑动浏览所有调酒</p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon-small">👆</div>
            <div class="guide-text">
              <h4>点击查看详情</h4>
              <p>点击任意调酒卡片查看完整配方</p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon-small">❤️</div>
            <div class="guide-text">
              <h4>收藏调酒</h4>
              <p>点击心形图标收藏喜欢的调酒</p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon-small">⚡</div>
            <div class="guide-text">
              <h4>AI调酒</h4>
              <p>点击闪电按钮让AI为你创作</p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon-small">🔍</div>
            <div class="guide-text">
              <h4>快速筛选</h4>
              <p>使用筛选器找到心仪的调酒</p>
            </div>
          </div>
        </div>

        <div class="guide-tips">
          <div class="tip-badge">
            <span>💡</span>
            <span>提示：可以将网站添加到主屏幕，像App一样使用</span>
          </div>
        </div>

        <button class="guide-close-btn" @click="closeGuide">
          开始探索 <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </Transition>

  <Transition name="bounce">
    <div v-if="showInstallBanner" class="install-banner" @click="showInstallPrompt">
      <div class="banner-icon">📱</div>
      <div class="banner-text">
        <h4>安装到主屏幕</h4>
        <p>更快的访问速度，离线也能用</p>
      </div>
      <button class="install-btn" @click.stop="installPWA">
        安装
      </button>
      <button class="close-btn" @click.stop="dismissInstall">
        ✕
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const showGuide = ref(false)
const showInstallBanner = ref(false)
const deferredPrompt = ref<any>(null)

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(registration) {
    console.log('Service Worker registered:', registration)
  },
  onRegisterError(error) {
    console.log('Service Worker register error:', error)
  }
})

onMounted(() => {
  const hasVisited = localStorage.getItem('hasVisitedBefore')
  const installDismissed = localStorage.getItem('installDismissed')

  if (!hasVisited) {
    setTimeout(() => {
      showGuide.value = true
      localStorage.setItem('hasVisitedBefore', 'true')
    }, 1000)
  }

  if (!installDismissed && 'ontouchstart' in window) {
    setTimeout(() => {
      showInstallBanner.value = true
      setTimeout(() => {
        showInstallBanner.value = false
      }, 8000)
    }, 3000)
  }
})

const closeGuide = () => {
  showGuide.value = false
}

const showInstallPrompt = () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
        showInstallBanner.value = false
        localStorage.setItem('installDismissed', 'true')
      }
      deferredPrompt.value = null
    })
  }
}

const installPWA = async () => {
  showInstallPrompt()
}

const dismissInstall = () => {
  showInstallBanner.value = false
  localStorage.setItem('installDismissed', 'true')
}
</script>

<style scoped>
.mobile-guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.guide-content {
  background: linear-gradient(180deg, rgba(26, 26, 46, 0.98) 0%, rgba(10, 10, 15, 0.98) 100%);
  border: 1px solid rgba(211, 0, 197, 0.3);
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 60px rgba(211, 0, 197, 0.3);
}

.guide-header {
  text-align: center;
  margin-bottom: 32px;
}

.guide-header .guide-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.guide-header h3 {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  font-family: 'Orbitron', sans-serif;
}

.guide-subtitle {
  font-size: 16px;
  color: #808080;
}

.guide-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.guide-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(45, 45, 68, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(5, 217, 232, 0.1);
}

.guide-icon-small {
  font-size: 32px;
  flex-shrink: 0;
}

.guide-text h4 {
  font-size: 18px;
  font-weight: 600;
  color: var(--neon-cyan);
  margin-bottom: 4px;
}

.guide-text p {
  font-size: 14px;
  color: #b0b0b0;
  line-height: 1.4;
}

.guide-tips {
  margin-bottom: 24px;
}

.tip-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 42, 109, 0.1);
  border: 1px solid rgba(255, 42, 109, 0.3);
  border-radius: 12px;
  font-size: 14px;
  color: #b0b0b0;
}

.tip-badge span:first-child {
  font-size: 24px;
}

.guide-close-btn {
  width: 100%;
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-purple));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.guide-close-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-pink);
}

.guide-close-btn .arrow {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.guide-close-btn:hover .arrow {
  transform: translateX(4px);
}

.install-banner {
  position: fixed;
  bottom: 20px;
  left: 16px;
  right: 16px;
  background: linear-gradient(180deg, rgba(26, 26, 46, 0.98) 0%, rgba(10, 10, 15, 0.98) 100%);
  border: 1px solid rgba(5, 217, 232, 0.3);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 0 40px rgba(5, 217, 232, 0.3);
  z-index: 999;
}

.banner-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.banner-text {
  flex: 1;
}

.banner-text h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--neon-cyan);
  margin-bottom: 4px;
}

.banner-text p {
  font-size: 12px;
  color: #808080;
}

.install-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}

.install-btn:hover {
  opacity: 0.9;
}

.close-btn {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #808080;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

@media (max-width: 640px) {
  .guide-content {
    padding: 24px 20px;
    margin: 16px;
  }

  .guide-header h3 {
    font-size: 24px;
  }

  .guide-item {
    padding: 14px;
  }

  .guide-icon-small {
    font-size: 28px;
  }

  .guide-text h4 {
    font-size: 16px;
  }

  .guide-text p {
    font-size: 13px;
  }
}
</style>
