<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <Header 
      v-model:keyword="filters.keyword"
      @add="showAddModal = true"
      @ai="showAIModal = true"
    />

    <FilterBar
      v-model:bases="filters.bases"
      v-model:tastes="filters.tastes"
      v-model:difficulty="filters.difficulty"
      v-model:specialTags="filters.specialTags"
      v-model:sortBy="filters.sortBy"
      v-model:showFavorites="filters.showFavorites"
      v-model:showCustomOnly="filters.showCustomOnly"
      @clear="clearFilters"
    />

    <main class="container mx-auto px-4 py-6">
      <div class="mb-4 flex items-center justify-between">
        <div class="text-slate-400">
          共 {{ cocktails.length }} 款调酒
        </div>
        <div class="flex gap-2">
          <button
            @click="filters.showFavorites = !filters.showFavorites"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition',
              filters.showFavorites
                ? 'bg-red-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            ]"
          >
            {{ filters.showFavorites ? '❤️ 已收藏' : '🤍 收藏' }}
          </button>
          <button
            @click="filters.showCustomOnly = !filters.showCustomOnly"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition',
              filters.showCustomOnly
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            ]"
          >
            {{ filters.showCustomOnly ? '✨ 我的创作' : '📝 创作' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CocktailCard
          v-for="cocktail in cocktails"
          :key="cocktail.id"
          :cocktail="cocktail"
          :isFavorite="isFavorite(cocktail.id)"
          @click="selectedCocktail = cocktail"
          @delete="handleDelete"
          @toggleFavorite="toggleFavorite"
        />
      </div>

      <div v-if="cocktails.length === 0" class="text-center py-20 text-slate-500">
        <div class="text-6xl mb-4">🍸</div>
        <div class="text-xl">没有找到匹配的调酒</div>
        <button 
          @click="clearFilters"
          class="mt-4 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition"
        >
          清除筛选
        </button>
      </div>
    </main>

    <CocktailDetail
      v-if="selectedCocktail"
      :cocktail="selectedCocktail"
      :isFavorite="isFavorite(selectedCocktail.id)"
      @close="selectedCocktail = null"
      @delete="handleDelete"
      @toggleFavorite="toggleFavorite"
    />

    <AddCocktail
      v-if="showAddModal"
      @close="showAddModal = false"
      @add="handleAdd"
    />

    <AIGenerateCocktail
      v-if="showAIModal"
      @close="showAIModal = false"
      @add="handleAIAdd"
      @save="handleAISave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Cocktail } from './types/cocktail'
import { useCocktails } from './composables/useCocktails'
import Header from './components/Header.vue'
import FilterBar from './components/FilterBar.vue'
import CocktailCard from './components/CocktailCard.vue'
import CocktailDetail from './components/CocktailDetail.vue'
import AddCocktail from './components/AddCocktail.vue'
import AIGenerateCocktail from './components/AIGenerateCocktail.vue'

const {
  cocktails,
  filters,
  clearFilters,
  addCocktail,
  removeCocktail,
  toggleFavorite,
  isFavorite,
} = useCocktails()

const selectedCocktail = ref<Cocktail | null>(null)
const showAddModal = ref(false)
const showAIModal = ref(false)

function handleAdd(cocktail: Omit<Cocktail, 'id' | 'createdAt'>) {
  addCocktail(cocktail)
  showAddModal.value = false
}

function handleAIAdd(cocktail: Omit<Cocktail, 'id' | 'createdAt'>) {
  addCocktail(cocktail)
}

function handleAISave(cocktail: Omit<Cocktail, 'id' | 'createdAt'>) {
  addCocktail(cocktail)
}

function handleDelete(id: string) {
  if (confirm('确定要删除这款自定义调酒吗？')) {
    removeCocktail(id)
    selectedCocktail.value = null
  }
}
</script>
