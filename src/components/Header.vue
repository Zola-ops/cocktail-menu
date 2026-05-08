<template>
  <header class="sticky top-0 z-50 bg-[var(--cyber-dark)]/95 backdrop-blur-xl border-b border-[var(--neon-cyan)]/30 shadow-lg">
    <div class="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)]/5 via-transparent to-[var(--neon-cyan)]/5"></div>
    <div class="container mx-auto px-4 py-3 sm:py-4 relative z-10">
      <div class="flex items-center justify-between gap-3 sm:gap-4">
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div class="relative">
            <span class="text-2xl sm:text-3xl">🍸</span>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-[var(--neon-pink)] rounded-full animate-pulse shadow-[var(--glow-pink)]"></div>
          </div>
          <div>
            <h1 class="text-lg sm:text-xl font-bold text-white tracking-wider glow-text-cyan" style="font-family: 'Orbitron', monospace;">
              <span class="text-[var(--neon-cyan)]">下班后的</span><span class="text-[var(--neon-pink)]">赛博酒馆</span>
            </h1>
            <p class="hidden sm:block text-xs text-[var(--neon-pink)] tracking-[0.3em]" style="font-family: 'Orbitron', monospace; text-shadow: var(--glow-pink);">
              CYBERPUNK BAR
            </p>
          </div>
        </div>

        <div class="hidden sm:flex flex-1 justify-center mx-4">
          <div class="relative w-full max-w-md">
            <input
              :value="keyword"
              @input="$emit('update:keyword', ($event.target as HTMLInputElement).value)"
              type="text"
              placeholder="// 搜索调酒..."
              class="w-full px-4 py-2 pl-10 bg-[var(--cyber-dark-2)] border border-[var(--neon-cyan)]/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)] transition-all cursor-text"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div class="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <button
            @click="$emit('ai')"
            class="flex items-center justify-center w-14 h-14 sm:w-auto sm:h-auto px-5 sm:px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] hover:opacity-90 text-white shadow-[var(--glow-purple)] hover:shadow-[0_0_30px_rgba(211,0,197,0.9)] active:scale-95"
            style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            title="AI 调酒"
          >
            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="hidden sm:inline ml-2">AI</span>
          </button>

          <button
            @click="$emit('add')"
            class="flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-[var(--neon-cyan)]/20 hover:bg-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] hover:shadow-[var(--glow-cyan)]"
            style="font-family: 'Orbitron', monospace; letter-spacing: 1px;"
            title="添加调酒"
          >
            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="ml-2">添加</span>
          </button>
        </div>
      </div>

      <div class="sm:hidden mt-3">
        <div class="relative">
          <input
            :value="keyword"
            @input="$emit('update:keyword', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="// 搜索调酒..."
            class="w-full px-4 py-2 pl-10 bg-[var(--cyber-dark-2)] border border-[var(--neon-cyan)]/30 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)] transition"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
