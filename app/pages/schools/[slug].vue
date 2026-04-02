<template>
  <div class="bg-gray-50 dark:bg-navy-950 min-h-screen selection:bg-gold-500/30 selection:text-navy-900 dark:selection:text-gold-200 font-sans text-navy-900 dark:text-gray-200 transition-colors duration-500">
    <AppHeader />

    <div v-if="school">
      <!-- School Hero -->
      <SchoolHero :school="school" />

      <!-- Dynamic Content Section -->
      <section class="py-24 relative overflow-hidden">
        <!-- Ambient Background for Content -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-50 dark:from-navy-900/30 dark:via-navy-950 dark:to-navy-950 pointer-events-none transition-colors duration-500"></div>
        <div class="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

        <div class="container mx-auto px-6 max-w-6xl relative z-10">

          <!-- State 1: Languages Selection -->
          <Transition name="fade-slide" mode="out-in">
            <div v-if="currentView === 'languages'" key="languages">
              <div class="text-center mb-16">
                <h2 class="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-navy-800 via-gold-600 to-navy-800 dark:from-gold-300 dark:via-gold-500 dark:to-gold-300 bg-clip-text text-transparent inline-flex items-center gap-4 drop-shadow-sm">
                  <i class="ph-fill ph-language text-3xl text-gold-500/50"></i>
                  Available Languages
                </h2>
                <div class="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto rounded-full"></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <button
                  v-for="lang in school.languages"
                  :key="lang.id"
                  @click="selectLanguage(lang)"
                  class="group relative h-48 w-full rounded-3xl bg-white/90 dark:bg-navy-900/40 border border-gray-200 dark:border-navy-700/80 backdrop-blur-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(212,168,38,0.2)] text-left focus:outline-none"
                >
                  <!-- Glass Reflect -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-0"></div>
                  <!-- Hover Glow Sweep -->
                  <div class="absolute inset-y-0 -left-64 w-32 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent skew-x-[30deg] opacity-0 group-hover:opacity-100 group-hover:animate-[sweep-across_1.5s_ease-out] pointer-events-none z-10 mix-blend-overlay"></div>

                  <div class="relative z-20 p-8 h-full flex flex-col items-center justify-center">
                    <div class="text-6xl mb-4 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 drop-shadow-md dark:drop-shadow-xl filter">{{ lang.icon }}</div>
                    <h3 class="font-display font-semibold text-2xl text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors drop-shadow-sm dark:drop-shadow">
                      {{ lang.name }}
                    </h3>
                    <p class="text-sm text-navy-600 dark:text-gold-500/70 mt-2 font-medium tracking-wider uppercase">
                      {{ lang.teachers.length }} teacher{{ lang.teachers.length !== 1 ? 's' : '' }}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </Transition>

          <!-- State 2: Teachers Grid -->
          <Transition name="fade-slide" mode="out-in">
            <div v-if="currentView === 'teachers'" key="teachers">
              <!-- Back Button -->
              <button @click="goBack('languages')"
                      class="mb-12 text-gold-600 dark:text-gold-500 hover:text-navy-900 dark:hover:text-gold-400 font-medium tracking-wide
                             flex items-center gap-3 transition-all hover:-translate-x-2 bg-white/80 dark:bg-navy-900/50 px-6 py-3 rounded-full border border-gray-200 dark:border-navy-700 hover:border-gold-500/30 dark:hover:border-gold-500/30 w-fit focus:outline-none backdrop-blur-md shadow-sm">
                <i class="ph-fill ph-arrow-left"></i>
                Back to Languages
              </button>

              <div class="text-center mb-16">
                <h2 class="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white inline-flex items-center gap-4 drop-shadow-sm dark:drop-shadow-lg">
                  <span class="text-5xl filter drop-shadow-md dark:drop-shadow-xl">{{ selectedLanguage?.icon }}</span>
                  {{ selectedLanguage?.name }} Teachers
                </h2>
                <div class="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto rounded-full"></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <button
                  v-for="teacher in selectedLanguage?.teachers"
                  :key="teacher.id"
                  @click="selectTeacher(teacher)"
                  class="group relative rounded-3xl bg-white/90 dark:bg-navy-900/30 border border-gray-200 dark:border-navy-700/80 backdrop-blur-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer text-left focus:outline-none shadow-sm dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(212,168,38,0.15)]"
                >
                  <div class="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-800 dark:to-navy-900 relative">
                    <!-- Decor -->
                    <div class="absolute inset-0 bg-pattern-grid opacity-5 dark:opacity-10"></div>
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 dark:to-navy-950/80"></div>
                    <!-- Avatar Ring -->
                    <div class="absolute -bottom-12 left-1/2 -translate-x-1/2">
                      <div class="w-24 h-24 rounded-full bg-white dark:bg-navy-950 p-[3px] border border-gray-300 dark:border-gold-500/20 group-hover:border-gold-400 dark:group-hover:border-gold-500/60 transition-colors duration-500 shadow-md dark:shadow-xl shadow-black/5 dark:shadow-black/50">
                         <div class="w-full h-full rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-white dark:text-navy-950 text-3xl font-black font-display group-hover:scale-110 transition-transform duration-500">
                           {{ teacher.name.charAt(0) }}
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="pt-16 pb-8 px-6 text-center">
                    <h3 class="font-display font-semibold text-2xl text-navy-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{{ teacher.name }}</h3>
                    <p class="text-navy-600 dark:text-gold-400/80 text-sm mb-5 font-semibold tracking-wide uppercase">
                      <i class="ph-fill ph-star mr-1 text-gold-500/70"></i> {{ teacher.experience_years }} Years Excellence
                    </p>
                    <div class="flex flex-wrap justify-center gap-2">
                       <span
                        v-for="tl in teacher.languages"
                        :key="tl.language_name"
                        class="text-xs font-medium bg-gray-100 dark:bg-navy-950/80 border border-gray-200 dark:border-navy-700 text-navy-700 dark:text-gray-300 px-3 py-1.5 rounded-full shadow-inner"
                      >
                        {{ tl.level }}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </Transition>

          <!-- State 3: Teacher Profile -->
          <Transition name="fade-slide" mode="out-in">
            <div v-if="currentView === 'profile'" key="profile">
              <!-- Back Button -->
              <button @click="goBack('teachers')"
                      class="mb-10 text-gold-600 dark:text-gold-500 hover:text-navy-900 dark:hover:text-gold-400 font-medium tracking-wide
                             flex items-center gap-3 transition-all hover:-translate-x-2 bg-white/80 dark:bg-navy-900/50 px-6 py-3 rounded-full border border-gray-200 dark:border-navy-700 hover:border-gold-500/30 dark:hover:border-gold-500/30 w-fit focus:outline-none backdrop-blur-md shadow-sm">
                <i class="ph-fill ph-arrow-left"></i>
                Back to Teachers
              </button>

              <div class="space-y-8">
                <!-- Teacher Profile Component -->
                <TeacherProfile :teacher="selectedTeacher!" class="dark-theme-override" />

                <!-- Register Button #1 -->
                <RegisterButton @click="openRegisterModal" class="my-12" />

                <!-- Activities Section -->
                <ActivitiesTabs :teacher="selectedTeacher!" class="dark-theme-override" />

                <!-- Register Button #2 -->
                <RegisterButton @click="openRegisterModal" class="mt-12" />
              </div>
            </div>
          </Transition>

        </div>
      </section>

      <!-- Registration Modal -->
      <RegisterModal
        v-if="showRegisterModal"
        :school-id="school.id"
        :language-id="selectedLanguage?.id || 0"
        :teacher-id="selectedTeacher?.id || 0"
        @close="showRegisterModal = false"
      />
    </div>

    <!-- School Not Found -->
    <div v-else class="min-h-screen flex items-center justify-center pt-20 bg-gray-50 dark:bg-navy-950 transition-colors duration-500">
      <div class="text-center">
        <i class="ph-fill ph-school text-6xl text-gray-300 dark:text-gold-500/50 mb-6 drop-shadow-sm dark:drop-shadow-lg"></i>
        <h2 class="font-display text-4xl font-bold text-navy-900 dark:text-white mb-4">School Not Found</h2>
        <NuxtLink to="/" class="mt-6 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 font-bold transition-all hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-black/10 dark:shadow-gold-500/20">Back to Legacy</NuxtLink>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { Language, Teacher } from '~/types'

const route = useRoute()
const { getSchoolBySlug } = useSchool()

const slug = route.params.slug as string
const school = computed(() => getSchoolBySlug(slug))

// Navigation state
type ViewState = 'languages' | 'teachers' | 'profile'
const currentView = ref<ViewState>('languages')
const selectedLanguage = ref<Language | null>(null)
const selectedTeacher = ref<Teacher | null>(null)
const showRegisterModal = ref(false)

const selectLanguage = (lang: Language) => {
  selectedLanguage.value = lang
  currentView.value = 'teachers'
  window.scrollTo({ top: 400, behavior: 'smooth' })
}

const selectTeacher = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  currentView.value = 'profile'
  window.scrollTo({ top: 400, behavior: 'smooth' })
}

const goBack = (to: ViewState) => {
  currentView.value = to
  if (to === 'languages') {
    selectedLanguage.value = null
    selectedTeacher.value = null
  }
  window.scrollTo({ top: 400, behavior: 'smooth' })
}

const openRegisterModal = () => {
  showRegisterModal.value = true
}

useHead({
  title: computed(() => school.value ? `${school.value.name} - Universal Oxford Groupe` : 'School Not Found')
})
</script>

<style scoped>
/* Cinematic Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.98);
}

/* Sweep Animation for cards */
@keyframes sweep-across {
  0% { transform: translateX(0); }
  100% { transform: translateX(50rem); }
}


</style>
