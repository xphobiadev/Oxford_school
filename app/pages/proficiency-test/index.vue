<script setup lang="ts">
import { useThemeStore } from '~/stores/themeStore'
import '~/assets/css/quiz.css'

const theme = useThemeStore()

useHead({
  title: 'Language Proficiency Test | Universal Oxford Groupe',
  meta: [
    { name: 'description', content: 'Take our language proficiency test to determine your skills.' }
  ]
})
</script>

<template>
  <div class="quiz-container">
    <div
      dir="rtl"
      lang="ar"
      :class="{ dark: theme.isDark }"
      class="min-h-[80vh] flex flex-col transition-colors duration-300"
      :style="{
        fontFamily: 'var(--font-main)',
        background: 'var(--bg-page)'
      }"
    >
      <div class="max-w-3xl mx-auto w-full px-3 sm:px-4 pt-4 sm:pt-8 flex" dir="ltr">
        <NuxtLink to="/portal" class="bg-white dark:bg-navy-800 text-navy-900 dark:text-white border border-gray-200 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700 hover:border-gold-500 transition-all duration-300 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm group">
          <i class="ph-bold ph-arrow-left text-gray-400 group-hover:-translate-x-1 transition-transform group-hover:text-gold-500"></i>
          Back to Student Portal
        </NuxtLink>
      </div>

      <main class="flex-1 py-4 px-3 sm:py-6 sm:px-4">
        <QuizCore />
      </main>
    </div>
  </div>
</template>
