<template>
  <div class="container mx-auto px-4 py-4">
    <!-- Base Spirits -->
    <div class="mb-4">
      <div class="text-sm text-slate-400 mb-2">基酒</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="base in baseSpirits"
          :key="base"
          @click="$emit('update:bases', toggle(base, bases))"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition',
            bases.includes(base)
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ getBaseEmoji(base) }} {{ base }}
        </button>
      </div>
    </div>

    <!-- Taste Tags -->
    <div class="mb-4">
      <div class="text-sm text-slate-400 mb-2">口味</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="taste in tasteTags"
          :key="taste"
          @click="$emit('update:tastes', toggle(taste, tastes))"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition',
            tastes.includes(taste)
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ getTasteEmoji(taste) }} {{ taste }}
        </button>
      </div>
    </div>

    <!-- Difficulty -->
    <div class="flex items-center gap-4">
      <div class="text-sm text-slate-400">难度</div>
      <div class="flex gap-2">
        <button
          v-for="diff in difficulties"
          :key="diff.value"
          @click="$emit('update:difficulty', toggle(diff.value, difficulty))"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition',
            difficulty.includes(diff.value)
              ? 'bg-purple-500 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ diff.label }}
        </button>
      </div>

      <!-- Clear Button -->
      <button
        v-if="hasFilters"
        @click="$emit('clear')"
        class="ml-auto px-3 py-1.5 text-sm text-slate-400 hover:text-white transition"
      >
        清除筛选
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseSpirit, TasteTag } from '../types/cocktail'
import { baseSpirits, tasteTags } from '../data/cocktails'

const props = defineProps<{
  bases: BaseSpirit[]
  tastes: TasteTag[]
  difficulty: string[]
}>()

const emit = defineEmits<{
  'update:bases': [value: BaseSpirit[]]
  'update:tastes': [value: TasteTag[]]
  'update:difficulty': [value: string[]]
  'clear': []
}>()

const difficulties = [
  { value: 'easy', label: '⭐ 简单' },
  { value: 'medium', label: '⭐⭐ 中等' },
  { value: 'hard', label: '⭐⭐⭐ 困难' },
]

const hasFilters = computed(() => {
  return props.bases.length > 0 || props.tastes.length > 0 || props.difficulty.length > 0
})

function toggle<T>(item: T, list: T[]): T[] {
  const index = list.indexOf(item)
  if (index === -1) {
    return [...list, item]
  } else {
    return list.filter((_, i) => i !== index)
  }
}

function getBaseEmoji(base: string): string {
  const emojis: Record<string, string> = {
    '威士忌': '🥃',
    '金酒': '🍸',
    '朗姆酒': '🍹',
    '龙舌兰': '🌵',
    '伏特加': '🧊',
    '白兰地': '🍷',
    '无酒精': '🥤',
  }
  return emojis[base] || '🍸'
}

function getTasteEmoji(taste: string): string {
  const emojis: Record<string, string> = {
    '甜': '🍬',
    '酸': '🍋',
    '苦': '☕',
    '果味': '🍊',
    '草本': '🌿',
    '奶香': '🥛',
    '气泡': '🫧',
    '咸': '🧂',
    '辣': '🌶️',
    '茶香': '🍵',
  }
  return emojis[taste] || '👅'
}
</script>
