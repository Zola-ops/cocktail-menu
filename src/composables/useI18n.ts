import { ref, computed, watch } from 'vue'
import { zhCN } from '../locales/zh-CN'
import { enUS } from '../locales/en-US'

export type Locale = 'zh-CN' | 'en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

const currentLocale = ref<Locale>('zh-CN')

export function useI18n() {
  const locale = computed({
    get: () => currentLocale.value,
    set: (value: Locale) => {
      currentLocale.value = value
      localStorage.setItem('locale', value)
      document.documentElement.lang = value
    }
  })

  const t = (key: string, params?: Record<string, string | number>): string => {
    const message = messages[currentLocale.value][key as keyof typeof zhCN] || key

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, String(v)),
        message as string
      )
    }

    return message as string
  }

  const toggleLocale = () => {
    locale.value = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }

  const isZhCN = computed(() => currentLocale.value === 'zh-CN')
  const isEnUS = computed(() => currentLocale.value === 'en-US')

  const initLocale = () => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && messages[savedLocale]) {
      currentLocale.value = savedLocale
      document.documentElement.lang = savedLocale
    } else {
      const browserLang = navigator.language
      if (browserLang.startsWith('en')) {
        currentLocale.value = 'en-US'
        document.documentElement.lang = 'en-US'
      } else {
        currentLocale.value = 'zh-CN'
        document.documentElement.lang = 'zh-CN'
      }
    }
  }

  watch(currentLocale, (newLocale) => {
    localStorage.setItem('locale', newLocale)
  })

  return {
    locale,
    t,
    toggleLocale,
    isZhCN,
    isEnUS,
    initLocale,
    messages
  }
}

export const availableLocales = [
  { value: 'zh-CN', label: '中文', nativeLabel: '中文' },
  { value: 'en-US', label: 'English', nativeLabel: 'English' }
] as const
