<template>
  <div
    @click="$emit('click')"
    class="cocktail-card rounded-xl overflow-hidden cursor-pointer fade-in group"
  >
    <div class="relative overflow-hidden">
      <CocktailImage
        :imageUrl="cocktail.image"
        :cocktailName="cocktail.name"
        :base="cocktail.base"
        class="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div class="absolute top-3 right-3 flex flex-col gap-2">
        <button
          @click.stop="$emit('toggleFavorite', cocktail.id)"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-[var(--neon-pink)]/30 transition-all duration-300 text-xl"
        >
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
      </div>
      <div class="absolute bottom-3 left-3">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm',
            difficultyClass
          ]"
        >
          {{ difficultyLabel }}
        </span>
      </div>
    </div>

    <div class="p-5 bg-gradient-to-b from-cyber-dark-3 to-cyber-dark" style="min-height: 180px;">
      <div class="flex flex-col" style="height: 100%;">
        <div class="flex flex-col mb-3">
          <h3 class="text-xl font-bold text-white mb-0.5 tracking-wide leading-tight">
            {{ cocktail.name }}
          </h3>
          <p class="text-sm text-slate-400 tracking-wide leading-snug">
            {{ cocktail.nameEn }}
          </p>
        </div>

        <p v-if="cocktail.description" class="text-sm text-slate-300 mb-3 leading-relaxed line-clamp-2 flex-shrink-0">
          {{ cocktail.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-auto items-start">
          <span
            v-for="base in cocktail.base"
            :key="base"
            class="tag-base inline-flex items-center justify-center"
          >
            {{ base }}
          </span>
          <span
            v-for="taste in cocktail.taste.slice(0, 2)"
            :key="taste"
            class="tag-taste inline-flex items-center justify-center"
          >
            {{ taste }}
          </span>
        </div>

        <div v-if="cocktail.isCustom" class="flex items-center gap-3 pt-3 border-t border-cyber-gray/50 mt-3">
          <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium inline-flex items-center justify-center">
            自定义
          </span>
          <button
            @click.stop="$emit('delete', cocktail.id)"
            class="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            删除
          </button>
        </div>

        <div v-if="cocktail.tags && cocktail.tags.length > 0 && !cocktail.isCustom" class="flex flex-wrap gap-2 pt-3 border-t border-cyber-gray/50 mt-3">
          <span
            v-for="tag in cocktail.tags.slice(0, 2)"
            :key="tag"
            class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium inline-flex items-center justify-center"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Cocktail } from '../types/cocktail'
import CocktailImage from './CocktailImage.vue'

const props = defineProps<{
  cocktail: Cocktail
  isFavorite: boolean
}>()

defineEmits<{
  'click': []
  'delete': [id: string]
  'toggleFavorite': [id: string]
}>()

const difficultyLabel = computed(() => {
  switch (props.cocktail.difficulty) {
    case 'easy': return '简单'
    case 'medium': return '中等'
    case 'hard': return '困难'
    default: return '简单'
  }
})

const difficultyClass = computed(() => {
  switch (props.cocktail.difficulty) {
    case 'easy': return 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
    case 'medium': return 'bg-amber-500/30 text-amber-400 border border-amber-500/50'
    case 'hard': return 'bg-red-500/30 text-red-400 border border-red-500/50'
    default: return 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
  }
})
</script>