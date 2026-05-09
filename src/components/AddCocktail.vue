<template>
  <div class="detail-modal-overlay" @click.self="$emit('close')">
    <div class="detail-modal-content fade-in-scale">
      <div class="sticky top-0 bg-[var(--cyber-dark)]/95 backdrop-blur-xl border-b border-cyber-gray/30 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white" style="font-family: 'Orbitron', monospace;">添加自定义调酒</h2>
          <button
            @click="$emit('close')"
            class="w-11 h-11 flex items-center justify-center rounded-full bg-cyber-gray/50 hover:bg-cyber-gray text-white hover:scale-110 transition-all duration-300"
          >
            ✕
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="px-6 py-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
        <div>
          <label class="block text-sm text-slate-400 mb-2">调酒名称 *</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="例如：我的特调"
            class="w-full px-4 py-3 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 focus:shadow-[var(--glow-cyan)] transition"
          />
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">英文名</label>
          <input
            v-model="form.nameEn"
            type="text"
            placeholder="例如：My Special"
            class="w-full px-4 py-3 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 focus:shadow-[var(--glow-cyan)] transition"
          />
        </div>

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
                  ? 'bg-[var(--neon-pink)] text-white shadow-[var(--glow-pink)]'
                  : 'bg-cyber-dark-2/50 text-slate-300 hover:bg-cyber-gray/50 border border-cyber-gray/30'
              ]"
              style="font-family: 'Orbitron', monospace;"
            >
              {{ base }}
            </button>
          </div>
        </div>

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
                  ? 'bg-[var(--neon-cyan)] text-[var(--cyber-dark)] shadow-[var(--glow-cyan)]'
                  : 'bg-cyber-dark-2/50 text-slate-300 hover:bg-cyber-gray/50 border border-cyber-gray/30'
              ]"
              style="font-family: 'Orbitron', monospace;"
            >
              {{ taste }}
            </button>
          </div>
        </div>

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
                  ? 'bg-[var(--neon-purple)] text-white shadow-[var(--glow-purple)]'
                  : 'bg-cyber-dark-2/50 text-slate-300 hover:bg-cyber-gray/50 border border-cyber-gray/30'
              ]"
              style="font-family: 'Orbitron', monospace;"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm text-slate-400">配方 *</label>
            <button
              type="button"
              @click="addIngredient"
              class="text-sm text-[var(--neon-pink)] hover:text-[var(--neon-cyan)] transition"
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
                class="flex-1 px-3 py-2 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 transition text-sm"
              />
              <input
                v-model="ing.amount"
                type="text"
                placeholder="用量"
                required
                class="w-24 px-3 py-2 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 transition text-sm"
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

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm text-slate-400">制作步骤 *</label>
            <button
              type="button"
              @click="addStep"
              class="text-sm text-[var(--neon-pink)] hover:text-[var(--neon-cyan)] transition"
            >
              + 添加步骤
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="(_, index) in form.steps"
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
                class="flex-1 px-3 py-2 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 transition text-sm"
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

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-slate-400 mb-2">杯型</label>
            <input
              v-model="form.glass"
              type="text"
              placeholder="例如：高球杯"
              class="w-full px-4 py-3 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 focus:shadow-[var(--glow-cyan)] transition"
            />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-2">装饰</label>
            <input
              v-model="form.garnish"
              type="text"
              placeholder="例如：柠檬片"
              class="w-full px-4 py-3 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 focus:shadow-[var(--glow-cyan)] transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm text-slate-400 mb-2">简介</label>
          <textarea
            v-model="form.description"
            rows="2"
            placeholder="简单描述这款调酒..."
            class="w-full px-4 py-3 bg-cyber-dark-2/50 border border-cyber-gray/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)]/50 focus:shadow-[var(--glow-cyan)] transition resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="!isValid"
          :class="[
            'w-full py-4 rounded-xl font-bold text-lg transition',
            isValid
              ? 'bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] hover:shadow-[var(--glow-pink)] text-white'
              : 'bg-cyber-gray/50 text-slate-500 cursor-not-allowed'
          ]"
          style="font-family: 'Orbitron', monospace;"
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

const baseOptions: BaseSpirit[] = [...baseSpirits]
const tasteOptions: TasteTag[] = [...tasteTags]
const difficultyOptions: { value: 'easy' | 'medium' | 'hard'; label: string }[] = [
  { value: 'easy', label: '⭐ 简单' },
  { value: 'medium', label: '⭐⭐ 中等' },
  { value: 'hard', label: '⭐⭐⭐ 困难' },
]

type Difficulty = 'easy' | 'medium' | 'hard'

const form = ref({
  name: '',
  nameEn: '',
  base: [] as BaseSpirit[],
  taste: [] as TasteTag[],
  difficulty: 'easy' as Difficulty,
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