<template>
  <div class="relative bg-white/90 dark:bg-navy-900/40 border border-gray-200 dark:border-navy-700/80 shadow-xl rounded-3xl backdrop-blur-xl p-8 md:p-12 mb-12 overflow-hidden transition-colors duration-500">
    <div class="flex flex-col md:flex-row gap-8 relative z-10">
      <!-- Teacher Photo -->
      <div class="flex-shrink-0">
        <div class="w-40 h-40 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-navy-800 dark:to-navy-900
                    rounded-3xl flex items-center justify-center shadow-lg border border-white dark:border-gold-500/20">
          <span class="text-6xl font-bold font-display bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-gold-400 dark:to-gold-600 bg-clip-text text-transparent transform">
            {{ teacher.name.charAt(0) }}
          </span>
        </div>
      </div>

      <!-- Teacher Info -->
      <div class="flex-1">
        <h2 class="font-display text-4xl font-bold text-navy-900 dark:text-white mb-4 drop-shadow-sm dark:drop-shadow">
          {{ teacher.name }}
        </h2>

        <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{{ teacher.bio }}</p>

        <!-- Experience -->
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 bg-gold-500/10 rounded-2xl flex items-center justify-center border border-gold-500/20">
            <i class="fas fa-briefcase text-gold-600 dark:text-gold-400 text-xl"></i>
          </div>
          <div>
            <span class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold block mb-1">Experience</span>
            <p class="font-bold text-navy-900 dark:text-white">{{ teacher.experience_years }} years</p>
          </div>
        </div>

        <!-- Languages & Levels -->
        <div class="mb-4">
          <h4 class="font-semibold text-navy-800 dark:text-gray-200 mb-3 flex items-center text-sm uppercase tracking-wider">
            <i class="fas fa-language text-xl mr-2 text-gold-500"></i> Languages
          </h4>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="lang in teacher.languages"
              :key="lang.language_name"
              class="bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700 rounded-xl px-4 py-2
                     flex items-center gap-3 shadow-inner"
            >
              <span class="font-semibold text-navy-700 dark:text-gray-200">{{ lang.language_name }}</span>
              <span class="bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                {{ lang.level }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Teacher } from '~/types'

defineProps<{
  teacher: Teacher
}>()
</script>
