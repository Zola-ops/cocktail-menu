export interface Ingredient {
  name: string
  amount: string
}

export interface Cocktail {
  id: string
  name: string
  nameEn: string
  image?: string
  base: BaseSpirit[]
  taste: TasteTag[]
  difficulty: 'easy' | 'medium' | 'hard'
  ingredients: Ingredient[]
  steps: string[]
  garnish?: string
  glass?: string
  description?: string
  tags?: string[]
  origin?: string
  alcoholContent?: string
  isCustom: boolean
  createdAt?: string
}

export type BaseSpirit = 
  | '威士忌' 
  | '金酒' 
  | '朗姆酒' 
  | '龙舌兰' 
  | '伏特加' 
  | '白兰地' 
  | '无酒精'

export type TasteTag = 
  | '甜' 
  | '酸' 
  | '苦' 
  | '果味' 
  | '草本' 
  | '奶香' 
  | '气泡' 
  | '咸' 
  | '辣' 
  | '茶香'
  | '泥煤味'

export interface FilterState {
  bases: BaseSpirit[]
  tastes: TasteTag[]
  difficulty: string[]
  keyword: string
  specialTags: string[]
  sortBy: 'name' | 'difficulty' | 'createdAt'
  showFavorites: boolean
  showCustomOnly: boolean
}
