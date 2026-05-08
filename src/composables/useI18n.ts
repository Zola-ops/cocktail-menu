import { ref, computed, onMounted } from 'vue'

export type Locale = 'zh' | 'en'

const LOCALE_KEY = 'cocktail-menu-locale'

const translations = {
  zh: {
    app: {
      title: '调酒菜单',
      subtitle: 'Cocktail Menu',
    },
    header: {
      search: '搜索调酒...',
      add: '添加',
    },
    filter: {
      base: '基酒',
      taste: '口味',
      specialTags: '特色标签',
      difficulty: '难度',
      sort: '排序',
      sortByName: '按名称',
      sortByDifficulty: '按难度',
      sortByCreatedAt: '按添加时间',
      clear: '清除筛选',
    },
    cocktail: {
      count: '共 {count} 款调酒',
      favorite: '收藏',
      unfavorite: '已收藏',
      custom: '自定义',
      delete: '删除',
      myCreation: '我的创作',
      creation: '创作',
    },
    detail: {
      ingredients: '配方',
      steps: '制作步骤',
      glass: '杯型',
      garnish: '装饰',
      deleteConfirm: '确定要删除这款自定义调酒吗？',
      deleteButton: '删除这款自定义调酒',
    },
    add: {
      title: '添加自定义调酒',
      name: '调酒名称',
      namePlaceholder: '例如：我的特调',
      nameEn: '英文名',
      nameEnPlaceholder: '例如：My Special',
      base: '基酒类型',
      taste: '口味标签',
      difficulty: '难度',
      ingredients: '配方',
      addIngredient: '+ 添加材料',
      steps: '制作步骤',
      addStep: '+ 添加步骤',
      glass: '杯型',
      glassPlaceholder: '例如：高球杯',
      garnish: '装饰',
      garnishPlaceholder: '例如：柠檬片',
      description: '简介',
      descriptionPlaceholder: '简单描述这款调酒...',
      submit: '添加调酒',
    },
    difficulty: {
      easy: '简单',
      medium: '中等',
      hard: '困难',
    },
    empty: {
      title: '没有找到匹配的调酒',
      clearFilter: '清除筛选',
    },
    favorite: {
      title: '我的收藏',
    },
  },
  en: {
    app: {
      title: 'Cocktail Menu',
      subtitle: 'Cocktail Menu',
    },
    header: {
      search: 'Search cocktails...',
      add: 'Add',
    },
    filter: {
      base: 'Base Spirit',
      taste: 'Taste',
      specialTags: 'Special Tags',
      difficulty: 'Difficulty',
      sort: 'Sort',
      sortByName: 'By Name',
      sortByDifficulty: 'By Difficulty',
      sortByCreatedAt: 'By Date Added',
      clear: 'Clear Filters',
    },
    cocktail: {
      count: '{count} cocktails',
      favorite: 'Favorite',
      unfavorite: 'Favorited',
      custom: 'Custom',
      delete: 'Delete',
      myCreation: 'My Creations',
      creation: 'Create',
    },
    detail: {
      ingredients: 'Ingredients',
      steps: 'Instructions',
      glass: 'Glass',
      garnish: 'Garnish',
      deleteConfirm: 'Are you sure you want to delete this custom cocktail?',
      deleteButton: 'Delete This Cocktail',
    },
    add: {
      title: 'Add Custom Cocktail',
      name: 'Cocktail Name',
      namePlaceholder: 'e.g., My Special',
      nameEn: 'English Name',
      nameEnPlaceholder: 'e.g., My Special',
      base: 'Base Spirit',
      taste: 'Taste Tags',
      difficulty: 'Difficulty',
      ingredients: 'Ingredients',
      addIngredient: '+ Add Ingredient',
      steps: 'Instructions',
      addStep: '+ Add Step',
      glass: 'Glass Type',
      glassPlaceholder: 'e.g., Highball Glass',
      garnish: 'Garnish',
      garnishPlaceholder: 'e.g., Lemon Slice',
      description: 'Description',
      descriptionPlaceholder: 'Brief description...',
      submit: 'Add Cocktail',
    },
    difficulty: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    },
    empty: {
      title: 'No cocktails found',
      clearFilter: 'Clear Filters',
    },
    favorite: {
      title: 'My Favorites',
    },
  },
}

const locale = ref<Locale>('zh')

function loadLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved === 'zh' || saved === 'en') {
      return saved
    }
  } catch (e) {
    console.error('Failed to load locale:', e)
  }
  return 'zh'
}

function saveLocale(newLocale: Locale) {
  try {
    localStorage.setItem(LOCALE_KEY, newLocale)
  } catch (e) {
    console.error('Failed to save locale:', e)
  }
}

export function useI18n() {
  onMounted(() => {
    locale.value = loadLocale()
  })

  const t = computed(() => translations[locale.value])

  function setLocale(newLocale: Locale) {
    locale.value = newLocale
    saveLocale(newLocale)
  }

  function toggleLocale() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
    saveLocale(locale.value)
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  }
}
