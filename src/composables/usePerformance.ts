import { ref, computed, watch, type Ref } from 'vue'

export function useLazyLoad() {
  const imageLoaded = ref<Record<string, boolean>>({})
  const imageError = ref<Record<string, boolean>>({})

  const lazyImageObserver = ref<IntersectionObserver | null>(null)

  const initObserver = () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      lazyImageObserver.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
              }
              lazyImageObserver.value?.unobserve(img)
            }
          })
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      )
    }
  }

  const observeImage = (element: HTMLImageElement, imageId: string) => {
    if (lazyImageObserver.value) {
      element.dataset.src = element.src
      element.src = ''
      lazyImageObserver.value.observe(element)
    }
  }

  const onImageLoad = (imageId: string) => {
    imageLoaded.value[imageId] = true
  }

  const onImageError = (imageId: string) => {
    imageError.value[imageId] = true
  }

  const isLoaded = (imageId: string) => {
    return imageLoaded.value[imageId]
  }

  const hasError = (imageId: string) => {
    return imageError.value[imageId]
  }

  const cleanup = () => {
    if (lazyImageObserver.value) {
      lazyImageObserver.value.disconnect()
      lazyImageObserver.value = null
    }
  }

  return {
    imageLoaded,
    imageError,
    initObserver,
    observeImage,
    onImageLoad,
    onImageError,
    isLoaded,
    hasError,
    cleanup
  }
}

export function usePerformance() {
  const metrics = ref({
    loadTime: 0,
    fcp: 0,
    lcp: 0,
    cls: 0
  })

  const measurePerformance = () => {
    if (typeof window === 'undefined') return

    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (perfData) {
      metrics.value.loadTime = perfData.loadEventEnd - perfData.startTime
    }

    const paintEntries = performance.getEntriesByType('paint')
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.value.fcp = entry.startTime
      }
    })
  }

  const getPerformanceScore = computed(() => {
    const { loadTime, fcp } = metrics.value

    if (loadTime < 2000 && fcp < 1000) return 'excellent'
    if (loadTime < 4000 && fcp < 2000) return 'good'
    if (loadTime < 6000) return 'fair'
    return 'poor'
  })

  const logMetrics = () => {
    console.log('Performance Metrics:', metrics.value)
    console.log('Performance Score:', getPerformanceScore.value)
  }

  return {
    metrics,
    measurePerformance,
    getPerformanceScore,
    logMetrics
  }
}

export function useVirtualScroll<T>(items: Ref<T[]>, itemHeight: number, containerHeight: number) {
  const scrollTop = ref(0)
  const visibleCount = ref(Math.ceil(containerHeight / itemHeight) + 2)
  const startIndex = ref(0)
  const endIndex = ref(visibleCount.value)

  const totalHeight = computed(() => items.value.length * itemHeight)

  const visibleItems = computed(() => {
    return items.value.slice(startIndex.value, endIndex.value).map((item: T, index: number) => ({
      ...item,
      virtualIndex: startIndex.value + index
    }))
  })

  const offsetY = computed(() => startIndex.value * itemHeight)

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement
    scrollTop.value = target.scrollTop
    startIndex.value = Math.floor(scrollTop.value / itemHeight)
    endIndex.value = Math.min(startIndex.value + visibleCount.value, items.value.length)
  }

  const setupScroll = (element: HTMLElement) => {
    element.addEventListener('scroll', onScroll)
    return () => {
      element.removeEventListener('scroll', onScroll)
    }
  }

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    setupScroll
  }
}
