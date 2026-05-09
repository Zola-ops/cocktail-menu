<template>
  <div class="detail-modal-overlay" @click.self="$emit('close')">
    <div class="detail-modal-content fade-in-scale">
      <div class="detail-header-gradient"></div>
      
      <div class="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 px-5 sm:px-6 py-4 sm:py-4">
        <div class="flex items-start gap-4">
          <div class="flex-1 min-w-0">
            <h2 class="text-xl sm:text-2xl font-bold text-white truncate">{{ cocktail.name }}</h2>
            <p class="text-sm sm:text-sm text-slate-400 truncate">{{ cocktail.nameEn }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="$emit('toggleFavorite', cocktail.id)"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--neon-pink)]/20 hover:bg-[var(--neon-pink)]/30 transition text-xl"
            >
              {{ isFavorite ? '❤️' : '🤍' }}
            </button>
            <button
              @click="$emit('close')"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-700 transition text-white"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div class="px-5 sm:px-6 py-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
        <div v-if="cocktail.image" class="relative rounded-xl overflow-hidden">
          <img 
            :src="cocktail.image" 
            :alt="cocktail.name"
            class="w-full h-48 sm:h-64 object-cover"
          />
        </div>

        <div v-if="cocktail.description" class="text-slate-300 text-base sm:text-base leading-relaxed">
          {{ cocktail.description }}
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="base in cocktail.base"
            :key="base"
            class="tag-base px-3 py-1 rounded"
          >
            {{ base }}
          </span>
          <span
            v-for="taste in cocktail.taste"
            :key="taste"
            class="tag-taste px-3 py-1 rounded"
          >
            {{ taste }}
          </span>
        </div>

        <div class="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700/50">
          <h3 class="text-base sm:text-lg font-bold text-[var(--neon-cyan)] mb-4" style="font-family: 'Orbitron', monospace;">
            🧪 配方
          </h3>
          <div class="space-y-3">
            <div
              v-for="(ingredient, index) in cocktail.ingredients"
              :key="index"
              class="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-b-0"
            >
              <span class="text-slate-300">{{ ingredient.name }}</span>
              <span class="text-[var(--neon-pink)] font-mono">{{ ingredient.amount }}</span>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700/50">
          <h3 class="text-base sm:text-lg font-bold text-[var(--neon-cyan)] mb-4" style="font-family: 'Orbitron', monospace;">
            📝 制作步骤
          </h3>
          <div class="space-y-4">
            <div
              v-for="(step, index) in cocktail.steps"
              :key="index"
              class="flex gap-3"
            >
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] flex items-center justify-center text-sm font-bold">
                {{ index + 1 }}
              </span>
              <p class="text-slate-300 leading-relaxed pt-1">{{ step }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div v-if="cocktail.glass" class="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <div class="text-xs text-slate-500 mb-1">杯型</div>
            <div class="text-white font-medium">{{ cocktail.glass }}</div>
          </div>
          <div v-if="cocktail.garnish" class="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <div class="text-xs text-slate-500 mb-1">装饰</div>
            <div class="text-white font-medium">{{ cocktail.garnish }}</div>
          </div>
        </div>

        <div v-if="cocktail.isCustom" class="pt-4 border-t border-slate-700/50">
          <button
            @click="$emit('delete', cocktail.id)"
            class="w-full px-4 py-3 rounded-lg font-medium transition bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500"
            style="font-family: 'Orbitron', monospace;"
          >
            🗑️ 删除这款自定义调酒
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cocktail } from '../types/cocktail'

defineProps<{
  cocktail: Cocktail
  isFavorite: boolean
}>()

defineEmits<{
  'close': []
  'delete': [id: string]
  'toggleFavorite': [id: string]
}>()
</script>
