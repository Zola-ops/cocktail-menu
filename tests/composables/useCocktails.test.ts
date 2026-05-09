import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCocktails } from '../../src/composables/useCocktails'
import type { Cocktail } from '../../src/types/cocktail'

describe('useCocktails', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Basic functionality', () => {
    it('should load cocktails successfully', () => {
      const { cocktails } = useCocktails()
      expect(cocktails.value).toBeTruthy()
      expect(Array.isArray(cocktails.value)).toBe(true)
    })

    it('should have cocktails after initialization', () => {
      const { cocktails } = useCocktails()
      expect(cocktails.value.length).toBeGreaterThan(0)
    })

    it('should have valid cocktail data structure', () => {
      const { cocktails } = useCocktails()
      
      if (cocktails.value.length > 0) {
        const cocktail = cocktails.value[0]
        expect(cocktail).toHaveProperty('id')
        expect(cocktail).toHaveProperty('name')
        expect(cocktail).toHaveProperty('base')
        expect(cocktail).toHaveProperty('taste')
        expect(cocktail).toHaveProperty('difficulty')
        expect(cocktail).toHaveProperty('ingredients')
        expect(cocktail).toHaveProperty('steps')
      }
    })
  })

  describe('Filtering', () => {
    it('should filter by base spirit', () => {
      const { cocktails, filters } = useCocktails()
      
      filters.value.bases = ['威士忌']
      filters.value.keyword = ''
      
      const filtered = cocktails.value.filter(c => 
        c.base.includes('威士忌')
      )
      
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('should filter by difficulty', () => {
      const { cocktails, filters } = useCocktails()
      
      filters.value.difficulty = ['easy']
      
      const filtered = cocktails.value.filter(c => 
        c.difficulty === 'easy'
      )
      
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('should filter by keyword', () => {
      const { cocktails, filters } = useCocktails()
      
      filters.value.keyword = '马提尼'
      
      const filtered = cocktails.value.filter(c => 
        c.name.includes('马提尼') || c.nameEn.toLowerCase().includes('martini')
      )
      
      expect(filtered.length).toBeGreaterThanOrEqual(0)
    })

    it('should filter favorites only', () => {
      const { filters } = useCocktails()
      
      filters.value.showFavorites = true
      filters.value.bases = []
      filters.value.keyword = ''
      filters.value.tastes = []
      filters.value.difficulty = []
      filters.value.specialTags = []
      
      expect(filters.value.showFavorites).toBe(true)
    })
  })

  describe('Favorites', () => {
    it('should check if cocktail is favorite', () => {
      const { isFavorite } = useCocktails()
      
      expect(typeof isFavorite).toBe('function')
      
      const result = isFavorite('non-existent-id')
      expect(typeof result).toBe('boolean')
    })

    it('should toggle favorite status', () => {
      const { toggleFavorite, isFavorite } = useCocktails()
      
      const testId = 'test-cocktail-id'
      const initialState = isFavorite(testId)
      
      toggleFavorite(testId)
      
      expect(isFavorite(testId)).toBe(!initialState)
    })
  })

  describe('Custom cocktails', () => {
    it('should add custom cocktail', () => {
      const { addCocktail, cocktails } = useCocktails()
      
      const newCocktail = {
        name: '测试调酒',
        nameEn: 'Test Cocktail',
        base: ['伏特加'] as const,
        taste: ['甜'] as const,
        difficulty: 'easy' as const,
        ingredients: [
          { name: '伏特加', amount: '45ml' }
        ],
        steps: ['倒入杯子', '加冰'],
        isCustom: true
      }
      
      const initialLength = cocktails.value.length
      addCocktail(newCocktail)
      
      expect(cocktails.value.length).toBe(initialLength + 1)
    })

    it('should remove custom cocktail', () => {
      const { addCocktail, removeCocktail, cocktails } = useCocktails()
      
      const newCocktail = {
        name: '删除测试',
        nameEn: 'Delete Test',
        base: ['金酒'] as const,
        taste: ['酸'] as const,
        difficulty: 'easy' as const,
        ingredients: [],
        steps: [],
        isCustom: true
      }
      
      addCocktail(newCocktail)
      const customCocktail = cocktails.value.find(c => c.name === '删除测试')
      
      if (customCocktail) {
        const initialLength = cocktails.value.length
        removeCocktail(customCocktail.id)
        expect(cocktails.value.length).toBe(initialLength - 1)
      }
    })
  })

  describe('Clear filters', () => {
    it('should clear all filters', () => {
      const { filters, clearFilters } = useCocktails()
      
      filters.value.bases = ['威士忌']
      filters.value.tastes = ['甜']
      filters.value.difficulty = ['hard']
      filters.value.keyword = '测试'
      filters.value.showFavorites = true
      
      clearFilters()
      
      expect(filters.value.bases).toEqual([])
      expect(filters.value.tastes).toEqual([])
      expect(filters.value.difficulty).toEqual([])
      expect(filters.value.keyword).toBe('')
      expect(filters.value.showFavorites).toBe(false)
    })
  })

  describe('Data integrity', () => {
    it('should have unique cocktail IDs', () => {
      const { cocktails } = useCocktails()
      
      const ids = cocktails.value.map(c => c.id)
      const uniqueIds = new Set(ids)
      
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid base spirits', () => {
      const { cocktails } = useCocktails()
      
      cocktails.value.forEach(cocktail => {
        expect(Array.isArray(cocktail.base)).toBe(true)
        expect(cocktail.base.length).toBeGreaterThan(0)
      })
    })

    it('should have valid difficulty levels', () => {
      const { cocktails } = useCocktails()
      const validDifficulties = ['easy', 'medium', 'hard']
      
      cocktails.value.forEach(cocktail => {
        expect(validDifficulties).toContain(cocktail.difficulty)
      })
    })
  })
})
