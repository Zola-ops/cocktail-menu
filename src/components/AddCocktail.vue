<template>
  <div class="fixed inset-0 z-50 modal-overlay" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @emit="close"></div>
    
    <div class="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto modal-content rounded-t-3xl slide-up">
      <!-- Header -->
      <div class="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">添加自定义调酒</h2>
          <button
            @click="$emit('close')"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="px-6 py-6 space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">调酒名称 *</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="例如：我的特调"
            class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition"
          />
        </div>

        <!-- English Name -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">英文名</label>
          <input
            v-model="form.nameEn"
            type="text"
            placeholder="例如：My Special"
            class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition"
          />
        </div>

        <!-- Base Spirits -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">基酒类型 *</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="base in baseOptions"
              :key="base"
              type="button"
              @click="toggleArray(base, form.base)"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition',
                form.base.includes(base)
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
            >
              {{ base }}
            </button>
          </div>
        </div>

        <!-- Taste Tags -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">口味标签 *</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="taste in tasteOptions"
              :key="taste"
              type="button"
              @click="toggleArray(taste, form.taste)"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition',
                form.taste.includes(taste)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
            >
              {{ taste }}
            </button>
          </div>
        </div>

        <!-- Difficulty -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">难度 *</label>
          <div class="flex gap-3">
            <button
              v-for="diff in difficultyOptions"
              :key="diff.value"
              type="button"
              @click="form.difficulty = diff.value"
              :class="[
                'flex-1 py-3 rounded-xl text-sm font-medium transition',
                form.difficulty === diff.value
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Ingredients -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm text-slate-400">配方 *</label>
            <button
              type="button"
              @click="addIngredient"
              class="text-sm text-orange-400 hover:text-orange-300"
            >
              + 添加材料
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="(ing, index) in form.ingredients"
              :key="index"
              class="flex gap-2"
            >
              <input
                v-model="ing.name"
                type="text"
                placeholder="材料名"
                required
                class="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition text-sm"
              />
              <input
                v-model="ing.amount"
                type="text"
                placeholder="用量"
                required
                class="w-24 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition text-sm"
              />
              <button
                v-if="form.ingredients.length > 1"
                type="button"
                @click="removeIngredient(index)"
                class="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm text-slate-400">制作步骤 *</label>
            <button
              type="button"
              @click="addStep"
              class="text-sm text-orange-400 hover:text-orange-300"
            >
              + 添加步骤
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="(step, index) in form.steps"
              :key="index"
              class="flex gap-2"
            >
              <span class="w-6 h-10 flex items-center justify-center text-slate-500 text-sm">
                {{ index + 1 }}.
              </span>
              <input
                v-model="form.steps[index]"
                type="text"
                placeholder="步骤描述"
                required
                class="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition text-sm"
              />
              <button
                v-if="form.steps.length > 1"
                type="button"
                @click="removeStep(index)"
                class="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Glass & Garnish -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-slate-400 mb-2">杯型</label>
            <input
              v-model="form.glass"
              type="text"
              placeholder="例如：高球杯"
              class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-2">装饰</label>
            <input
              v-model="form.garnish"
              type="text"
              placeholder="例如：柠檬片"
              class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">简介</label>
          <textarea
            v-model="form.description"
            rows="2"
            placeholder="简单描述这款调酒..."
            class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition resize-none"
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="!isValid"
          :class="[
            'w-full py-4 rounded-xl font-bold text-lg transition',
            isValid
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          ]"
        >
          添加调酒
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Cocktail, Ingredient, BaseSpirit, TasteTag } from '../types/cocktail'
import { baseSpirits, tasteTags } from '../data/cocktails'

const emit = defineEmits<{
  'close': []
  'add': [cocktail: Omit<Cocktail, 'id' | 'createdAt'>]
}>()

const baseOptions = baseSpirits
const tasteOptions = tasteTags
const difficultyOptions = [
  { value: 'easy' as const, label: '⭐ 简单' },
  { value: 'medium' as const, label: '⭐⭐ 中等' },
  { value: 'hard' as const, label: '⭐⭐⭐ 困难' },
]

const form = ref({
  name: '',
  nameEn: '',
  base: [] as BaseSpirit[],
  taste: [] as TasteTag[],
  difficulty: 'easy' as const,
  ingredients: [{ name: '', amount: '' }] as Ingredient[],
  steps: [''] as string[],
  glass: '',
  garnish: '',
  description: '',
})

const isValid = computed(() => {
  return (
    form.value.name.trim() &&
    form.value.base.length > 0 &&
    form.value.taste.length > 0 &&
    form.value.ingredients.every((i) => i.name.trim() && i.amount.trim()) &&
    form.value.steps.every((s) => s.trim())
  )
})

function toggleArray<T>(item: T, array: T[]) {
  const index = array.indexOf(item)
  if (index === -1) {
    array.push(item)
  } else {
    array.splice(index, 1)
  }
}

function addIngredient() {
  form.value.ingredients.push({ name: '', amount: '' })
}

function removeIngredient(index: number) {
  form.value.ingredients.splice(index, 1)
}

function addStep() {
  form.value.steps.push('')
}

function removeStep(index: number) {
  form.value.steps.splice(index, 1)
}

function handleSubmit() {
  if (!isValid.value) return

  emit('add', {
    name: form.value.name.trim(),
    nameEn: form.value.nameEn.trim() || form.value.name.trim(),
    base: form.value.base,
    taste: form.value.taste,
    difficulty: form.value.difficulty,
    ingredients: form.value.ingredients.filter((i) => i.name.trim()),
    steps: form.value.steps.filter((s) => s.trim()),
    glass: form.value.glass.trim() || undefined,
    garnish: form.value.garnish.trim() || undefined,
    description: form.value.description.trim() || undefined,
    isCustom: true,
  })
}
</script>
