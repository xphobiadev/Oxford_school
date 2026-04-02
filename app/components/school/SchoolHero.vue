<template>
  <section class="relative min-h-[500px] py-32 flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-navy-950 border-b border-gray-200 dark:border-gold-500/10 transition-colors duration-1000">
    <!-- Deep Space Background -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-gray-50 dark:from-navy-800 dark:via-navy-950 dark:to-navy-950 transition-colors duration-1000"></div>
    <div class="absolute inset-0 bg-pattern-grid opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay dark:mix-blend-overlay"></div>
    
    <!-- Luxurious Glows -->
    <div class="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gold-400/10 dark:bg-gold-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
    <div class="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-gray-300/30 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="relative z-10 text-center text-navy-900 dark:text-white px-6 w-full max-w-5xl mx-auto flex flex-col items-center group">
      
      <!-- Majestic Re-styled Emblem -->
      <div class="relative mb-16 z-20 mt-4">
        <!-- Outer rotating ring glow -->
        <div class="absolute inset-0 bg-gold-300/30 dark:bg-gold-400/20 blur-3xl rounded-full scale-100 group-hover:scale-[1.8] group-hover:bg-gold-400/40 dark:group-hover:bg-gold-500/20 transition-all duration-1000"></div>
        
        <!-- Emblem Diamond -->
        <div class="relative w-24 h-24 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] border-[1px] border-gold-500/40 bg-gradient-to-br from-white to-gray-50 dark:from-navy-900 dark:to-navy-800 flex items-center justify-center shadow-[inset_0_0_30px_rgba(212,168,38,0.05)] dark:shadow-[inset_0_0_30px_rgba(212,168,38,0.1)] group-hover:border-gold-400/80 group-hover:shadow-[0_0_50px_rgba(212,168,38,0.2)] dark:group-hover:shadow-[0_0_50px_rgba(212,168,38,0.3)] transition-all duration-1000 rotate-45 hover:rotate-[135deg] cursor-pointer">
          <!-- Counter-rotate text -->
          <span class="font-display text-4xl md:text-5xl font-black bg-gradient-to-br from-gold-500 to-gold-700 dark:from-gold-200 dark:via-gold-400 dark:to-gold-600 bg-clip-text text-transparent transform -rotate-45 block leading-none drop-shadow-sm transition-transform duration-1000 group-hover:-rotate-[135deg]">
            {{ getInitials(school.name) }}
          </span>
        </div>
      </div>

      <!-- School Name Title -->
      <div class="relative inline-block mb-6">
        <h1 class="font-display text-5xl md:text-7xl font-bold tracking-wider bg-gradient-to-br from-navy-900 via-navy-800 to-gold-600 dark:from-white dark:via-gold-100 dark:to-gold-500 bg-clip-text text-transparent drop-shadow-lg z-10 relative">
          {{ school.name }}
        </h1>
        <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
      </div>

      <!-- Description -->
      <p class="text-xl md:text-2xl text-navy-700 dark:text-gold-500/80 max-w-2xl mx-auto font-light leading-relaxed mt-6">
        {{ school.description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { School } from '~/types'

defineProps<{ school: School }>()

const getInitials = (name?: string) => {
  if (!name) return ''
  const words = name.trim().split(/\s+/)
  return words.length >= 2
    ? (words[0]?.charAt(0) || '') + (words[words.length - 1]?.charAt(0) || '')
    : name.substring(0, 2).toUpperCase()
}
</script>
