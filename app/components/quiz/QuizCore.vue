<script setup lang="ts">
import { useLangStore } from '~/stores/langStore'
import { useQuizStore } from '~/stores/quizStore'
import Results from '~/components/quiz/Results.vue'
import LangSelect from '~/components/quiz/LangSelect.vue'

const lang = useLangStore()
const quiz = useQuizStore()

const levelName = computed(() => lang.t.levelNames[quiz.currentLevel] ?? '')

const selectAndScroll = (questionId: string, optionIndex: number, questionIndex: number) => {
  quiz.setAnswer(questionId, optionIndex)
  setTimeout(() => {
    const nextIndex = questionIndex + 1
    let target: Element | null = null
    if (nextIndex < quiz.currentQuestions.length) {
      target = document.getElementById(`question-${nextIndex}`)
    } else {
      target = document.getElementById('action-row')
    }
    if (target) {
      // Calculate offset for mobile headers if needed, or stick to center
      const yOffset = -20
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, 150)
}
</script>

<template>
  <div class="max-w-3xl mx-auto">

    <!-- Language Selection -->
    <LangSelect v-if="!quiz.isStarted" />

    <!-- Results -->
    <Results v-else-if="quiz.isSubmitted" />

    <!-- Quiz -->
    <div v-else class="animate-fade-up pb-16">

      <!-- Page header -->
      <div class="text-center mb-6 sm:mb-10">
        <div class="text-3xl sm:text-5xl mb-3 sm:mb-4">🇫🇷</div>
        <h1
          class="text-xl sm:text-3xl font-extrabold mb-1.5 sm:mb-2 tracking-tight"
          :style="{ color: 'var(--text-heading)' }"
        >{{ lang.t.quizTitle }}</h1>
        <p class="text-xs sm:text-sm" :style="{ color: 'var(--text-muted)' }">{{ lang.t.quizSubtitle }}</p>
      </div>

      <!-- Progress card -->
      <div class="solid-card px-4 py-4 sm:px-6 sm:py-5 mb-5 sm:mb-7">
        <div class="flex justify-between items-center mb-3 gap-4">
          <div class="text-[0.9rem] font-bold" :style="{ color: 'var(--text-heading)' }">{{ levelName }}</div>
          <div class="text-right shrink-0">
            <span class="text-2xl font-extrabold" :style="{ color: 'var(--accent-1)' }">{{ quiz.answeredQuestionsCount }}</span>
            <span class="text-sm font-semibold" :style="{ color: 'var(--text-faint)' }"> / {{ quiz.totalQuestionsCount }}</span>
            <span class="text-xs ml-1" :style="{ color: 'var(--text-muted)' }">{{ lang.t.answered }}</span>
          </div>
        </div>
        <div class="h-2 rounded-full overflow-hidden mb-2" :style="{ backgroundColor: 'var(--progress-track)' }">
          <div
            class="h-full rounded-full transition-all duration-700 ease-out"
            :style="{
              width: quiz.globalProgressPercentage + '%',
              background: 'var(--progress-bar)',
            }"
          />
        </div>
        <div class="text-xs font-semibold text-right" :style="{ color: 'var(--text-muted)' }">
          {{ quiz.globalProgressPercentage }}% {{ lang.t.complete }}
        </div>
      </div>

      <!-- Questions -->
      <div class="flex flex-col gap-5 mb-6">
        <div
          v-for="(q, qi) in quiz.currentQuestions"
          :key="q.id"
          :id="`question-${qi}`"
          class="solid-card p-4 sm:p-7"
        >
          <div
            class="text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-3"
            :style="{ color: 'var(--text-faint)' }"
          >
            {{ lang.t.questionOf(qi + 1, quiz.currentQuestions.length) }}
          </div>
          <p class="text-[0.9rem] sm:text-[1.02rem] font-bold leading-relaxed mb-4 sm:mb-5" :style="{ color: 'var(--text-heading)' }">
            <span class="font-extrabold mr-1" :style="{ color: 'var(--accent-1)' }">{{ qi + 1 }}.</span>
            {{ q.question }}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              v-for="(opt, oi) in q.options"
              :key="oi"
              class="option-pushable flex items-center gap-2.5 sm:gap-3 text-left px-3 py-3 sm:px-4 sm:py-4 text-[0.85rem] sm:text-[0.95rem] font-bold w-full"
              :class="quiz.userAnswers[q.id] === oi ? 'option-pushable--selected' : ''"
              @click="selectAndScroll(q.id, oi, qi)"
            >
              <span
                class="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-extrabold shrink-0 transition-colors duration-200"
                :style="quiz.userAnswers[q.id] === oi
                  ? { backgroundColor: 'var(--accent-1)', color: '#fff' }
                  : { backgroundColor: 'var(--option-letter-bg)', color: 'var(--option-letter-text)' }"
              >
                {{ String.fromCharCode(65 + oi) }}
              </span>
              <span class="flex-1">{{ opt }}</span>
              <span
                class="shrink-0 font-extrabold text-sm transition-all duration-200"
                :class="quiz.userAnswers[q.id] === oi ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
                :style="{ color: 'var(--accent-1)' }"
              >✓</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Action row -->
      <div id="action-row" class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 sticky bottom-4 sm:bottom-6">
        <div
          v-if="!quiz.canProceed"
          class="solid-card text-xs font-medium px-4 py-2 !rounded-full opacity-70"
          :style="{
            color: 'var(--text-muted)',
          }"
        >
          {{ lang.t.answerHint(quiz.currentQuestions.length) }}
        </div>
        <button
          class="btn-pushable flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto"
          :disabled="!quiz.canProceed"
          @click="quiz.nextStep()"
        >
          <span v-if="quiz.isLastLevel || !quiz.currentLevelPassed">{{ lang.t.submitQuiz }} 📊</span>
          <span v-else>{{ lang.t.nextLevel }} →</span>
        </button>
      </div>

    </div>
  </div>
</template>
