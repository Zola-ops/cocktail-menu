<template>
  <div class="fixed inset-0 z-50 modal-overlay" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[var(--cyber-dark-3)] to-[var(--cyber-dark)] rounded-lg shadow-2xl border border-[var(--neon-cyan)]/30">
      <div class="sticky top-0 bg-[var(--cyber-dark)]/95 backdrop-blur-lg border-b border-[var(--neon-cyan)]/20 px-6 py-4 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] rounded">
              <span class="text-xl">🤖</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white tracking-wider" style="font-family: 'Orbitron', monospace;">
                <span class="text-[var(--neon-cyan)]">[</span> AI 调酒师 <span class="text-[var(--neon-cyan)]">]</span>
              </h2>
              <p class="text-xs text-[var(--neon-pink)]" style="font-family: 'Orbitron', monospace;">NEURAL NETWORK GENERATION</p>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="w-10 h-10 flex items-center justify-center rounded bg-[var(--cyber-dark-2)] hover:bg-[var(--neon-pink)]/20 text-[var(--neon-cyan)] hover:text-[var(--neon-pink)] transition border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-pink)]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div v-if="!generatedCocktail">
          <div class="bg-gradient-to-r from-[var(--neon-cyan)]/10 to-[var(--neon-pink)]/10 rounded-lg p-4 mb-6 border border-[var(--neon-cyan)]/20">
            <p class="text-[var(--neon-cyan)] text-center" style="font-family: 'Orbitron', monospace; font-size: 12px;">
              <span class="text-[var(--neon-pink)]">//</span> 随机模式：不选择任何选项将完全随机生成<br>
              <span class="text-[var(--neon-pink)]">//</span> 精准模式：选择一项或多项来限定风格
            </p>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-[var(--neon-pink)] mb-2" style="font-family: 'Orbitron', monospace;">
                <span class="flex items-center gap-2">
                  <span>🍸</span> <span class="text-[var(--neon-cyan)]">//</span> 基酒选择
                </span>
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="base in baseSpirits"
                  :key="base"
                  @click="toggleSelection(selectedBases, base)"
                  :class="[
                    'px-3 py-2 rounded text-sm font-medium transition border',
                    selectedBases.includes(base)
                      ? 'bg-[var(--neon-pink)] text-white border-[var(--neon-pink)] shadow-[var(--glow-pink)]'
                      : 'bg-[var(--cyber-dark-2)] text-[var(--neon-cyan)] border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] hover:shadow-[var(--glow-cyan)]'
                  ]"
                  style="font-family: 'Orbitron', monospace; text-transform: uppercase; letter-spacing: 0.5px;"
                >
                  {{ base }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[var(--neon-pink)] mb-2" style="font-family: 'Orbitron', monospace;">
                <span class="flex items-center gap-2">
                  <span>🍎</span> <span class="text-[var(--neon-cyan)]">//</span> 水果选择
                </span>
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  v-for="fruit in predefinedFruits"
                  :key="fruit"
                  @click="toggleSelection(selectedFruits, fruit)"
                  :class="[
                    'px-3 py-2 rounded text-sm font-medium transition border',
                    selectedFruits.includes(fruit)
                      ? 'bg-[var(--neon-cyan)] text-[var(--cyber-dark)] border-[var(--neon-cyan)] shadow-[var(--glow-cyan)]'
                      : 'bg-[var(--cyber-dark-2)] text-[var(--neon-cyan)] border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] hover:shadow-[var(--glow-cyan)]'
                  ]"
                  style="font-family: 'Orbitron', monospace; text-transform: uppercase; letter-spacing: 0.5px;"
                >
                  {{ fruit }}
                </button>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="customFruit"
                  type="text"
                  placeholder="// 输入自定义水果..."
                  class="flex-1 px-3 py-2 bg-[var(--cyber-dark-2)] border border-[var(--neon-cyan)]/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)] text-sm"
                  style="font-family: 'Orbitron', monospace;"
                  @keyup.enter="addCustomFruit"
                />
                <button
                  @click="addCustomFruit"
                  class="px-4 py-2 bg-[var(--neon-cyan)]/20 hover:bg-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] rounded text-sm transition"
                  style="font-family: 'Orbitron', monospace;"
                >
                  + 添加
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[var(--neon-pink)] mb-2" style="font-family: 'Orbitron', monospace;">
                <span class="flex items-center gap-2">
                  <span>🥤</span> <span class="text-[var(--neon-cyan)]">//</span> 软饮选择
                </span>
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  v-for="drink in predefinedSoftDrinks"
                  :key="drink"
                  @click="toggleSelection(selectedSoftDrinks, drink)"
                  :class="[
                    'px-3 py-2 rounded text-sm font-medium transition border',
                    selectedSoftDrinks.includes(drink)
                      ? 'bg-[var(--neon-purple)] text-white border-[var(--neon-purple)] shadow-[var(--glow-purple)]'
                      : 'bg-[var(--cyber-dark-2)] text-[var(--neon-purple)] border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)] hover:shadow-[var(--glow-purple)]'
                  ]"
                  style="font-family: 'Orbitron', monospace; text-transform: uppercase; letter-spacing: 0.5px;"
                >
                  {{ drink }}
                </button>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="customSoftDrink"
                  type="text"
                  placeholder="// 输入自定义软饮..."
                  class="flex-1 px-3 py-2 bg-[var(--cyber-dark-2)] border border-[var(--neon-purple)]/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-purple)] text-sm"
                  style="font-family: 'Orbitron', monospace;"
                  @keyup.enter="addCustomSoftDrink"
                />
                <button
                  @click="addCustomSoftDrink"
                  class="px-4 py-2 bg-[var(--neon-purple)]/20 hover:bg-[var(--neon-purple)]/30 text-[var(--neon-purple)] rounded text-sm transition"
                  style="font-family: 'Orbitron', monospace;"
                >
                  + 添加
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[var(--neon-pink)] mb-2" style="font-family: 'Orbitron', monospace;">
                <span class="flex items-center gap-2">
                  <span>🎭</span> <span class="text-[var(--neon-cyan)]">//</span> 意境关键词
                </span>
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="mood in moodKeywords"
                  :key="mood"
                  @click="toggleSelection(selectedMoods, mood)"
                  :class="[
                    'px-3 py-2 rounded text-sm font-medium transition border',
                    selectedMoods.includes(mood)
                      ? 'bg-[var(--neon-pink)] text-white border-[var(--neon-pink)] shadow-[var(--glow-pink)]'
                      : 'bg-[var(--cyber-dark-2)] text-[var(--neon-pink)] border-[var(--neon-pink)]/30 hover:border-[var(--neon-pink)] hover:shadow-[var(--glow-pink)]'
                  ]"
                  style="font-family: 'Orbitron', monospace; text-transform: uppercase; letter-spacing: 0.5px;"
                >
                  {{ mood }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[var(--neon-pink)] mb-2" style="font-family: 'Orbitron', monospace;">
                <span class="flex items-center gap-2">
                  <span>✨</span> <span class="text-[var(--neon-cyan)]">//</span> 自定义关键词
                </span>
              </label>
              <input
                v-model="customKeywordsInput"
                type="text"
                placeholder="// 输入任意关键词，如：浪漫、夏日、星空..."
                class="w-full px-4 py-3 bg-[var(--cyber-dark-2)] border border-[var(--neon-pink)]/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-pink)] text-sm transition"
                style="font-family: 'Orbitron', monospace;"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="handleGenerateRandom"
              :disabled="isGenerating"
              class="flex-1 py-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] hover:opacity-90 text-white rounded-lg font-bold text-lg transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--glow-purple)]"
              style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            >
              <svg v-if="isGenerating" class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="isGenerating">GENERATING...</span>
              <span v-else>🎲 随机生成</span>
            </button>
            <button
              @click="handleGenerateWithOptions"
              :disabled="isGenerating || !hasAnySelection"
              class="flex-1 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] hover:opacity-90 text-white rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--glow-cyan)]"
              style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            >
              <span>🎯 按选项生成</span>
            </button>
          </div>

          <p v-if="!hasAnySelection" class="text-slate-500 text-sm text-center mt-3" style="font-family: 'Orbitron', monospace;">
            <span class="text-[var(--neon-cyan)]">//</span> 不选择任何选项将完全随机生成
          </p>
        </div>

        <div v-else class="space-y-6">
          <div class="bg-gradient-to-br from-[var(--cyber-dark-2)] to-[var(--cyber-dark-3)] rounded-lg p-6 border border-[var(--neon-cyan)]/20">
            <div class="text-center mb-6">
              <div class="inline-block px-4 py-1 bg-gradient-to-r from-[var(--neon-purple)]/20 to-[var(--neon-pink)]/20 text-[var(--neon-cyan)] rounded-full text-sm mb-2" style="font-family: 'Orbitron', monospace;">
                <span class="text-[var(--neon-pink)]">//</span> AI 创作
              </div>
              <h3 class="text-3xl font-bold text-white mb-1" style="font-family: 'Orbitron', monospace;">{{ generatedCocktail.name }}</h3>
              <p class="text-[var(--neon-pink)]">{{ generatedCocktail.nameEn }}</p>
            </div>

            <p class="text-[var(--neon-cyan)] text-center mb-6 italic" style="font-family: 'Orbitron', monospace;">
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
              <span class="px-3 py-1 rounded-full text-sm bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] border border-[var(--neon-purple)]/30" style="font-family: 'Orbitron', monospace;">
                {{ difficultyText }}
              </span>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-[var(--neon-pink)] mb-2 flex items-center gap-2" style="font-family: 'Orbitron', monospace;">
                  <span class="text-[var(--neon-cyan)]">//</span> 配方配方
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(ing, index) in generatedCocktail.ingredients"
                    :key="index"
                    class="flex items-center gap-3 text-white"
                  >
                    <span class="w-2 h-2 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-pink)] rounded-full shrink-0"></span>
                    <span class="flex-1">{{ ing.name }}</span>
                    <span class="text-[var(--neon-cyan)]">{{ ing.amount }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-sm font-medium text-[var(--neon-pink)] mb-2 flex items-center gap-2" style="font-family: 'Orbitron', monospace;">
                  <span class="text-[var(--neon-cyan)]">//</span> 制作步骤
                </h4>
                <ol class="space-y-3">
                  <li
                    v-for="(step, index) in generatedCocktail.steps"
                    :key="index"
                    class="flex items-start gap-3 text-white"
                  >
                    <span class="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-pink)] rounded text-sm font-bold text-[var(--cyber-dark)] shrink-0" style="font-family: 'Orbitron', monospace;">
                      {{ index + 1 }}
                    </span>
                    <span class="flex-1 leading-relaxed">{{ step }}</span>
                  </li>
                </ol>
              </div>

              <div class="flex flex-wrap gap-4 pt-2">
                <div v-if="generatedCocktail.glass" class="flex items-center gap-2 text-[var(--neon-cyan)] text-sm">
                  <span>🥃</span>
                  <span>{{ generatedCocktail.glass }}</span>
                </div>
                <div v-if="generatedCocktail.garnish" class="flex items-center gap-2 text-[var(--neon-purple)] text-sm">
                  <span>✨</span>
                  <span>{{ generatedCocktail.garnish }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="handleAddToCollection"
              class="flex-1 py-3.5 px-4 ai-action-btn save-btn text-white rounded-xl font-bold transition-all duration-300 active:scale-95 text-sm sm:text-base"
              style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            >
              💾 存入
            </button>
            <button
              @click="handleSaveAndShare"
              class="flex-1 py-3.5 px-4 ai-action-btn share-btn text-white rounded-xl font-bold transition-all duration-300 active:scale-95 text-sm sm:text-base"
              style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            >
              📤 分享
            </button>
            <button
              @click="clearGenerated"
              class="flex-1 py-3.5 px-4 ai-action-btn retry-btn text-white rounded-xl font-bold transition-all duration-300 active:scale-95 text-sm sm:text-base"
              style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            >
              🔄 再来
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
  background: linear-gradient(135deg, rgba(255, 42, 109, 0.2), rgba(255, 42, 109, 0.1));
  color: #ff6b9d;
  border: 1px solid rgba(255, 42, 109, 0.4);
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tag-taste {
  background: linear-gradient(135deg, rgba(5, 217, 232, 0.2), rgba(5, 217, 232, 0.1));
  color: #05d9e8;
  border: 1px solid rgba(5, 217, 232, 0.4);
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ai-action-btn {
  background: linear-gradient(135deg, #ff2b6d, #d300c5);
  box-shadow: 0 0 20px rgba(255, 42, 109, 0.5);
  transition: all 0.3s ease;
}

.ai-action-btn:hover {
  opacity: 0.9;
  box-shadow: 0 0 30px rgba(255, 42, 109, 0.7);
  transform: translateY(-2px);
}

.save-btn {
  background: linear-gradient(135deg, #05d9e8, #ff2b6d);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.5);
}

.save-btn:hover {
  box-shadow: 0 0 30px rgba(5, 217, 232, 0.7);
}

.share-btn {
  background: linear-gradient(135deg, #ff2b6d, #d300c5);
  box-shadow: 0 0 20px rgba(255, 42, 109, 0.5);
}

.share-btn:hover {
  box-shadow: 0 0 30px rgba(255, 42, 109, 0.7);
}

.retry-btn {
  background: linear-gradient(135deg, #d300c5, #05d9e8);
  box-shadow: 0 0 20px rgba(211, 0, 197, 0.5);
}

.retry-btn:hover {
  box-shadow: 0 0 30px rgba(211, 0, 197, 0.7);
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
