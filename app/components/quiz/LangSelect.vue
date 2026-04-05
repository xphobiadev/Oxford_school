<script setup lang="ts">
import { useLangStore } from "~/stores/langStore";
import { useQuizStore, TEST_LANGUAGES } from "~/stores/quizStore";

const lang = useLangStore();
const quiz = useQuizStore();

// All languages now have questions in the JSON database
</script>

<template>
  <div class="max-w-2xl mx-auto animate-fade-up">
    <!-- Header -->
    <div class="text-center mb-8 sm:mb-12">
      <div class="text-4xl sm:text-5xl mb-3 sm:mb-4">🌍</div>
      <h1
        class="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-3 tracking-tight"
        :style="{ color: 'var(--text-heading)' }"
      >
        {{ lang.t.selectLangTitle }}
      </h1>
      <p class="text-xs sm:text-sm" :style="{ color: 'var(--text-muted)' }">
        {{ lang.t.selectLangSubtitle }}
      </p>
    </div>

    <!-- Language cards grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-8 sm:mb-10">
      <button
        v-for="(testLang, i) in TEST_LANGUAGES"
        :key="testLang.id"
        class="solid-card lang-card relative flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 text-center cursor-pointer group"
        :class="{
          'solid-card--selected': quiz.selectedTestLang === testLang.id,
        }"
        :style="{ animationDelay: `${i * 0.07}s` }"
        @click="quiz.selectTestLang(testLang.id)"
      >
        <!-- Selected indicator -->
        <span
          v-if="quiz.selectedTestLang === testLang.id"
          class="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 flex items-center justify-center rounded-full text-white text-xs font-extrabold"
          :style="{ background: 'var(--accent-1)' }"
          >✓</span
        >

        <!-- Flag -->
        <div class="flag-wrapper mb-3 sm:mb-4">
          <img
            :src="testLang.flag"
            :alt="testLang.name"
            class="w-14 h-10 sm:w-20 sm:h-14 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
          />
        </div>

        <!-- Name -->
        <div
          class="text-sm sm:text-base font-bold transition-colors duration-200"
          :style="{
            color:
              quiz.selectedTestLang === testLang.id
                ? 'var(--accent-1)'
                : 'var(--text-heading)',
          }"
        >
          {{ testLang.name }}
        </div>
      </button>
    </div>

    <!-- Start button -->
    <div class="text-center sticky bottom-4 sm:bottom-8 z-10 mt-auto">
      <button
        class="bg-blue-600 border-blue-600 text-white border-2 border-b-6 rounded-2xl font-extrabold text-sm sm:text-base px-10 sm:px-14 py-3.5 sm:py-4 w-full sm:w-auto uppercase tracking-wide cursor-pointer transition-all duration-100 shadow-xl"
        :class="{
          'opacity-50 cursor-not-allowed': !quiz.selectedTestLang,
          'hover:brightness-105 active:translate-y-1 active:border-b-2 active:mb-1':
            quiz.selectedTestLang,
        }"
        :disabled="!quiz.selectedTestLang"
        @click="quiz.startQuiz()"
      >
        {{ lang.t.startNow }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.flag-wrapper {
  width: 4.5rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .flag-wrapper {
    width: 6rem;
    height: 4rem;
  }
}
</style>
