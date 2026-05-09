<template>
  <div
    class="relative overflow-hidden rounded-lg bg-slate-800/50"
    :class="aspectRatioClass"
  >
    <img
      v-if="imageUrl && !imageError"
      :src="imageUrl"
      :alt="cocktailName"
      class="absolute inset-0 w-full h-full object-cover"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div
      v-if="!imageUrl || imageError"
      class="absolute inset-0 flex flex-col items-center justify-center"
    >
      <span class="text-5xl mb-2">{{ iconEmoji }}</span>
      <span v-if="showLabel" class="text-xs text-slate-400">{{ iconLabel }}</span>
    </div>
    <div
      v-if="imageUrl && !imageError && imageLoaded"
      class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BaseSpirit } from '../types/cocktail'

const props = withDefaults(defineProps<{
  imageUrl?: string
  cocktailName: string
  base: BaseSpirit[]
  showLabel?: boolean
  aspectRatio?: 'square' | 'video' | 'portrait'
}>(), {
  showLabel: true,
  aspectRatio: 'square',
})

const imageError = ref(false)
const imageLoaded = ref(false)

const aspectRatioClass = computed(() => {
  switch (props.aspectRatio) {
    case 'video': return 'aspect-video'
    case 'portrait': return 'aspect-[3/4]'
    default: return 'aspect-square'
  }
})

const iconEmoji = computed(() => {
  const baseEmojis: Record<string, string> = {
    '威士忌': '🥃',
    '金酒': '🍸',
    '朗姆酒': '🍹',
    '龙舌兰': '🌵',
    '伏特加': '🧊',
    '白兰地': '🍷',
    '无酒精': '🥤',
    '清酒': '🍶',
    '梅酒': '🍾',
    '雪利酒': '🍷',
    '波特酒': '🍷',
    '开胃酒': '🍹',
  }

  const primaryBase = props.base[0]
  return baseEmojis[primaryBase] || '🍸'
})

const iconLabel = computed(() => {
  const baseLabels: Record<string, string> = {
    '威士忌': 'Whiskey',
    '金酒': 'Gin',
    '朗姆酒': 'Rum',
    '龙舌兰': 'Tequila',
    '伏特加': 'Vodka',
    '白兰地': 'Brandy',
    '无酒精': 'Mocktail',
    '清酒': 'Sake',
    '梅酒': 'Umeshu',
    '雪利酒': 'Sherry',
    '波特酒': 'Port',
    '开胃酒': 'Aperitif',
  }

  const primaryBase = props.base[0]
  return baseLabels[primaryBase] || 'Cocktail'
})

function handleImageError() {
  imageError.value = true
}

function handleImageLoad() {
  imageLoaded.value = true
}
</script>

<style scoped>
img {
  transition: transform 0.3s ease;
}

div:hover img {
  transform: scale(1.05);
}
</style>
