<template>
  <div
    @click="$emit('click')"
    class="cocktail-card rounded-xl p-4 cursor-pointer fade-in"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="text-lg font-bold text-white">{{ cocktail.name }}</h3>
        <p class="text-sm text-slate-400">{{ cocktail.nameEn }}</p>
      </div>
      <span
        :class="[
          'px-2 py-1 rounded text-xs font-medium',
          difficultyClass
        ]"
      >
        {{ difficultyLabel }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="cocktail.description" class="text-sm text-slate-300 mb-3 line-clamp-2">
      {{ cocktail.description }}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5">
      <span
        v-for="base in cocktail.base"
        :key="base"
        class="tag-base px-2 py-0.5 rounded text-xs"
      >
        {{ base }}
      </span>
      <span
        v-for="taste in cocktail.taste.slice(0, 3)"
        :key="taste"
        class="tag-taste px-2 py-0.5 rounded text-xs"
      >
        {{ taste }}
      </span>
    </div>

    <!-- Custom Badge -->
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Cocktail } from '../types/cocktail'

const props = defineProps<{
  cocktail: Cocktail
}>()

defineEmits<{
  'click': []
  'delete': [id: string]
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
