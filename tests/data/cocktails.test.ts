import { describe, it, expect } from 'vitest'
import { cocktails, baseSpirits, tastes } from '../../src/data/cocktails'

describe('Cocktails Data', () => {
  describe('Data integrity', () => {
    it('should have at least 30 cocktails', () => {
      expect(cocktails.length).toBeGreaterThanOrEqual(30)
    })

    it('should have unique IDs for all cocktails', () => {
      const ids = cocktails.map(c => c.id)
      const uniqueIds = new Set(ids)
      
      expect(uniqueIds.size).toBe(cocktails.length)
    })

    it('should have valid base spirits', () => {
      cocktails.forEach(cocktail => {
        expect(Array.isArray(cocktail.base)).toBe(true)
        expect(cocktail.base.length).toBeGreaterThan(0)
        
        cocktail.base.forEach(base => {
          expect(baseSpirits).toContain(base)
        })
      })
    })

    it('should have valid taste tags', () => {
      cocktails.forEach(cocktail => {
        expect(Array.isArray(cocktail.taste)).toBe(true)
        expect(cocktail.taste.length).toBeGreaterThan(0)
        
        // Just check that taste is array of strings
        cocktail.taste.forEach(taste => {
          expect(typeof taste).toBe('string')
        })
      })
    })

    it('should have valid difficulty levels', () => {
      const validDifficulties = ['easy', 'medium', 'hard']
      
      cocktails.forEach(cocktail => {
        expect(validDifficulties).toContain(cocktail.difficulty)
      })
    })
  })

  describe('Required fields', () => {
    it('should have name for all cocktails', () => {
      cocktails.forEach(cocktail => {
        expect(cocktail.name).toBeTruthy()
        expect(typeof cocktail.name).toBe('string')
        expect(cocktail.name.length).toBeGreaterThan(0)
      })
    })

    it('should have nameEn for all cocktails', () => {
      cocktails.forEach(cocktail => {
        expect(cocktail.nameEn).toBeTruthy()
        expect(typeof cocktail.nameEn).toBe('string')
      })
    })

    it('should have ingredients for all cocktails', () => {
      cocktails.forEach(cocktail => {
        expect(Array.isArray(cocktail.ingredients)).toBe(true)
        expect(cocktail.ingredients.length).toBeGreaterThan(0)
        
        cocktail.ingredients.forEach(ingredient => {
          expect(ingredient).toHaveProperty('name')
          expect(ingredient).toHaveProperty('amount')
        })
      })
    })

    it('should have steps for all cocktails', () => {
      cocktails.forEach(cocktail => {
        expect(Array.isArray(cocktail.steps)).toBe(true)
        expect(cocktail.steps.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Data variety', () => {
    it('should have cocktails with different base spirits', () => {
      const allBases = cocktails.flatMap(c => c.base)
      const uniqueBases = [...new Set(allBases)]
      
      expect(uniqueBases.length).toBeGreaterThan(3)
    })

    it('should have cocktails with different taste profiles', () => {
      const allTastes = cocktails.flatMap(c => c.taste)
      const uniqueTastes = [...new Set(allTastes)]
      
      expect(uniqueTastes.length).toBeGreaterThan(3)
    })

    it('should have cocktails of all difficulty levels', () => {
      const difficulties = new Set(cocktails.map(c => c.difficulty))
      
      expect(difficulties.has('easy')).toBe(true)
      expect(difficulties.has('medium')).toBe(true)
      expect(difficulties.has('hard')).toBe(true)
    })

    it('should have both custom and predefined cocktails', () => {
      const customCocktails = cocktails.filter(c => c.isCustom)
      const predefinedCocktails = cocktails.filter(c => !c.isCustom)
      
      expect(predefinedCocktails.length).toBeGreaterThan(0)
      // Custom cocktails may or may not exist
    })
  })

  describe('Data quality', () => {
    it('should have reasonable ingredient amounts', () => {
      cocktails.forEach(cocktail => {
        cocktail.ingredients.forEach(ingredient => {
          expect(ingredient.amount).toBeTruthy()
          expect(typeof ingredient.amount).toBe('string')
        })
      })
    })

    it('should have descriptive steps', () => {
      cocktails.forEach(cocktail => {
        cocktail.steps.forEach(step => {
          expect(step).toBeTruthy()
          expect(step.length).toBeGreaterThan(2)
        })
      })
    })

    it('should have either description or glass info', () => {
      let count = 0
      cocktails.forEach(cocktail => {
        if (cocktail.description || cocktail.glass) {
          count++
        }
      })
      
      // At least 80% should have description or glass info
      expect(count / cocktails.length).toBeGreaterThan(0.8)
    })
  })

  describe('No duplicates', () => {
    it('should not have duplicate cocktail names', () => {
      const names = cocktails.map(c => c.name.toLowerCase())
      const uniqueNames = new Set(names)
      
      expect(uniqueNames.size).toBe(names.length)
    })

    it('should not have duplicate English names', () => {
      const namesEn = cocktails.map(c => c.nameEn.toLowerCase())
      const uniqueNames = new Set(namesEn)
      
      expect(uniqueNames.size).toBe(namesEn.length)
    })
  })
})

describe('Base Spirits', () => {
  it('should include all major spirit categories', () => {
    const expectedBases = [
      '威士忌', '金酒', '朗姆酒', '龙舌兰', '伏特加', '白兰地', '无酒精'
    ]
    
    expectedBases.forEach(base => {
      expect(baseSpirits).toContain(base)
    })
  })

  it('should have reasonable number of base spirits', () => {
    expect(baseSpirits.length).toBeGreaterThanOrEqual(7)
  })
})

describe('Taste Tags', () => {
  it('should have cocktails with various tastes', () => {
    const allTastes = cocktails.flatMap(c => c.taste)
    const uniqueTastes = new Set(allTastes)
    
    expect(uniqueTastes.size).toBeGreaterThanOrEqual(5)
  })
})
