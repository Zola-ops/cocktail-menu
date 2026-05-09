import { ref } from 'vue'
import type { Cocktail } from '../types/cocktail'

const UNSPLASH_ACCESS_KEY = 'demo' // Replace with actual key if needed

export function useCocktailImage() {
  const imageCache = ref<Map<string, string>>(new Map())
  const isGenerating = ref(false)
  const error = ref<string | null>(null)

  const generateCocktailPrompt = (cocktail: Partial<Cocktail>): string => {
    const base = cocktail.base?.[0] || 'cocktail'
    const tastes = cocktail.taste?.join(' and ') || 'refreshing'
    const name = cocktail.nameEn || cocktail.name || 'cocktail'
    
    const style = Math.random() > 0.5 
      ? 'cyberpunk neon aesthetic, dark background with glowing colors'
      : 'elegant cocktail photography, professional bar lighting'
    
    return `${name} cocktail, ${tastes} taste, ${base} based drink, ${style}, high quality, 4k`
  }

  const generateImage = async (cocktail: Partial<Cocktail>): Promise<string> => {
    isGenerating.value = true
    error.value = null

    try {
      const prompt = generateCocktailPrompt(cocktail)
      const encodedPrompt = encodeURIComponent(prompt)
      
      // Try using the built-in image generation API
      const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=landscape_4_3`
      
      imageCache.value.set(cocktail.name || cocktail.nameEn || '', imageUrl)
      return imageUrl
    } catch (err) {
      error.value = 'Failed to generate image'
      console.error('Image generation error:', err)
      return getPlaceholderImage(cocktail)
    } finally {
      isGenerating.value = false
    }
  }

  const getPlaceholderImage = (cocktail: Partial<Cocktail>): string => {
    // Generate a deterministic placeholder based on cocktail name
    const name = cocktail.name || cocktail.nameEn || 'cocktail'
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    
    // Use a gradient placeholder with cocktail colors
    const hue = Math.abs(hash % 360)
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:hsl(${hue}, 70%, 30%);stop-opacity:1" />
            <stop offset="100%" style="stop-color:hsl(${(hue + 60) % 360}, 70%, 20%);stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect fill="url(#grad)" width="400" height="300"/>
        <text x="200" y="140" font-family="Arial" font-size="24" fill="white" text-anchor="middle" filter="url(#glow)">
          🍸 ${name}
        </text>
        <text x="200" y="180" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">
          ${cocktail.base?.join(', ') || 'Mixed Cocktail'}
        </text>
      </svg>
    `)}`
  }

  const getCocktailImage = (cocktail: Partial<Cocktail>): string => {
    if ((cocktail as any).imageUrl) {
      return (cocktail as any).imageUrl
    }
    
    if (cocktail.image) {
      return cocktail.image
    }
    
    const cacheKey = cocktail.name || cocktail.nameEn || ''
    if (imageCache.value.has(cacheKey)) {
      return imageCache.value.get(cacheKey)!
    }
    
    return getPlaceholderImage(cocktail)
  }

  const prefetchImages = async (cocktails: Partial<Cocktail>[]) => {
    // Prefetch images for visible cocktails
    const visibleCocktails = cocktails.slice(0, 8)
    
    await Promise.all(
      visibleCocktails.map(cocktail => 
        generateImage(cocktail).catch(console.error)
      )
    )
  }

  return {
    imageCache,
    isGenerating,
    error,
    generateImage,
    getCocktailImage,
    getPlaceholderImage,
    prefetchImages
  }
}

// Predefined cocktail images from Unsplash (free to use)
export const cocktailImages: Record<string, string> = {
  'default': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
  'whiskey': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=300&fit=crop',
  'gin': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop',
  'rum': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop',
  'vodka': 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=400&h=300&fit=crop',
  'tequila': 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=400&h=300&fit=crop',
  'brandy': 'https://images.unsplash.com/photo-1541544181051-64ed27892d4a?w=400&h=300&fit=crop',
  'non-alcoholic': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
}

export function getImageForBase(base: string): string {
  const baseKey = base.toLowerCase()
  if (baseKey.includes('威士忌') || baseKey.includes('whiskey')) {
    return cocktailImages['whiskey']
  }
  if (baseKey.includes('金酒') || baseKey.includes('gin')) {
    return cocktailImages['gin']
  }
  if (baseKey.includes('朗姆') || baseKey.includes('rum')) {
    return cocktailImages['rum']
  }
  if (baseKey.includes('伏特加') || baseKey.includes('vodka')) {
    return cocktailImages['vodka']
  }
  if (baseKey.includes('龙舌兰') || baseKey.includes('tequila')) {
    return cocktailImages['tequila']
  }
  if (baseKey.includes('白兰地') || baseKey.includes('brandy')) {
    return cocktailImages['brandy']
  }
  if (baseKey.includes('无酒精') || baseKey.includes('non')) {
    return cocktailImages['non-alcoholic']
  }
  return cocktailImages['default']
}
