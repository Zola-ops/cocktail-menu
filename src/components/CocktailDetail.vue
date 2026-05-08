<template>
  <div 
    class="detail-modal-overlay"
    @click.self="$emit('close')"
  >
    <div class="absolute inset-0 bg-black/70" @click="$emit('close')"></div>
    
    <div class="detail-modal-content fade-in-scale">
      <div class="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2">
          <div class="flex-1 min-w-0">
            <h2 class="text-lg sm:text-2xl font-bold text-white truncate">{{ cocktail.name }}</h2>
            <p class="text-xs sm:text-sm text-slate-400 truncate">{{ cocktail.nameEn }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="$emit('toggleFavorite', cocktail.id)"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-xl transition"
            >
              {{ isFavorite ? '❤️' : '🤍' }}
            </button>
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
      </div>

      <div class="px-6 py-6 space-y-5">
        <div v-if="cocktail.image" class="rounded-xl overflow-hidden">
          <img 
            :src="cocktail.image" 
            :alt="cocktail.name"
            class="w-full h-48 sm:h-56 object-cover"
          />
        </div>
        
        <div v-if="cocktail.description" class="text-slate-300 text-sm sm:text-base">
          {{ cocktail.description }}
        </div>

        <div class="flex flex-wrap gap-2">
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
          <span class="px-3 py-1 rounded-full text-sm bg-slate-700/50 text-slate-300">
            {{ difficultyLabel }}
          </span>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>🧪</span> 配方
          </h3>
          <div class="bg-slate-800/50 rounded-xl p-4">
            <div
              v-for="(ingredient, index) in cocktail.ingredients"
              :key="index"
              class="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0"
            >
              <span class="text-slate-300">{{ ingredient.name }}</span>
              <span class="text-orange-400 font-medium">{{ ingredient.amount }}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>📝</span> 制作步骤
          </h3>
          <div class="space-y-3">
            <div
              v-for="(step, index) in cocktail.steps"
              :key="index"
              class="flex gap-3"
            >
              <div class="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
                {{ index + 1 }}
              </div>
              <p class="text-slate-300">{{ step }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div v-if="cocktail.glass" class="bg-slate-800/50 rounded-xl p-4">
            <div class="text-sm text-slate-400 mb-1">杯型</div>
            <div class="text-white font-medium">{{ cocktail.glass }}</div>
          </div>
          <div v-if="cocktail.garnish" class="bg-slate-800/50 rounded-xl p-4">
            <div class="text-sm text-slate-400 mb-1">装饰</div>
            <div class="text-white font-medium">{{ cocktail.garnish }}</div>
          </div>
        </div>

        <div v-if="cocktail.tags && cocktail.tags.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="tag in cocktail.tags"
            :key="tag"
            class="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400"
          >
            #{{ tag }}
          </span>
        </div>

        <div v-if="cocktail.isCustom" class="pt-4 border-t border-slate-700/50">
          <button
            @click="$emit('delete', cocktail.id)"
            class="w-full py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition font-medium"
          >
            删除这款自定义调酒
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Cocktail } from '../types/cocktail'

const props = defineProps<{
  cocktail: Cocktail
  isFavorite: boolean
}>()

defineEmits<{
  'close': []
  'delete': [id: string]
  'toggleFavorite': [id: string]
}>()

const difficultyLabel = computed(() => {
  switch (props.cocktail.difficulty) {
    case 'easy': return '⭐ 简单'
    case 'medium': return '⭐⭐ 中等'
    case 'hard': return '⭐⭐⭐ 困难'
    default: return '⭐ 简单'
  }
})
</script>
