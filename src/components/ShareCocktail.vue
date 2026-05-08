<template>
  <div class="fixed inset-0 z-50 modal-overlay" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto modal-content rounded-t-3xl slide-up">
      <div class="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">分享调酒</h2>
          <button
            @click="$emit('close')"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="px-6 py-6 space-y-6">
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6">
          <div class="text-center mb-4">
            <h3 class="text-2xl font-bold text-white mb-1">{{ cocktail.name }}</h3>
            <p class="text-slate-400 text-sm">{{ cocktail.nameEn }}</p>
          </div>

          <div class="flex justify-center mb-4">
            <CocktailImage
              :imageUrl="cocktail.image"
              :cocktailName="cocktail.name"
              :base="cocktail.base"
              :showLabel="false"
              class="w-48 h-48"
            />
          </div>

          <div class="flex flex-wrap justify-center gap-2 mb-4">
            <span
              v-for="base in cocktail.base"
              :key="base"
              class="tag-base px-3 py-1 rounded-full text-sm"
            >
              {{ base }}
            </span>
            <span
              v-for="taste in cocktail.taste"
              :key="taste"
              class="tag-taste px-3 py-1 rounded-full text-sm"
            >
              {{ taste }}
            </span>
          </div>

          <p v-if="cocktail.description" class="text-slate-300 text-sm text-center mb-4">
            {{ cocktail.description }}
          </p>

          <div class="border-t border-slate-700 pt-4">
            <div class="text-xs text-slate-500 text-center">
              🍸 调酒菜单 | Cocktail Menu
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <button
            @click="copyToClipboard"
            class="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {{ copied ? '已复制!' : '复制配方文本' }}
          </button>

          <button
            @click="shareToWechat"
            class="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.348 2.662c1.687-.009 3.013.581 3.013.581a2.533 2.533 0 01-.178.388c-.564.954-1.536 1.353-2.513 1.669-.192.063-.38.12-.56.188-.06.022-.118.045-.177.066-.017-.026-.035-.055-.05-.078-.59-.885-.588-1.854-.59-1.854-.317-.019-.639-.038-.945-.06zm-9.161 3.05c.536 0 .972.44.972.983a.976.976 0 01-.972.983.976.976 0 01-.972-.983c0-.542.436-.983.972-.983zm4.656 0c.536 0 .972.44.972.983a.976.976 0 01-.972.983.976.976 0 01-.972-.983c0-.542.436-.983.972-.983zm4.003.781c.107.291.158.596.158.901a3.046 3.046 0 01-3.046 3.046 3.046 3.046 0 01-3.046-3.046c0-.305.051-.61.158-.901a2.814 2.814 0 011.365 2.166c0 .997-.807 1.805-1.805 1.805a1.797 1.797 0 01-1.796-1.795c0-.772.467-1.433 1.134-1.667-.026-.166-.04-.336-.04-.508 0-1.32 1.127-2.545 2.68-2.545.342 0 .672.06.981.174.307.114.585.277.822.48a2.55 2.55 0 011.383-.654c.39 0 .759.087 1.091.25.326.16.61.39.837.673.227.283.407.618.53.988zm-8.514.188c1.23 0 2.227.996 2.227 2.225a2.22 2.22 0 01-2.227 2.225 2.22 2.22 0 01-2.227-2.225c0-1.229.996-2.225 2.227-2.225zm6.113 0c1.23 0 2.227.996 2.227 2.225a2.22 2.22 0 01-2.227 2.225 2.22 2.22 0 01-2.227-2.225c0-1.229.996-2.225 2.227-2.225z"/>
            </svg>
            分享到微信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Cocktail } from '../types/cocktail'
import CocktailImage from './CocktailImage.vue'

const props = defineProps<{
  cocktail: Cocktail
}>()

const emit = defineEmits<{
  'close': []
}>()

const copied = ref(false)

function copyToClipboard() {
  const text = `
🍸 ${props.cocktail.name} (${props.cocktail.nameEn})

${props.cocktail.description || ''}

📋 配方：
${props.cocktail.ingredients.map(ing => `• ${ing.name} - ${ing.amount}`).join('\n')}

📝 步骤：
${props.cocktail.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

${props.cocktail.glass ? `🥃 杯型: ${props.cocktail.glass}` : ''}
${props.cocktail.garnish ? `✨ 装饰: ${props.cocktail.garnish}` : ''}

🏷️ ${props.cocktail.base.join(', ')} | ${props.cocktail.taste.join(', ')}
  `.trim()

  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

function shareToWechat() {
  const text = `${props.cocktail.name} (${props.cocktail.nameEn}) - ${props.cocktail.description || '经典调酒配方'}`

  if (navigator.share) {
    navigator.share({
      title: props.cocktail.name,
      text: text,
    })
  } else {
    copyToClipboard()
  }
}
</script>
