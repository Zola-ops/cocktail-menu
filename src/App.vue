<template>
  <div class="min-h-screen relative overflow-hidden">
    <div class="grid-bg"></div>
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
      <div class="mb-6 flex items-center justify-between">
        <div class="text-[var(--neon-cyan)] glow-text-cyan" style="font-family: 'Orbitron', monospace; letter-spacing: 2px;">
          <span class="text-[var(--neon-pink)] glow-text-pink">//</span> 共 {{ cocktails.length }} 款调酒
        </div>
        <div class="flex gap-3">
          <button
            @click="filters.showFavorites = !filters.showFavorites"
            :class="[
              'px-4 py-2 rounded-full text-sm font-semibold transition-all',
              filters.showFavorites
                ? 'bg-neon-pink-gradient text-white shadow-[var(--glow-pink)]'
                : 'bg-cyber-dark-2 text-neon-pink border border-neon-pink/30 hover:border-neon-pink hover:shadow-[var(--glow-pink)]'
            ]"
            style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
          >
            {{ filters.showFavorites ? '❤️ 已收藏' : '🤍 收藏' }}
          </button>
          <button
            @click="filters.showCustomOnly = !filters.showCustomOnly"
            :class="[
              'px-4 py-2 rounded-full text-sm font-semibold transition-all',
              filters.showCustomOnly
                ? 'bg-neon-cyan-gradient text-cyber-dark shadow-[var(--glow-cyan)]'
                : 'bg-cyber-dark-2 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan hover:shadow-[var(--glow-cyan)]'
            ]"
            style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
          >
            {{ filters.showCustomOnly ? '✨ 我的创作' : '📝 创作' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
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

      <div v-if="cocktails.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🍸</div>
        <div class="text-xl text-[var(--neon-cyan)] mb-4" style="font-family: 'Orbitron', monospace;">
          没有找到匹配的调酒
        </div>
        <button 
          @click="clearFilters"
          class="px-4 py-2 bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] rounded-lg hover:bg-[var(--neon-pink)]/30 transition border border-[var(--neon-pink)]/30 hover:border-[var(--neon-pink)]"
          style="font-family: 'Orbitron', monospace;"
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

    <MobileGuide />
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
import MobileGuide from './components/MobileGuide.vue'

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
