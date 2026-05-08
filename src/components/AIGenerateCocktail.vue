<template>
  <div class="fixed inset-0 z-50 modal-overlay" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl">
      <div class="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 px-6 py-4 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl">✨</span>
            <div>
              <h2 class="text-xl font-bold text-white">AI 调酒师</h2>
              <p class="text-xs text-slate-400">智能随机配方生成</p>
            </div>
          </div>
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

      <div class="p-6 space-y-6">
        <div v-if="!generatedCocktail">
          <div class="bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-xl p-4 mb-6">
            <p class="text-slate-300 text-center">
              🎲 <span class="text-purple-300 font-medium">随机模式</span>：不选择任何选项将完全随机生成<br>
              🎯 <span class="text-orange-300 font-medium">精准模式</span>：选择一项或多项来限定风格
            </p>
          </div>
          
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">
                <span class="flex items-center gap-2">
                  <span>🍸</span> 基酒（可选）
                </span>
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="base in baseSpirits"
                  :key="base"
                  @click="toggleSelection(selectedBases, base)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition',
                    selectedBases.includes(base)
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  ]"
                >
                  {{ base }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">
                <span class="flex items-center gap-2">
                  <span>🍎</span> 水果（可选）
                </span>
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  v-for="fruit in predefinedFruits"
                  :key="fruit"
                  @click="toggleSelection(selectedFruits, fruit)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition',
                    selectedFruits.includes(fruit)
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  ]"
                >
                  {{ fruit }}
                </button>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="customFruit"
                  type="text"
                  placeholder="输入自定义水果..."
                  class="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 text-sm"
                  @keyup.enter="addCustomFruit"
                />
                <button
                  @click="addCustomFruit"
                  class="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm transition"
                >
                  添加
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">
                <span class="flex items-center gap-2">
                  <span>🥤</span> 软饮（可选）
                </span>
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  v-for="drink in predefinedSoftDrinks"
                  :key="drink"
                  @click="toggleSelection(selectedSoftDrinks, drink)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition',
                    selectedSoftDrinks.includes(drink)
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  ]"
                >
                  {{ drink }}
                </button>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="customSoftDrink"
                  type="text"
                  placeholder="输入自定义软饮..."
                  class="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm"
                  @keyup.enter="addCustomSoftDrink"
                />
                <button
                  @click="addCustomSoftDrink"
                  class="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition"
                >
                  添加
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">
                <span class="flex items-center gap-2">
                  <span>🎭</span> 意境关键词（可选）
                </span>
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="mood in moodKeywords"
                  :key="mood"
                  @click="toggleSelection(selectedMoods, mood)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition',
                    selectedMoods.includes(mood)
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  ]"
                >
                  {{ mood }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-400 mb-2">
                <span class="flex items-center gap-2">
                  <span>✨</span> 自定义关键词（可选）
                </span>
              </label>
              <input
                v-model="customKeywordsInput"
                type="text"
                placeholder="输入任意关键词，如：浪漫、夏日、星空..."
                class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="handleGenerateRandom"
              :disabled="isGenerating"
              class="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold text-lg transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isGenerating" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="isGenerating">生成中...</span>
              <span v-else>🎲 随机生成</span>
            </button>
            <button
              @click="handleGenerateWithOptions"
              :disabled="isGenerating || !hasAnySelection"
              class="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>🎯 按选项生成</span>
            </button>
          </div>
          
          <p v-if="!hasAnySelection" class="text-slate-500 text-sm text-center mt-3">
            不选择任何选项将完全随机生成
          </p>
        </div>

        <div v-else class="space-y-6">
          <div class="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6">
            <div class="text-center mb-6">
              <div class="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm mb-2">
                ✨ AI 创作
              </div>
              <h3 class="text-3xl font-bold text-white mb-1">{{ generatedCocktail.name }}</h3>
              <p class="text-slate-400">{{ generatedCocktail.nameEn }}</p>
            </div>

            <p class="text-slate-300 text-center mb-6 italic">
              "{{ generatedCocktail.description }}"
            </p>

            <div class="flex flex-wrap justify-center gap-2 mb-6">
              <span
                v-for="base in generatedCocktail.base"
                :key="base"
                class="tag-base px-3 py-1 rounded-full text-sm"
              >
                {{ base }}
              </span>
              <span
                v-for="taste in generatedCocktail.taste"
                :key="taste"
                class="tag-taste px-3 py-1 rounded-full text-sm"
              >
                {{ taste }}
              </span>
              <span class="px-3 py-1 rounded-full text-sm bg-slate-600/50 text-slate-300">
                {{ difficultyText }}
              </span>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <span>📋</span> 配方
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(ing, index) in generatedCocktail.ingredients"
                    :key="index"
                    class="flex items-center gap-3 text-slate-200"
                  >
                    <span class="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
                    <span class="flex-1">{{ ing.name }}</span>
                    <span class="text-slate-400">{{ ing.amount }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <span>📝</span> 制作步骤
                </h4>
                <ol class="space-y-3">
                  <li
                    v-for="(step, index) in generatedCocktail.steps"
                    :key="index"
                    class="flex items-start gap-3 text-slate-200"
                  >
                    <span class="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-sm font-bold text-white shrink-0">
                      {{ index + 1 }}
                    </span>
                    <span class="flex-1 leading-relaxed">{{ step }}</span>
                  </li>
                </ol>
              </div>

              <div class="flex flex-wrap gap-4 pt-2">
                <div v-if="generatedCocktail.glass" class="flex items-center gap-2 text-slate-400 text-sm">
                  <span>🥃</span>
                  <span>{{ generatedCocktail.glass }}</span>
                </div>
                <div v-if="generatedCocktail.garnish" class="flex items-center gap-2 text-slate-400 text-sm">
                  <span>✨</span>
                  <span>{{ generatedCocktail.garnish }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="handleAddToCollection"
              class="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              收入我的调酒本
            </button>
            <button
              @click="handleSaveAndShare"
              class="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              保存并分享
            </button>
          </div>

          <div class="flex gap-3">
            <button
              @click="clearGenerated"
              class="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-xl transition flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              再来一杯
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAICocktail } from '../composables/useAICocktail'
import type { Cocktail, BaseSpirit } from '../types/cocktail'
import type { AIGenerationOptions } from '../composables/useAICocktail'

const emit = defineEmits<{
  'close': []
  'add': [cocktail: Omit<Cocktail, 'id' | 'createdAt'>]
  'save': [cocktail: Omit<Cocktail, 'id' | 'createdAt'>]
}>()

const { 
  isGenerating, 
  generatedCocktail, 
  generateCocktail, 
  clearGenerated,
  baseSpirits,
} = useAICocktail()

const predefinedFruits = ['柠檬', '青柠', '橙子', '蓝莓', '草莓', '芒果', '桃子', '菠萝', '百香果', '猕猴桃', '樱桃', '椰子']
const predefinedSoftDrinks = ['可乐', '雪碧', '苏打水', '汤力水', '姜汁啤酒', '橙汁', '菠萝汁', '椰子水', '绿茶', '红茶']

const selectedBases = ref<BaseSpirit[]>([])
const selectedFruits = ref<string[]>([])
const selectedSoftDrinks = ref<string[]>([])
const selectedMoods = ref<string[]>([])
const customKeywordsInput = ref('')
const customFruit = ref('')
const customSoftDrink = ref('')

const moodKeywords = [
  '浪漫', '神秘', '热情', '清新', '复古', '优雅', '狂野', '宁静', '活力', '深沉',
  '月光', '星空', '海洋', '森林', '沙漠', '都市', '田园', '古典', '现代', '自然'
]

const hasAnySelection = computed(() => {
  return selectedBases.value.length > 0 || 
         selectedFruits.value.length > 0 || 
         selectedSoftDrinks.value.length > 0 ||
         selectedMoods.value.length > 0 ||
         customKeywordsInput.value.trim().length > 0
})

const difficultyText = computed(() => {
  if (!generatedCocktail.value) return ''
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[generatedCocktail.value.difficulty]
})

function toggleSelection(arr: (string | BaseSpirit)[], item: string | BaseSpirit) {
  const index = arr.indexOf(item)
  if (index === -1) {
    arr.push(item)
  } else {
    arr.splice(index, 1)
  }
}

function addCustomFruit() {
  const fruit = customFruit.value.trim()
  if (fruit && !selectedFruits.value.includes(fruit) && !predefinedFruits.includes(fruit)) {
    selectedFruits.value.push(fruit)
    customFruit.value = ''
  }
}

function addCustomSoftDrink() {
  const drink = customSoftDrink.value.trim()
  if (drink && !selectedSoftDrinks.value.includes(drink) && !predefinedSoftDrinks.includes(drink)) {
    selectedSoftDrinks.value.push(drink)
    customSoftDrink.value = ''
  }
}

function buildOptions(): AIGenerationOptions {
  const customKeywords = customKeywordsInput.value
    .split(/[,，、\s]+/)
    .filter(k => k.trim())
  
  return {
    bases: selectedBases.value.length > 0 ? selectedBases.value : undefined,
    fruits: selectedFruits.value.length > 0 ? selectedFruits.value : undefined,
    softDrinks: selectedSoftDrinks.value.length > 0 ? selectedSoftDrinks.value : undefined,
    moodKeywords: selectedMoods.value.length > 0 ? selectedMoods.value : undefined,
    customKeywords: customKeywords.length > 0 ? customKeywords : undefined,
  }
}

async function handleGenerateRandom() {
  await generateCocktail({})
}

async function handleGenerateWithOptions() {
  const options = buildOptions()
  await generateCocktail(options)
}

function handleAddToCollection() {
  if (generatedCocktail.value) {
    const { id, createdAt, ...cocktailData } = generatedCocktail.value
    emit('add', cocktailData)
    emit('close')
  }
}

function handleSaveAndShare() {
  if (generatedCocktail.value) {
    const { id, createdAt, ...cocktailData } = generatedCocktail.value
    emit('save', cocktailData)
    emit('close')
  }
}
</script>

<style scoped>
.tag-base {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(249, 115, 22, 0.2));
  color: rgb(251, 146, 60);
  border: 1px solid rgba(251, 146, 60, 0.3);
}

.tag-taste {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2));
  color: rgb(168, 85, 247);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.modal-overlay {
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
