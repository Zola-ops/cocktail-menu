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

    <div class="p-4 sm:p-5 -mt-4">
      <div class="flex items-start justify-between mb-3 sm:mb-4">
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-white">{{ cocktail.name }}</h3>
          <p class="text-sm sm:text-base text-slate-400">{{ cocktail.nameEn }}</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <button
            @click.stop="$emit('toggleFavorite', cocktail.id)"
            class="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-slate-700/50 transition text-xl"
          >
            {{ isFavorite ? '❤️' : '🤍' }}
          </button>
          <span
            :class="[
              'px-3 py-1.5 sm:px-2 sm:py-1 rounded-lg sm:rounded text-sm sm:text-xs font-medium',
              difficultyClass
            ]"
          >
            {{ difficultyLabel }}
          </span>
        </div>
      </div>

      <p v-if="cocktail.description" class="text-sm sm:text-base text-slate-300 mb-4 sm:mb-3 leading-relaxed">
        {{ cocktail.description }}
      </p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="base in cocktail.base"
          :key="base"
          class="tag-base px-3 py-1 rounded sm:px-2 sm:py-0.5 sm:text-xs"
        >
          {{ base }}
        </span>
        <span
          v-for="taste in cocktail.taste.slice(0, 2)"
          :key="taste"
          class="tag-taste px-3 py-1 rounded sm:px-2 sm:py-0.5 sm:text-xs"
        >
          {{ taste }}
        </span>
      </div>

      <div v-if="cocktail.isCustom" class="mt-4 sm:mt-3 flex items-center gap-2">
        <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg sm:px-2 sm:py-0.5 sm:text-xs">
          自定义
        </span>
        <button
          @click.stop="$emit('delete', cocktail.id)"
          class="text-red-400 hover:text-red-300 text-sm sm:text-xs"
        >
          删除
        </button>
      </div>

      <div v-if="cocktail.tags && cocktail.tags.length > 0" class="mt-4 sm:mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in cocktail.tags.slice(0, 2)"
          :key="tag"
          class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg sm:px-2 sm:py-0.5 sm:text-xs"
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
