<template>
  <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <span class="text-3xl">🍸</span>
          <div>
            <h1 class="text-xl font-bold text-white">调酒菜单</h1>
            <p class="text-xs text-slate-400">Cocktail Menu</p>
          </div>
        </div>

        <!-- Search -->
        <div class="flex-1 max-w-md">
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

        <!-- Add Button -->
        <button
          @click="$emit('ai')"
          class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI
        </button>

        <button
          @click="$emit('add')"
          class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          添加
        </button>
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
