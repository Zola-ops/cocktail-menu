import { ref, onMounted, onUnmounted } from 'vue'

interface SwipeState {
  startX: number
  startY: number
  startTime: number
  isSwiping: boolean
  deltaX: number
  deltaY: number
}

export function useTouch() {
  const swipeState = ref<SwipeState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    isSwiping: false,
    deltaX: 0,
    deltaY: 0
  })

  const touchFeedback = ref(false)

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    swipeState.value = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isSwiping: true,
      deltaX: 0,
      deltaY: 0
    }
    touchFeedback.value = true
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!swipeState.value.isSwiping) return

    const touch = e.touches[0]
    swipeState.value.deltaX = touch.clientX - swipeState.value.startX
    swipeState.value.deltaY = touch.clientY - swipeState.value.startY
  }

  const onTouchEnd = () => {
    const duration = Date.now() - swipeState.value.startTime
    const { deltaX, deltaY } = swipeState.value

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        return 'swipe-right'
      } else {
        return 'swipe-left'
      }
    }

    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0) {
        return 'swipe-down'
      } else {
        return 'swipe-up'
      }
    }

    if (duration < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      return 'tap'
    }

    return null
  }

  const addHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const durations = {
        light: 10,
        medium: 25,
        heavy: 50
      }
      navigator.vibrate(durations[type])
    }
  }

  const preventDefaultScroll = (e: TouchEvent) => {
    if (e.touches.length > 1) return

    const touch = e.touches[0]
    const target = e.target as HTMLElement

    if (target.scrollHeight > target.clientHeight &&
        target.scrollWidth > target.clientWidth) {
      const scrollTop = target.scrollTop
      const scrollHeight = target.scrollHeight
      const clientHeight = target.clientHeight
      const scrollLeft = target.scrollLeft
      const scrollWidth = target.scrollWidth
      const clientWidth = target.clientWidth

      const isAtTop = scrollTop <= 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight
      const isAtLeft = scrollLeft <= 0
      const isAtRight = scrollLeft + clientWidth >= scrollWidth

      const isScrollingVertically = Math.abs(touch.clientY - swipeState.value.startY) >
                                    Math.abs(touch.clientX - swipeState.value.startX)

      if ((isAtTop && touch.clientY > swipeState.value.startY) ||
          (isAtBottom && touch.clientY < swipeState.value.startY)) {
        if (isScrollingVertically) {
          e.preventDefault()
        }
      }

      if ((isAtLeft && touch.clientX > swipeState.value.startX) ||
          (isAtRight && touch.clientX < swipeState.value.startX)) {
        if (!isScrollingVertically) {
          e.preventDefault()
        }
      }
    }
  }

  const setupTouchHandlers = (element: HTMLElement, callbacks: {
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
    onTap?: () => void
  }) => {
    const handleTouchEnd = () => {
      const direction = onTouchEnd()
      if (direction) {
        addHapticFeedback('light')
        switch (direction) {
          case 'swipe-left':
            callbacks.onSwipeLeft?.()
            break
          case 'swipe-right':
            callbacks.onSwipeRight?.()
            break
          case 'swipe-up':
            callbacks.onSwipeUp?.()
            break
          case 'swipe-down':
            callbacks.onSwipeDown?.()
            break
          case 'tap':
            callbacks.onTap?.()
            break
        }
      }
      touchFeedback.value = false
    }

    element.addEventListener('touchstart', onTouchStart, { passive: true })
    element.addEventListener('touchmove', onTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchmove', onTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }

  return {
    swipeState,
    touchFeedback,
    setupTouchHandlers,
    addHapticFeedback,
    preventDefaultScroll
  }
}
