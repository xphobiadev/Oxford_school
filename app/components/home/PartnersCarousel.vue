<template>
  <section class="relative py-20 bg-navy-950 overflow-hidden" id="partners">
    <!-- Background -->
    <div class="absolute inset-0 bg-pattern-grid opacity-20"></div>

    <div class="relative container mx-auto px-6">
      <div class="text-center mb-14">
        <div class="badge-gold mx-auto mb-6">
          <i class="fas fa-handshake"></i>
          Trusted Partners
        </div>
        <h2 class="section-title-light">Our Partners</h2>
        <div class="gold-line"></div>
      </div>

      <!-- Infinite Carousel -->
      <div class="overflow-hidden relative">
        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10"></div>

        <div
          class="flex animate-slide-left"
          :style="{ width: `${partners.length * 2 * 240}px` }"
        >
          <template v-for="round in 2" :key="round">
            <div
              v-for="partner in partners"
              :key="`${round}-${partner.id}`"
              class="flex-shrink-0 w-[220px] h-[100px] mx-[10px]
                     flex items-center justify-center"
            >
              <div
                class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 w-full h-full
                       flex items-center justify-center border border-white/10
                       hover:border-gold-500/30 hover:bg-white/10
                       transition-all duration-500 cursor-pointer
                       grayscale hover:grayscale-0 opacity-50 hover:opacity-100"
              >
                <span class="text-gray-400 hover:text-gold-500 font-display
                             font-bold text-sm text-center transition-colors">
                  {{ partner.name }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { partners } = usePartners()
</script>
