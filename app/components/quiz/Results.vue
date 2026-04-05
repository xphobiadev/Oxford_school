<script setup lang="ts">
import { useLangStore } from '~/stores/langStore'
import { useQuizStore, type Level } from '~/stores/quizStore'

const lang = useLangStore()
const quiz = useQuizStore()



const isCalculating = ref(true)
onMounted(() => { setTimeout(() => { isCalculating.value = false }, 1800) })

const results = computed(() => quiz.calculateResults)
const failedLevel = computed(() =>
  quiz.LEVELS.find((lvl: Level) => !results.value.levelResults[lvl]?.passed)
)
</script>

<template>

  <!-- ── Calculating screen ── -->
  <Transition name="fade">
    <div v-if="isCalculating" class="w-full flex items-center justify-center min-h-[60vh]">
      <div class="solid-card p-8 sm:p-12 text-center max-w-md w-full">
        <!-- Spinner -->
        <div
          class="w-16 h-16 rounded-full border-[5px] animate-spin mx-auto mb-6"
          :style="{
            borderColor: 'var(--accent-soft)',
            borderTopColor: 'var(--accent-1)',
          }"
        />
        <h2 class="text-xl sm:text-2xl font-extrabold mb-1.5" :style="{ color: 'var(--text-heading)' }">{{ lang.t.calculating }}</h2>
        <p class="text-xs sm:text-sm mb-4 sm:mb-6" :style="{ color: 'var(--text-muted)' }">{{ lang.t.calculatingSub }}</p>
        <div class="flex gap-2 justify-center flex-wrap">
          <span
            v-for="(lvl, i) in quiz.LEVELS"
            :key="lvl"
            class="font-bold text-xs px-3 py-1.5 rounded-full animate-pop-in"
            :style="{
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent-1)',
              border: '1px solid var(--accent-soft-border)',
              animationDelay: `${i * 0.15}s`,
            }"
          >{{ lvl }}</span>
        </div>
      </div>
    </div>
  </Transition>

  <!-- ── Results screen ── -->
  <Transition name="slide-up">
    <div v-if="!isCalculating" class="flex flex-col gap-6 pb-12 max-w-2xl mx-auto w-full animate-fade-up">

      <!-- Hero card -->
      <div
        class="solid-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center text-white relative overflow-hidden"
        :style="{
          backgroundColor: 'var(--accent-1)',
          border: 'none',
        }"
      >
        <div class="absolute w-96 h-96 bg-white/[0.06] rounded-full -top-40 -right-24 pointer-events-none" />
        <div class="absolute w-56 h-56 bg-white/[0.04] rounded-full -bottom-20 -left-16 pointer-events-none" />
        <p class="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1.5 sm:mb-2 font-bold">{{ lang.t.assessmentComplete }}</p>
        <h1 class="text-2xl sm:text-4xl font-extrabold mb-1 sm:mb-1.5">{{ lang.t.quizComplete }}</h1>
        <p class="text-white/60 text-xs sm:text-sm mb-5 sm:mb-8">{{ lang.t.resultsSub }}</p>
        <div class="flex flex-row justify-center items-center gap-4 sm:gap-10">
          <div>
            <div class="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1 sm:mb-1.5 font-bold">{{ lang.t.totalScore }}</div>
            <div class="text-4xl sm:text-7xl font-extrabold leading-none">
              {{ results.totalScore }}<span class="text-xl sm:text-3xl text-white/40">/{{ quiz.totalQuestionsCount }}</span>
            </div>
          </div>
          <div class="block w-px h-16 sm:h-24 bg-white/15" />
          <!-- Radial SVG -->
          <div class="relative w-16 h-16 sm:w-28 sm:h-28 shrink-0">
            <svg class="w-16 h-16 sm:w-28 sm:h-28" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10" />
              <circle
                cx="60" cy="60" r="50" fill="none" stroke="url(#rg)" stroke-width="10"
                stroke-linecap="round" :stroke-dasharray="314.16"
                :stroke-dashoffset="314.16 - (314.16 * results.percentage / 100)"
                transform="rotate(-90 60 60)"
                style="transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)"
              />
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#4f46e5" />
                  <stop offset="50%" stop-color="#9333ea" />
                  <stop offset="100%" stop-color="#db2777" />
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-sm sm:text-xl font-extrabold">{{ results.percentage }}%</span>
              <span class="text-[0.45rem] sm:text-[0.55rem] uppercase tracking-[0.15em] text-white/60 font-bold">{{ lang.t.scoreLabel }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Achieved level -->
      <div class="solid-card p-5 sm:p-8 text-center">
        <p class="text-[0.65rem] uppercase tracking-[0.2em] mb-4 font-bold" :style="{ color: 'var(--text-muted)' }">{{ lang.t.estimatedLevel }}</p>
        <div
          class="inline-block text-3xl sm:text-5xl font-extrabold px-6 sm:px-10 py-3 rounded-xl sm:rounded-2xl mb-4 sm:mb-5"
          :style="{
            color: 'var(--accent-1)',
            border: '2px solid var(--accent-1)',
            borderBottomWidth: '4px',
            backgroundColor: 'var(--accent-soft)',
          }"
        >
          {{ results.achievedLevel }}
        </div>
        <p
          v-if="failedLevel"
          class="leading-relaxed text-sm"
          :style="{ color: 'var(--text-body)' }"
          v-html="lang.t.didNotPass(results.achievedLevel, failedLevel)"
        />
        <p v-else class="font-semibold leading-relaxed text-sm" :style="{ color: 'var(--success)' }">{{ lang.t.outstanding }}</p>
      </div>

      <!-- Level breakdown -->
      <div class="solid-card p-4 sm:p-7">
        <h2 class="text-xs sm:text-sm font-extrabold mb-3 sm:mb-5" :style="{ color: 'var(--text-heading)' }">{{ lang.t.breakdown }}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <div
            v-for="(lvl, i) in quiz.LEVELS" :key="lvl"
            class="rounded-2xl p-3.5 text-center flex flex-col gap-1.5 animate-pop-in"
            :style="{
              animationDelay: `${i * 0.08}s`,
              backgroundColor: results.levelResults[lvl]?.passed ? 'var(--success-bg)' : 'var(--danger-bg)',
              border: `2px solid ${results.levelResults[lvl]?.passed ? 'var(--success-border)' : 'var(--danger-border)'}`,
              borderBottomWidth: '4px',
              borderBottomColor: results.levelResults[lvl]?.passed ? 'var(--success-border-shadow)' : 'var(--danger-border-shadow)',
              color: results.levelResults[lvl]?.passed ? 'var(--success)' : 'var(--danger)',
            }"
          >
            <div
              class="text-lg font-extrabold"
              :style="{ color: results.levelResults[lvl]?.passed ? 'var(--success)' : 'var(--danger)' }"
            >{{ lvl }}</div>
            <div class="text-xs font-bold" :style="{ color: 'var(--text-muted)' }">
              {{ results.levelResults[lvl]?.correct ?? 0 }}/{{ results.levelResults[lvl]?.total ?? 0 }}
            </div>
            <div class="h-1 rounded-full overflow-hidden" :style="{ backgroundColor: 'var(--progress-track)' }">
              <div
                class="h-full rounded-full"
                :style="{
                  backgroundColor: results.levelResults[lvl]?.passed ? 'var(--success)' : 'var(--danger)',
                  width: results.levelResults[lvl]?.total
                    ? (results.levelResults[lvl].correct / results.levelResults[lvl].total * 100) + '%' : '0%',
                  transition: 'width 1s ease 0.3s'
                }"
              />
            </div>
            <div
              class="text-[0.7rem] sm:text-xs font-extrabold mt-0.5"
              :style="{ color: results.levelResults[lvl]?.passed ? 'var(--success)' : 'var(--danger)' }"
            >{{ results.levelResults[lvl]?.passed ? lang.t.pass : lang.t.fail }}</div>
          </div>
        </div>
      </div>

      <!-- Retake -->
      <div class="text-center">
        <button
          class="px-9 py-3.5 rounded-2xl text-sm font-bold cursor-pointer transition-all duration-200 glass-card"
          :style="{ color: 'var(--text-body)' }"
          @mouseenter="($event.target as HTMLElement).style.borderColor = 'var(--accent-soft-border)'; ($event.target as HTMLElement).style.color = 'var(--accent-1)'"
          @mouseleave="($event.target as HTMLElement).style.borderColor = 'var(--card-border)'; ($event.target as HTMLElement).style.color = 'var(--text-body)'"
          @click="quiz.resetQuiz()"
        >{{ lang.t.retake }}</button>
      </div>

    </div>
  </Transition>

</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active { transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s; }
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
</style>
