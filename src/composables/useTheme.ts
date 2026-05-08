import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'cocktail-menu-theme'

const theme = ref<Theme>('dark')

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
  } catch (e) {
    console.error('Failed to load theme:', e)
  }
  return 'dark'
}

function saveTheme(newTheme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, newTheme)
  } catch (e) {
    console.error('Failed to save theme:', e)
  }
}

function applyTheme(newTheme: Theme) {
  if (newTheme === 'light') {
    document.documentElement.classList.add('light')
  } else {
    document.documentElement.classList.remove('light')
  }
}

export function useTheme() {
  onMounted(() => {
    theme.value = loadTheme()
    applyTheme(theme.value)
  })

  watch(theme, (newTheme) => {
    applyTheme(newTheme)
    saveTheme(newTheme)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}
