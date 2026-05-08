<template>
  <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
    <div class="container mx-auto px-4 py-3 sm:py-4">
      <div class="flex items-center justify-between gap-3 sm:gap-4">
        <!-- Logo & Title -->
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span class="text-2xl sm:text-3xl">🍸</span>
          <div>
            <h1 class="text-lg sm:text-xl font-bold text-white">调酒菜单</h1>
            <p class="hidden sm:block text-xs text-slate-400">Cocktail Menu</p>
          </div>
        </div>

        <!-- Search - 桌面端显示，移动端隐藏 -->
        <div class="hidden sm:flex flex-1 max-w-md">
          <div class="relative w-full">
            <input
              :value="keyword"
              @input="$emit('update:keyword', ($event.target as HTMLInputElement).value)"
              type="text"
              placeholder="搜索调酒..."
              class="w-full px-4 py-2 pl-10 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- AI Button -->
          <button
            @click="$emit('ai')"
            class="touch-friendly flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition"
            title="AI 生成"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="hidden sm:inline ml-1 sm:ml-2">AI</span>
          </button>

          <!-- Add Button -->
          <button
            @click="$emit('add')"
            class="touch-friendly flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
            title="添加调酒"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="hidden sm:inline ml-1 sm:ml-2">添加</span>
          </button>
        </div>
      </div>

      <!-- Mobile Search - 移动端显示，桌面端隐藏 -->
      <div class="sm:hidden mt-3">
        <div class="relative">
          <input
            :value="keyword"
            @input="$emit('update:keyword', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="搜索调酒..."
            class="w-full px-4 py-2 pl-10 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  keyword: string
}>()

defineEmits<{
  'update:keyword': [value: string]
  'add': []
  'ai': []
}>()
</script>
