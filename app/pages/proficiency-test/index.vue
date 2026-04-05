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
      <main class="flex-1 py-6 px-3 sm:py-12 sm:px-4">
        <QuizCore />
      </main>
    </div>
  </div>
</template>
