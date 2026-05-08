import { ref, computed } from 'vue'
import type { Cocktail, FilterState } from '../types/cocktail'
import { cocktails as defaultCocktails } from '../data/cocktails'

const STORAGE_KEY = 'cocktail-menu-data'
const FAVORITES_KEY = 'cocktail-favorites'

function loadCocktails(): Cocktail[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load cocktails:', e)
  }
  return defaultCocktails
}

function saveCocktails(data: Cocktail[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save cocktails:', e)
  }
}

function loadFavorites(): Set<string> {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      return new Set(JSON.parse(saved))
    }
  } catch (e) {
    console.error('Failed to load favorites:', e)
  }
  return new Set()
}

function saveFavorites(favorites: Set<string>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]))
  } catch (e) {
    console.error('Failed to save favorites:', e)
  }
}

const allCocktails = ref<Cocktail[]>(loadCocktails())
const favorites = ref<Set<string>>(loadFavorites())

export function useCocktails() {
  const filters = ref<FilterState>({
    bases: [],
    tastes: [],
    difficulty: [],
    keyword: '',
    specialTags: [],
    sortBy: 'name',
    showFavorites: false,
    showCustomOnly: false,
  })

  const filteredCocktails = computed(() => {
    let result = allCocktails.value.filter((cocktail) => {
      if (filters.value.bases.length > 0) {
        const hasBase = cocktail.base.some((b) => filters.value.bases.includes(b))
        if (!hasBase) return false
      }

      if (filters.value.tastes.length > 0) {
        const hasTaste = cocktail.taste.some((t) => filters.value.tastes.includes(t))
        if (!hasTaste) return false
      }

      if (filters.value.difficulty.length > 0) {
        if (!filters.value.difficulty.includes(cocktail.difficulty)) return false
      }

      if (filters.value.keyword) {
        const keyword = filters.value.keyword.toLowerCase()
        const matchName = cocktail.name.toLowerCase().includes(keyword)
        const matchNameEn = cocktail.nameEn.toLowerCase().includes(keyword)
        const matchDesc = cocktail.description?.toLowerCase().includes(keyword)
        if (!matchName && !matchNameEn && !matchDesc) return false
      }

      if (filters.value.specialTags.length > 0) {
        const hasTag = filters.value.specialTags.some((tag) => cocktail.tags?.includes(tag))
        if (!hasTag) return false
      }

      if (filters.value.showFavorites) {
        if (!favorites.value.has(cocktail.id)) return false
      }

      if (filters.value.showCustomOnly) {
        if (!cocktail.isCustom) return false
      }

      return true
    })

    switch (filters.value.sortBy) {
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
        result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
        break
      case 'createdAt':
        result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        break
      default:
        result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    }

    return result
  })

  function getById(id: string): Cocktail | undefined {
    return allCocktails.value.find((c) => c.id === id)
  }

  function addCocktail(cocktail: Omit<Cocktail, 'id' | 'createdAt'>) {
    const newCocktail: Cocktail = {
      ...cocktail,
      id: `custom-${Date.now()}`,
      isCustom: true,
      createdAt: new Date().toISOString(),
    }
    allCocktails.value.push(newCocktail)
    saveCocktails(allCocktails.value)
    return newCocktail
  }

  function removeCocktail(id: string) {
    const index = allCocktails.value.findIndex((c) => c.id === id)
    if (index !== -1 && allCocktails.value[index].isCustom) {
      allCocktails.value.splice(index, 1)
      saveCocktails(allCocktails.value)
      return true
    }
    return false
  }

  function updateCocktail(id: string, data: Partial<Cocktail>) {
    const index = allCocktails.value.findIndex((c) => c.id === id)
    if (index !== -1 && allCocktails.value[index].isCustom) {
      allCocktails.value[index] = { ...allCocktails.value[index], ...data }
      saveCocktails(allCocktails.value)
      return allCocktails.value[index]
    }
    return null
  }

  function clearFilters() {
    filters.value = {
      bases: [],
      tastes: [],
      difficulty: [],
      keyword: '',
      specialTags: [],
      sortBy: 'name',
      showFavorites: false,
      showCustomOnly: false,
    }
  }

  function toggleFavorite(id: string) {
    if (favorites.value.has(id)) {
      favorites.value.delete(id)
    } else {
      favorites.value.add(id)
    }
    saveFavorites(favorites.value)
  }

  function isFavorite(id: string): boolean {
    return favorites.value.has(id)
  }

  function toggleBase(base: string) {
    const index = filters.value.bases.indexOf(base as any)
    if (index === -1) {
      filters.value.bases.push(base as any)
    } else {
      filters.value.bases.splice(index, 1)
    }
  }

  function toggleTaste(taste: string) {
    const index = filters.value.tastes.indexOf(taste as any)
    if (index === -1) {
      filters.value.tastes.push(taste as any)
    } else {
      filters.value.tastes.splice(index, 1)
    }
  }

  function toggleDifficulty(difficulty: string) {
    const index = filters.value.difficulty.indexOf(difficulty)
    if (index === -1) {
      filters.value.difficulty.push(difficulty)
    } else {
      filters.value.difficulty.splice(index, 1)
    }
  }

  return {
    cocktails: filteredCocktails,
    allCocktails,
    filters,
    favorites,
    getById,
    addCocktail,
    removeCocktail,
    updateCocktail,
    clearFilters,
    toggleFavorite,
    isFavorite,
    toggleBase,
    toggleTaste,
    toggleDifficulty,
  }
}
