<template>
  <section class="relative py-24 bg-gray-50 dark:bg-navy-950 overflow-hidden transition-colors duration-500" id="partners">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-pattern-grid opacity-10 dark:opacity-20"></div>

    <!-- Decorative Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/5 dark:bg-gold-500/10 rounded-full blur-3xl"></div>

    <div class="relative container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="badge-gold mx-auto mb-6">
          <i class="ph-fill ph-handshake"></i>
          Trusted Partners
        </div>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-4 tracking-wide">
          Our Partners
        </h2>
        <div class="gold-line"></div>
        <p class="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto mt-4">
          We collaborate with world-renowned institutions to provide internationally recognized certifications
        </p>
      </div>

      <!-- Partners Grid -->
      <div class="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-12">
        <div
          v-for="(partner, index) in partners"
          :key="partner.id"
          class="group relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[240px] max-w-[300px]"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            class="relative bg-white dark:bg-navy-900/50 backdrop-blur-sm rounded-2xl p-8 h-32
                   flex flex-col items-center justify-center gap-3
                   border border-gray-200 dark:border-navy-700/80
                   hover:border-gold-400 dark:hover:border-gold-500/50
                   hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-gold-500/10
                   transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <!-- Shimmer Effect on Hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <!-- Partner Icon -->
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 dark:from-gold-500/10 dark:to-gold-500/20
                        flex items-center justify-center border border-gold-300/30 dark:border-gold-500/20 shadow-sm
                        group-hover:scale-110 transition-transform duration-500">
              <i :class="partnerIcons[index % partnerIcons.length]"
                 class="text-gold-600 dark:text-gold-400 text-lg"></i>
            </div>

            <!-- Partner Name -->
            <span class="text-navy-800 dark:text-gray-300 group-hover:text-gold-600 dark:group-hover:text-gold-400
                         font-display font-bold text-sm text-center transition-colors duration-300 relative z-10">
              {{ t(partner.name) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Infinite Scroll Marquee -->
      <div class="overflow-hidden relative mt-8">
        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-navy-950 to-transparent z-10 transition-colors duration-500"></div>
        <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-navy-950 to-transparent z-10 transition-colors duration-500"></div>

        <div
          class="flex animate-slide-left"
          :style="{ width: `${partners.length * 2 * 260}px` }"
        >
          <template v-for="round in 2" :key="round">
            <div
              v-for="partner in partners"
              :key="`${round}-${partner.id}`"
              class="flex-shrink-0 w-[240px] h-[70px] mx-[10px]
                     flex items-center justify-center"
            >
              <div
                class="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 w-full h-full
                       flex items-center justify-center gap-3
                       border border-gray-200/50 dark:border-white/10
                       hover:border-gold-400 dark:hover:border-gold-500/30
                       hover:bg-white dark:hover:bg-white/10
                       transition-all duration-500 cursor-pointer
                       opacity-60 hover:opacity-100"
              >
                <i class="ph-fill ph-certificate text-gold-500/50 group-hover:text-gold-500 text-sm"></i>
                <span class="text-navy-700 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400
                             font-display font-semibold text-xs tracking-wider uppercase transition-colors">
                  {{ t(partner.name) }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="flex flex-wrap justify-center gap-8 mt-14 text-sm">
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
            <i class="ph-fill ph-check text-green-500 text-xs"></i>
          </div>
          <span>Internationally Recognized</span>
        </div>
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
            <i class="ph-fill ph-globe text-blue-500 text-xs"></i>
          </div>
          <span>Worldwide Certifications</span>
        </div>
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <div class="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-500/20 flex items-center justify-center">
            <i class="ph-fill ph-award text-gold-500 text-xs"></i>
          </div>
          <span>Excellence in Education</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { partners } = usePartners()
const { t } = useLocale()

const partnerIcons = [
  'ph-fill ph-university',
  'ph-fill ph-flag',
  'ph-fill ph-globe-europe',
  'ph-fill ph-book-open',
  'ph-fill ph-crown',
  'ph-fill ph-certificate',
  'ph-fill ph-graduation-cap',
  'ph-fill ph-star',
]
</script>
