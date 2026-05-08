import { ref, computed } from 'vue'
import type { Cocktail, FilterState } from '../types/cocktail'
import { cocktails as defaultCocktails } from '../data/cocktails'

const STORAGE_KEY = 'cocktail-menu-data'

// 从 LocalStorage 加载数据
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

// 保存数据到 LocalStorage
function saveCocktails(data: Cocktail[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save cocktails:', e)
  }
}

// 全局状态
const allCocktails = ref<Cocktail[]>(loadCocktails())

export function useCocktails() {
  // 筛选状态
  const filters = ref<FilterState>({
    bases: [],
    tastes: [],
    difficulty: [],
    keyword: '',
  })

  // 筛选后的调酒列表
  const filteredCocktails = computed(() => {
    return allCocktails.value.filter((cocktail) => {
      // 基酒筛选
      if (filters.value.bases.length > 0) {
        const hasBase = cocktail.base.some((b) => filters.value.bases.includes(b))
        if (!hasBase) return false
      }

      // 口味筛选
      if (filters.value.tastes.length > 0) {
        const hasTaste = cocktail.taste.some((t) => filters.value.tastes.includes(t))
        if (!hasTaste) return false
      }

      // 难度筛选
      if (filters.value.difficulty.length > 0) {
        if (!filters.value.difficulty.includes(cocktail.difficulty)) return false
      }

      // 关键词搜索
      if (filters.value.keyword) {
        const keyword = filters.value.keyword.toLowerCase()
        const matchName = cocktail.name.toLowerCase().includes(keyword)
        const matchNameEn = cocktail.nameEn.toLowerCase().includes(keyword)
        const matchDesc = cocktail.description?.toLowerCase().includes(keyword)
        if (!matchName && !matchNameEn && !matchDesc) return false
      }

      return true
    })
  })

  // 获取单个调酒
  function getById(id: string): Cocktail | undefined {
    return allCocktails.value.find((c) => c.id === id)
  }

  // 添加自定义调酒
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

  // 删除自定义调酒
  function removeCocktail(id: string) {
    const index = allCocktails.value.findIndex((c) => c.id === id)
    if (index !== -1 && allCocktails.value[index].isCustom) {
      allCocktails.value.splice(index, 1)
      saveCocktails(allCocktails.value)
      return true
    }
    return false
  }

  // 更新自定义调酒
  function updateCocktail(id: string, data: Partial<Cocktail>) {
    const index = allCocktails.value.findIndex((c) => c.id === id)
    if (index !== -1 && allCocktails.value[index].isCustom) {
      allCocktails.value[index] = { ...allCocktails.value[index], ...data }
      saveCocktails(allCocktails.value)
      return allCocktails.value[index]
    }
    return null
  }

  // 清除所有筛选
  function clearFilters() {
    filters.value = {
      bases: [],
      tastes: [],
      difficulty: [],
      keyword: '',
    }
  }

  // 切换基酒筛选
  function toggleBase(base: string) {
    const index = filters.value.bases.indexOf(base as any)
    if (index === -1) {
      filters.value.bases.push(base as any)
    } else {
      filters.value.bases.splice(index, 1)
    }
  }

  // 切换口味筛选
  function toggleTaste(taste: string) {
    const index = filters.value.tastes.indexOf(taste as any)
    if (index === -1) {
      filters.value.tastes.push(taste as any)
    } else {
      filters.value.tastes.splice(index, 1)
    }
  }

  // 切换难度筛选
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
    getById,
    addCocktail,
    removeCocktail,
    updateCocktail,
    clearFilters,
    toggleBase,
    toggleTaste,
    toggleDifficulty,
  }
}
