<template>
  <div
    @click="$emit('click')"
    class="cocktail-card rounded-xl overflow-hidden cursor-pointer fade-in"
  >
    <CocktailImage
      :imageUrl="cocktail.image"
      :cocktailName="cocktail.name"
      :base="cocktail.base"
      class="mb-3"
    />

    <div class="p-4 -mt-4">
      <div class="flex items-start justify-between mb-2">
        <div>
          <h3 class="text-lg font-bold text-white">{{ cocktail.name }}</h3>
          <p class="text-sm text-slate-400">{{ cocktail.nameEn }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click.stop="$emit('toggleFavorite', cocktail.id)"
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700/50 transition"
          >
            {{ isFavorite ? '❤️' : '🤍' }}
          </button>
          <span
            :class="[
              'px-2 py-1 rounded text-xs font-medium',
              difficultyClass
            ]"
          >
            {{ difficultyLabel }}
          </span>
        </div>
      </div>

      <p v-if="cocktail.description" class="text-sm text-slate-300 mb-3 line-clamp-2">
        {{ cocktail.description }}
      </p>

      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="base in cocktail.base"
          :key="base"
          class="tag-base px-2 py-0.5 rounded text-xs"
        >
          {{ base }}
        </span>
        <span
          v-for="taste in cocktail.taste.slice(0, 2)"
          :key="taste"
          class="tag-taste px-2 py-0.5 rounded text-xs"
        >
          {{ taste }}
        </span>
      </div>

      <div v-if="cocktail.isCustom" class="mt-3 flex items-center gap-2">
        <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
          自定义
        </span>
        <button
          @click.stop="$emit('delete', cocktail.id)"
          class="text-red-400 hover:text-red-300 text-xs"
        >
          删除
        </button>
      </div>

      <div v-if="cocktail.tags && cocktail.tags.length > 0" class="mt-3 flex flex-wrap gap-1">
        <span
          v-for="tag in cocktail.tags.slice(0, 2)"
          :key="tag"
          class="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs"
        >
          {{ tag }}
        </span>
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
    case 'easy': return 'bg-emerald-500/20 text-emerald-400'
    case 'medium': return 'bg-amber-500/20 text-amber-400'
    case 'hard': return 'bg-red-500/20 text-red-400'
    default: return 'bg-emerald-500/20 text-emerald-400'
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
