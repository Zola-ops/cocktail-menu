<template>
  <div class="container mx-auto px-4 py-4">
    <div class="mb-4">
      <div class="text-sm text-slate-400 mb-2">基酒</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="base in baseSpirits"
          :key="base"
          @click="toggleBase(base)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition',
            props.bases.includes(base as BaseSpirit)
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ getBaseEmoji(base) }} {{ base }}
        </button>
      </div>
    </div>

    <div class="mb-4">
      <div class="text-sm text-slate-400 mb-2">口味</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="taste in tasteTags"
          :key="taste"
          @click="toggleTaste(taste)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition',
            props.tastes.includes(taste as TasteTag)
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ getTasteEmoji(taste) }} {{ taste }}
        </button>
      </div>
    </div>

    <!-- Special Tags -->
    <div class="mb-4">
      <div class="text-sm text-slate-400 mb-2">特色标签</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in specialTags"
          :key="tag"
          @click="toggleSpecialTag(tag)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition',
            props.specialTags.includes(tag)
              ? 'bg-purple-500 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ getTagEmoji(tag) }} {{ tag }}
        </button>
      </div>
    </div>

    <!-- Difficulty, Sort and Quick Filters -->
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-4">
        <div class="text-sm text-slate-400">难度</div>
        <div class="flex gap-2">
          <button
            v-for="diff in difficulties"
            :key="diff.value"
            @click="toggleDifficulty(diff.value)"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition',
              props.difficulty.includes(diff.value)
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            ]"
          >
            {{ diff.label }}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="text-sm text-slate-400">排序</div>
        <select
          :value="sortBy"
          @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
          class="px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 focus:outline-none focus:border-orange-500/50"
        >
          <option value="name">按名称</option>
          <option value="difficulty">按难度</option>
          <option value="createdAt">按添加时间</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="showFavorites"
          @click="$emit('update:showFavorites', false)"
          class="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-sm font-medium hover:bg-red-500/30 transition"
        >
          ❤️ 我的收藏
        </button>
        <button
          v-if="showCustomOnly"
          @click="$emit('update:showCustomOnly', false)"
          class="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium hover:bg-blue-500/30 transition"
        >
          ✨ 我的创作
        </button>
      </div>

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
import { baseSpirits, tasteTags, specialTags } from '../data/cocktails'

const props = defineProps<{
  bases: BaseSpirit[]
  tastes: TasteTag[]
  difficulty: string[]
  specialTags: string[]
  sortBy: string
  showFavorites: boolean
  showCustomOnly: boolean
}>()

const emit = defineEmits<{
  'update:bases': [value: BaseSpirit[]]
  'update:tastes': [value: TasteTag[]]
  'update:difficulty': [value: string[]]
  'update:specialTags': [value: string[]]
  'update:sortBy': [value: string]
  'update:showFavorites': [value: boolean]
  'update:showCustomOnly': [value: boolean]
  'clear': []
}>()

const difficulties = [
  { value: 'easy', label: '⭐ 简单' },
  { value: 'medium', label: '⭐⭐ 中等' },
  { value: 'hard', label: '⭐⭐⭐ 困难' },
]

const hasFilters = computed(() => {
  return props.bases.length > 0 || props.tastes.length > 0 || props.difficulty.length > 0 || props.specialTags.length > 0
})

function toggleBase(base: string) {
  const newBases = props.bases.includes(base as BaseSpirit)
    ? props.bases.filter(b => b !== base)
    : [...props.bases, base as BaseSpirit]
  emit('update:bases', newBases)
}

function toggleTaste(taste: string) {
  const newTastes = props.tastes.includes(taste as TasteTag)
    ? props.tastes.filter(t => t !== taste)
    : [...props.tastes, taste as TasteTag]
  emit('update:tastes', newTastes)
}

function toggleSpecialTag(tag: string) {
  const newTags = props.specialTags.includes(tag)
    ? props.specialTags.filter(t => t !== tag)
    : [...props.specialTags, tag]
  emit('update:specialTags', newTags)
}

function toggleDifficulty(diff: string) {
  const newDifficulty = props.difficulty.includes(diff)
    ? props.difficulty.filter(d => d !== diff)
    : [...props.difficulty, diff]
  emit('update:difficulty', newDifficulty)
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
    '泥煤味': '💨',
  }
  return emojis[taste] || '👅'
}

function getTagEmoji(tag: string): string {
  const emojis: Record<string, string> = {
    '经典': '🏆',
    '网红': '🔥',
    '派对': '🎉',
    '热带': '🌴',
    '早午餐': '🍳',
    '庆祝': '🥂',
    '现代': '✨',
    '简单': '👌',
    '烈酒': '💪',
    '咖啡': '☕',
    '果味': '🍊',
    '烟熏': '🔥',
    '历史': '📜',
    '优雅': '💃',
    '意式': '🇮🇹',
    '法式': '🇫🇷',
    '美式': '🇺🇸',
    '日式': '🇯🇵',
    '南美': '🌎',
    '海军': '⚓',
    '禁酒令': '🚫',
  }
  return emojis[tag] || '🏷️'
}
</script>
