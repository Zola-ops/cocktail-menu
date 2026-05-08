<template>
  <div class="container mx-auto px-4 py-3 sm:py-4">
    <button
      class="sm:hidden w-full flex items-center justify-between py-3 text-sm text-neon-cyan hover:text-neon-pink transition-all"
      @click="isExpanded = !isExpanded"
    >
      <span class="glow-text-cyan" style="font-family: 'Orbitron', monospace; letter-spacing: 2px;">&gt; 筛选条件</span>
      <span class="text-neon-pink text-lg">▼</span>
    </button>

    <div class="overflow-hidden transition-all duration-300" :class="isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 sm:max-h-[1000px] sm:opacity-100'">
      <div class="mb-3 sm:mb-4">
        <div class="text-xs sm:text-sm text-neon-pink glow-text-pink mb-2" style="font-family: 'Orbitron', monospace; letter-spacing: 1px;">
          <span class="text-neon-cyan glow-text-cyan">//</span> 基酒选择
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="base in baseSpirits"
            :key="base"
            @click="toggleBase(base)"
            :class="[
              'tag-btn',
              props.bases.includes(base as BaseSpirit) ? 'active' : ''
            ]"
          >
            {{ getBaseEmoji(base) }} {{ base }}
          </button>
        </div>
      </div>

      <div class="mb-3 sm:mb-4">
        <div class="text-xs sm:text-sm text-neon-pink glow-text-pink mb-2" style="font-family: 'Orbitron', monospace; letter-spacing: 1px;">
          <span class="text-neon-cyan glow-text-cyan">//</span> 口味标签
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="taste in tasteTags"
            :key="taste"
            @click="toggleTaste(taste)"
            :class="[
              'tag-btn',
              props.tastes.includes(taste as TasteTag) ? 'active' : ''
            ]"
          >
            {{ getTasteEmoji(taste) }} {{ taste }}
          </button>
        </div>
      </div>

      <div class="mb-3 sm:mb-4">
        <div class="text-xs sm:text-sm text-neon-pink glow-text-pink mb-2" style="font-family: 'Orbitron', monospace; letter-spacing: 1px;">
          <span class="text-neon-cyan glow-text-cyan">//</span> 特色标签
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in specialTags"
            :key="tag"
            @click="toggleSpecialTag(tag)"
            :class="[
<<<<<<< HEAD
              'option-btn',
              props.specialTags.includes(tag) ? 'active' : ''
=======
              'px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition border',
              props.specialTags.includes(tag)
                ? 'bg-purple-500 text-white border-purple-400/50 shadow-lg shadow-purple-500/20'
                : 'bg-slate-700/70 text-slate-200 border-slate-600/50 hover:bg-slate-600/80 hover:text-white hover:border-slate-500'
>>>>>>> main
            ]"
          >
            {{ getTagEmoji(tag) }} {{ tag }}
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-3">
          <div class="text-xs sm:text-sm text-neon-pink glow-text-pink" style="font-family: 'Orbitron', monospace; letter-spacing: 1px;">
            <span class="text-neon-cyan glow-text-cyan">//</span> 难度
          </div>
          <div class="flex gap-2">
            <button
              v-for="diff in difficulties"
              :key="diff.value"
              @click="toggleDifficulty(diff.value)"
              :class="[
<<<<<<< HEAD
                'option-btn',
                props.difficulty.includes(diff.value) ? 'active' : ''
=======
                'px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition border',
                props.difficulty.includes(diff.value)
                  ? 'bg-purple-500 text-white border-purple-400/50 shadow-lg shadow-purple-500/20'
                  : 'bg-slate-700/70 text-slate-200 border-slate-600/50 hover:bg-slate-600/80 hover:text-white hover:border-slate-500'
>>>>>>> main
              ]"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-xs sm:text-sm text-neon-pink glow-text-pink" style="font-family: 'Orbitron', monospace; letter-spacing: 1px;">
            <span class="text-neon-cyan glow-text-cyan">//</span> 排序
          </div>
          <select
            :value="sortBy"
            @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
            class="px-3 py-1.5 bg-cyber-dark-2 border border-neon-cyan/30 rounded text-sm text-neon-cyan focus:outline-none focus:border-neon-cyan focus:shadow-[var(--glow-cyan)]"
            style="font-family: 'Orbitron', monospace;"
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
            class="px-3 py-1.5 bg-neon-pink/20 text-neon-pink rounded-lg text-sm font-semibold hover:bg-neon-pink/30 transition-all shadow-[var(--glow-pink)]"
            style="font-family: 'Orbitron', monospace;"
          >
            ❤️ 收藏
          </button>
          <button
            v-if="showCustomOnly"
            @click="$emit('update:showCustomOnly', false)"
            class="px-3 py-1.5 bg-neon-cyan/20 text-neon-cyan rounded-lg text-sm font-semibold hover:bg-neon-cyan/30 transition-all shadow-[var(--glow-cyan)]"
            style="font-family: 'Orbitron', monospace;"
          >
            ✨ 创作
          </button>
        </div>

        <button
          v-if="hasFilters"
          @click="$emit('clear')"
          class="ml-auto px-3 py-1.5 text-sm font-semibold text-neon-pink hover:text-white hover:bg-neon-pink/20 rounded-lg transition-all"
          style="font-family: 'Orbitron', monospace;"
        >
          [ 清除 ]
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BaseSpirit, TasteTag } from '../types/cocktail'
import { baseSpirits, tasteTags, specialTags } from '../data/cocktails'

const isExpanded = ref(false)

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
