<!-- app/components/home/HeroSection.vue -->
<template>
  <section
    id="schools"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- ===== BACKGROUND LAYERS ===== -->
    <!-- Base Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 dark:bg-royal-gradient transition-colors duration-1000"></div>

    <!-- Animated Gradient Overlay -->
    <div
      class="absolute inset-0 opacity-[0.15] dark:opacity-30 animate-gradient bg-[linear-gradient(-45deg,#f0f3f9,#d9e0f0,#f8dc7a,#fdf5d6)] dark:bg-[linear-gradient(-45deg,#0d1526,#1e2d52,#141e35,#2c3e6b)] transition-colors duration-1000"
      style="
        background-size: 400% 400%;
      "
    ></div>

    <!-- Pattern -->
    <div class="absolute inset-0 bg-pattern-grid opacity-40"></div>

    <!-- Decorative Elements -->
    <div
      class="absolute top-20 left-10 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl
             animate-float"
    ></div>
    <div
      class="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/3 rounded-full blur-3xl
             animate-float-delayed"
    ></div>
    <div
      class="absolute top-1/3 right-1/4 w-40 h-40 bg-gold-500/5 rounded-full blur-2xl
             animate-float"
    ></div>

    <!-- Rotating Decorative Ring -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[800px] h-[800px] border border-gold-500/5 rounded-full
             animate-rotate-slow"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[600px] h-[600px] border border-gold-500/3 rounded-full
             animate-rotate-slow"
      style="animation-direction: reverse; animation-duration: 30s"
    ></div>

    <!-- ===== CONTENT ===== -->
    <div class="relative z-10 container mx-auto px-6 pt-24 pb-12">

      <!-- ===== MAIN SCHOOL BRANDING ===== -->
      <div class="text-center mb-20">
        <!-- Logo with glow effect -->
        <div class="relative inline-block mb-8 animate-fade-up">
          <div
            class="absolute inset-0 bg-gold-500/20 rounded-full blur-2xl scale-150
                   animate-pulse-gold"
          ></div>
          <img
            :src="'/images/logo.png'"
            alt="Universal Oxford Groupe"
            class="relative w-32 h-32 md:w-40 md:h-40 object-contain
                   rounded-full ring-4 ring-gold-500/40
                   shadow-gold-lg"
          />
        </div>

        <!-- Title -->
        <h1
          class="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-navy-950 dark:text-white
                 mb-4 tracking-wider animate-fade-up-delayed drop-shadow-sm dark:text-shadow"
        >
          UNIVERSAL
          <span class="text-gold-600 dark:text-gradient-gold">OXFORD</span>
        </h1>
        <div
          class="font-display text-2xl md:text-3xl text-gold-500 tracking-[0.5em]
                 font-semibold mb-6 animate-fade-up-delayed-2"
        >
          GROUPE
        </div>

        <!-- Tagline -->
        <p
          class="text-lg md:text-xl text-navy-800 dark:text-gray-300 max-w-2xl mx-auto animate-fade-up-delayed-2
                 font-light leading-relaxed"
        >
          Excellence in Languages & IT Training —
          <span class="text-gold-600 dark:text-gold-400 font-medium">Discover our network of schools</span>
        </p>

        <!-- Decorative Line -->
        <div class="flex items-center justify-center gap-4 mt-8 animate-fade-up-delayed-2">
          <div class="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/50"></div>
          <div class="w-2 h-2 bg-gold-500 rounded-full animate-pulse-gold"></div>
          <div class="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/50"></div>
        </div>
      </div>

      <!-- ===== DIAGRAM: MAIN → SUB SCHOOLS ===== -->
      <div class="relative max-w-7xl mx-auto mt-16 md:mt-24">

        <!-- Flow of Knowledge Lines (Desktop) -->
        <div class="hidden lg:block relative z-0">
          <!-- Main vertical stem -->
          <div class="absolute top-0 left-1/2 w-[2px] h-24 -translate-x-1/2 bg-gradient-to-b from-transparent via-navy-800 to-navy-800 overflow-hidden">
            <div class="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-gold-400 to-transparent animate-[pulse-down_3s_ease-in-out_infinite] opacity-70"></div>
          </div>
          <!-- Horizontal connector -->
          <div
            class="absolute top-24 h-[2px] bg-navy-800 overflow-hidden"
            :style="{
              left: `${100 / (subSchools.length * 2)}%`,
              right: `${100 / (subSchools.length * 2)}%`
            }"
          >
            <div class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-[pulse-across_4s_ease-in-out_infinite] opacity-50"></div>
          </div>
        </div>

        <!-- Sub Schools Grid -->
        <div class="grid gap-8 mt-32 lg:mt-36 relative z-10" :class="gridCols">
          <div
            v-for="(school, index) in subSchools"
            :key="school.id"
            class="relative animate-fade-up group"
            :style="{ animationDelay: `${0.6 + index * 0.15}s`, animationFillMode: 'both', perspective: '1000px' }"
          >
            <!-- Vertical line dropping to card (Desktop) -->
            <div class="hidden lg:block absolute -top-12 left-1/2 w-[2px] h-12 -translate-x-1/2 bg-navy-800 overflow-hidden">
              <div class="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-gold-500 to-transparent animate-[pulse-down_3s_ease-in-out_infinite]" :style="{ animationDelay: `${0.5 + index * 0.2}s` }"></div>
            </div>

            <!-- Card Outer Wrapper (Gradient Border) -->
            <NuxtLink
              :to="`/schools/${school.slug}`"
              class="relative block w-full h-[420px] p-[1px] rounded-[2.5rem] bg-gradient-to-b from-gray-300 to-gray-400 dark:from-navy-800 dark:to-navy-950 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_20px_40px_-10px_rgba(212,168,38,0.2)] group-hover:from-gold-400 group-hover:to-gold-600 dark:group-hover:from-gold-600 dark:group-hover:to-navy-900"
            >
              <!-- Card Inner Shield -->
              <div class="relative w-full h-full rounded-[calc(2.5rem-1px)] bg-white/95 dark:bg-navy-950 overflow-hidden flex flex-col items-center p-8 md:p-10 z-10 transition-colors duration-700 shadow-inner shadow-gray-200 dark:shadow-navy-800/50">
                
                <!-- Background Ambient Glows -->
                <div class="absolute -top-32 -right-32 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                <!-- Subtle Pattern Overlay -->
                <div class="absolute inset-0 bg-pattern-grid opacity-[0.03] mix-blend-overlay group-hover:opacity-[0.15] transition-opacity duration-700 z-0"></div>

                <!-- Floating Emblem -->
                <div class="relative mb-8 z-20 mt-4">
                  <!-- Outer rotating ring glow -->
                  <div class="absolute inset-0 bg-gold-400/20 blur-2xl rounded-full scale-100 group-hover:scale-[1.8] group-hover:bg-gold-500/20 transition-all duration-700"></div>
                  
                  <!-- Emblem Diamond -->
                  <div class="relative w-20 h-20 md:w-24 md:h-24 rounded-[1.2rem] md:rounded-[1.5rem] border-[1px] border-gold-500/30 bg-gradient-to-br from-gray-50 to-white dark:from-navy-900 dark:to-navy-800 flex items-center justify-center shadow-[inset_0_0_20px_rgba(212,168,38,0.05)] group-hover:border-gold-400/80 group-hover:shadow-[0_0_40px_rgba(212,168,38,0.25)] transition-all duration-700 rotate-45 hover:rotate-[135deg] cursor-pointer">
                    <!-- Counter-rotate text -->
                    <span class="font-display text-3xl md:text-4xl font-black bg-gradient-to-br from-gold-500 to-gold-700 dark:from-gold-200 dark:via-gold-400 dark:to-gold-600 bg-clip-text text-transparent transform -rotate-45 block leading-none drop-shadow-sm transition-transform duration-700 group-hover:-rotate-[135deg]">
                      {{ getInitials(t(school.name)) }}
                    </span>
                  </div>
                </div>

                <!-- School Info -->
                <h3 class="font-display text-2xl md:text-3xl font-bold text-navy-950 dark:text-white mb-4 tracking-wide group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-500 relative z-20 text-center">
                  {{ t(school.name) }}
                </h3>
                
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed relative z-20 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-500 text-sm text-center line-clamp-3">
                  {{ t(school.short_description) }}
                </p>

                <!-- Premium CTA Button -->
                <div class="mt-auto relative z-20 w-full pt-4">
                  <div class="flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-gray-100 dark:bg-navy-900/50 border border-gray-200 dark:border-navy-700 text-gold-600 dark:text-gold-500 font-medium text-sm group-hover:bg-gold-500 group-hover:text-white dark:group-hover:text-navy-950 group-hover:border-gold-500 transition-all duration-500 relative overflow-hidden shadow-[inset_0_1px_rgba(255,255,255,0.05)]">
                    <span class="relative z-10 flex items-center gap-2 font-bold tracking-wider uppercase text-xs">
                      Explore Programs
                      <i class="ph-fill ph-arrow-right group-hover:translate-x-2 transition-transform duration-500"></i>
                    </span>
                  </div>
                </div>

                <!-- Golden Sweep Animation line -->
                <div class="absolute inset-y-0 -left-64 w-32 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent skew-x-[30deg] opacity-0 group-hover:opacity-100 group-hover:animate-[sweep-across_1.5s_ease-out] z-30 pointer-events-none mix-blend-overlay"></div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="text-center mt-20 animate-bounce-soft">
        <div class="inline-flex flex-col items-center gap-2 text-gold-500/50">
          <span class="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <i class="ph-fill ph-caret-down"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { subSchools } = useSchool()
const { t } = useLocale()

const getInitials = (name: string) => {
  if (!name) return ''
  const words = name.split(' ')
  return words.length >= 2
    ? (words[0]?.charAt(0) || '') + (words[words.length - 1]?.charAt(0) || '')
    : name.substring(0, 2).toUpperCase()
}

const gridCols = computed(() => {
  const count = subSchools.value.length
  if (count <= 2) return 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
  if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  if (count === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
})
</script>

<style scoped>
@keyframes pulse-down {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(50%); }
  100% { transform: translateY(-100%); }
}

@keyframes pulse-across {
  0% { transform: translateX(-50%); }
  50% { transform: translateX(10%); }
  100% { transform: translateX(-50%); }
}

@keyframes sweep-across {
  0% { transform: translateX(0); }
  100% { transform: translateX(50rem); }
}
</style>
