<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header -->
    <Header 
      v-model:keyword="filters.keyword"
      @add="showAddModal = true"
    />

    <!-- Filter Bar -->
    <FilterBar
      v-model:bases="filters.bases"
      v-model:tastes="filters.tastes"
      v-model:difficulty="filters.difficulty"
      @clear="clearFilters"
    />

    <!-- Cocktail List -->
    <main class="container mx-auto px-4 py-6">
      <div class="mb-4 text-slate-400">
        共 {{ cocktails.length }} 款调酒
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CocktailCard
          v-for="cocktail in cocktails"
          :key="cocktail.id"
          :cocktail="cocktail"
          @click="selectedCocktail = cocktail"
          @delete="handleDelete"
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

    <!-- Detail Modal -->
    <CocktailDetail
      v-if="selectedCocktail"
      :cocktail="selectedCocktail"
      @close="selectedCocktail = null"
      @delete="handleDelete"
    />

    <!-- Add Modal -->
    <AddCocktail
      v-if="showAddModal"
      @close="showAddModal = false"
      @add="handleAdd"
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

const {
  cocktails,
  filters,
  clearFilters,
  addCocktail,
  removeCocktail,
} = useCocktails()

const selectedCocktail = ref<Cocktail | null>(null)
const showAddModal = ref(false)

function handleAdd(cocktail: Omit<Cocktail, 'id' | 'createdAt'>) {
  addCocktail(cocktail)
  showAddModal.value = false
}

function handleDelete(id: string) {
  if (confirm('确定要删除这款自定义调酒吗？')) {
    removeCocktail(id)
    selectedCocktail.value = null
  }
}
</script>
