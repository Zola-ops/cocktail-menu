<template>
  <div class="detail-modal-overlay" @click.self="$emit('close')">
    <div class="detail-modal-content fade-in-scale">
      <div class="sticky top-0 z-10 bg-cyber-dark/95 backdrop-blur-xl border-b border-cyber-gray/30 px-6 py-4">
        <div class="flex items-start gap-4">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold text-white truncate tracking-wide">{{ cocktail.name }}</h2>
            <p class="text-sm text-slate-400 truncate tracking-wide">{{ cocktail.nameEn }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="$emit('toggleFavorite', cocktail.id)"
              class="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--neon-pink)]/20 hover:bg-[var(--neon-pink)]/30 transition-all duration-300 text-xl hover:scale-110"
            >
              {{ isFavorite ? '❤️' : '🤍' }}
            </button>
            <button
              @click="$emit('close')"
              class="w-11 h-11 flex items-center justify-center rounded-full bg-cyber-gray/50 hover:bg-cyber-gray transition-all duration-300 text-white hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div class="px-6 py-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
        <div v-if="cocktail.image" class="relative rounded-xl overflow-hidden">
          <img 
            :src="cocktail.image" 
            :alt="cocktail.name"
            class="w-full h-56 sm:h-64 object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div v-if="cocktail.description" class="text-slate-300 text-base leading-relaxed bg-cyber-dark-2/50 rounded-xl p-5 border border-cyber-gray/30">
          {{ cocktail.description }}
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="base in cocktail.base"
            :key="base"
            class="tag-base"
          >
            {{ base }}
          </span>
          <span
            v-for="taste in cocktail.taste"
            :key="taste"
            class="tag-taste"
          >
            {{ taste }}
          </span>
        </div>

        <div class="section-card">
          <div class="section-card-header">
            <span class="text-lg">🧪</span>
            <h3 class="section-card-title">配方</h3>
          </div>
          <div class="space-y-3">
            <div
              v-for="(ingredient, index) in cocktail.ingredients"
              :key="index"
              class="flex items-center justify-between py-3 px-4 bg-cyber-dark/50 rounded-lg border border-cyber-gray/20 hover:border-[var(--neon-pink)]/30 transition-colors"
            >
              <span class="text-slate-200 font-medium">{{ ingredient.name }}</span>
              <span class="text-[var(--neon-pink)] font-mono font-semibold">{{ ingredient.amount }}</span>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-card-header">
            <span class="text-lg">📝</span>
            <h3 class="section-card-title">制作步骤</h3>
          </div>
          <div class="space-y-4">
            <div
              v-for="(step, index) in cocktail.steps"
              :key="index"
              class="flex gap-4"
            >
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center text-sm font-bold text-white shadow-[var(--glow-cyan)]">
                {{ index + 1 }}
              </span>
              <p class="text-slate-200 leading-relaxed pt-1">{{ step }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div v-if="cocktail.glass" class="section-card">
            <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">杯型</div>
            <div class="text-white font-semibold text-lg">{{ cocktail.glass }}</div>
          </div>
          <div v-if="cocktail.garnish" class="section-card">
            <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">装饰</div>
            <div class="text-white font-semibold text-lg">{{ cocktail.garnish }}</div>
          </div>
        </div>

        <div v-if="cocktail.isCustom" class="pt-4 border-t border-cyber-gray/30">
          <button
            @click="$emit('delete', cocktail.id)"
            class="w-full px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,82,82,0.3)]"
            style="font-family: 'Orbitron', monospace;"
          >
            🗑️ 删除这款自定义调酒
          </button>
        </div>

        <div class="pt-4 border-t border-cyber-gray/30">
          <button
            v-if="!showShareCard"
            @click="showShareCard = true"
            class="w-full px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-[var(--neon-pink)]/15 to-[var(--neon-purple)]/15 hover:from-[var(--neon-pink)]/25 hover:to-[var(--neon-purple)]/25 text-[var(--neon-pink)] border border-[var(--neon-pink)]/30 hover:border-[var(--neon-pink)]/50 hover:shadow-[0_0_20px_rgba(255,42,109,0.3)]"
            style="font-family: 'Orbitron', monospace;"
          >
            📤 分享这款调酒
          </button>
          <div v-else>
            <button
              @click="showShareCard = false"
              class="w-full px-5 py-3 rounded-xl font-semibold transition-all duration-300 mb-4 bg-cyber-gray/50 hover:bg-cyber-gray text-slate-300 border border-cyber-gray/50 hover:border-cyber-gray"
              style="font-family: 'Orbitron', monospace;"
            >
              ✕ 收起分享卡片
            </button>
            <ShareCard :cocktail="cocktail" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cocktail } from '../types/cocktail'
import ShareCard from './ShareCard.vue'
import { ref } from 'vue'

const props = defineProps<{
  cocktail: Cocktail
  isFavorite: boolean
}>()

defineEmits<{
  'close': []
  'delete': [id: string]
  'toggleFavorite': [id: string]
}>()

const showShareCard = ref(false)
</script>