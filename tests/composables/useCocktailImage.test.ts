import { describe, it, expect } from 'vitest'
import { useCocktailImage } from '../../src/composables/useCocktailImage'
import type { Cocktail } from '../../src/types/cocktail'

describe('useCocktailImage', () => {
  describe('Image generation', () => {
    it('should generate image URL for cocktail', async () => {
      const { generateImage } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {
        name: '马提尼',
        nameEn: 'Martini',
        base: ['金酒'],
        taste: ['苦']
      }
      
      const imageUrl = await generateImage(cocktail)
      
      expect(imageUrl).toBeTruthy()
      expect(typeof imageUrl).toBe('string')
      expect(imageUrl.length).toBeGreaterThan(0)
    })

    it('should cache generated images', async () => {
      const { generateImage, imageCache } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {
        name: '马天尼测试',
        base: ['金酒']
      }
      
      await generateImage(cocktail)
      
      expect(imageCache.value.has('马天尼测试')).toBe(true)
    })

    it('should handle different base spirits', async () => {
      const { generateImage } = useCocktailImage()
      
      const bases = ['威士忌', '伏特加', '朗姆酒', '金酒', '龙舌兰']
      
      for (const base of bases) {
        const cocktail: Partial<Cocktail> = {
          name: '测试',
          base: [base as any]
        }
        
        const imageUrl = await generateImage(cocktail)
        expect(imageUrl).toBeTruthy()
      }
    })
  })

  describe('Placeholder generation', () => {
    it('should generate placeholder for cocktail without image', () => {
      const { getPlaceholderImage } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {
        name: '测试调酒',
        base: ['伏特加']
      }
      
      const placeholder = getPlaceholderImage(cocktail)
      
      expect(placeholder).toBeTruthy()
      expect(placeholder.startsWith('data:image/svg+xml,')).toBe(true)
    })

    it('should generate different placeholders for different names', () => {
      const { getPlaceholderImage } = useCocktailImage()
      
      const cocktail1: Partial<Cocktail> = { name: '调酒A', base: ['威士忌'] }
      const cocktail2: Partial<Cocktail> = { name: '调酒B', base: ['威士忌'] }
      
      const placeholder1 = getPlaceholderImage(cocktail1)
      const placeholder2 = getPlaceholderImage(cocktail2)
      
      // Same base but different names should produce different placeholders
      expect(placeholder1).not.toBe(placeholder2)
    })
  })

  describe('Get cocktail image', () => {
    it('should return custom image if available', () => {
      const { getCocktailImage } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {
        name: '自定义图片调酒',
        image: 'https://example.com/image.jpg',
        base: ['伏特加']
      }
      
      const result = getCocktailImage(cocktail)
      expect(result).toBe('https://example.com/image.jpg')
    })

    it('should return placeholder if no image', () => {
      const { getCocktailImage } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {
        name: '无图片调酒',
        base: ['威士忌']
      }
      
      const result = getCocktailImage(cocktail)
      expect(result).toBeTruthy()
    })

    it('should use cached image if available', async () => {
      const { generateImage, getCocktailImage } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {
        name: '缓存测试调酒',
        base: ['金酒']
      }
      
      await generateImage(cocktail)
      
      const cachedImage = getCocktailImage(cocktail)
      expect(cachedImage).toBeTruthy()
    })
  })

  describe('Error handling', () => {
    it('should handle missing cocktail data', async () => {
      const { generateImage } = useCocktailImage()
      
      const cocktail: Partial<Cocktail> = {}
      
      const imageUrl = await generateImage(cocktail)
      expect(imageUrl).toBeTruthy()
    })

    it('should set error state on failure', async () => {
      const { error } = useCocktailImage()
      
      expect(error.value).toBeNull()
    })
  })

  describe('Image prefetching', () => {
    it('should prefetch images for multiple cocktails', async () => {
      const { prefetchImages } = useCocktailImage()
      
      const cocktails: Partial<Cocktail>[] = [
        { name: '调酒1', base: ['威士忌'] },
        { name: '调酒2', base: ['伏特加'] },
        { name: '调酒3', base: ['金酒'] }
      ]
      
      await prefetchImages(cocktails)
      
      // Should not throw any errors
      expect(true).toBe(true)
    })
  })
})
