<template>
  <section class="relative py-24 bg-white dark:bg-navy-950 overflow-hidden transition-colors duration-500" id="testimonials">
    <!-- Background -->
    <div class="absolute inset-0 bg-pattern-dots opacity-50 dark:opacity-20"></div>
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

    <div class="relative container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="badge-gold mx-auto mb-6">
          <i class="ph-fill ph-star"></i>
          Student Reviews
        </div>
        <h2 class="section-title dark:text-white">What Our Students Say</h2>
        <div class="gold-line mx-auto mb-6"></div>
        <p class="section-subtitle text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Hear from our students about their learning experience at Universal Oxford Groupe
        </p>
      </div>

      <!-- Slider -->
      <div class="relative max-w-7xl mx-auto">
        <div class="overflow-hidden rounded-3xl">
          <div
            class="flex transition-transform duration-700 ease-out"
            :style="{
              transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
            }"
          >
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              class="flex-shrink-0 px-4"
              :style="{ width: `${100 / visibleCards}%` }"
            >
              <div
                class="bg-white dark:bg-navy-900 rounded-3xl p-8 h-full flex flex-col
                       border border-gray-100 dark:border-navy-800 hover:border-gold-200 dark:hover:border-gold-500/50
                       shadow-lg hover:shadow-xl dark:shadow-navy-950 transition-all duration-500
                       hover:-translate-y-1 group"
              >
                <!-- Quote Icon -->
                <div class="text-gold-500/20 dark:text-gold-500/10 mb-4 group-hover:text-gold-500/40 transition-colors">
                  <i class="ph-fill ph-quotes text-4xl"></i>
                </div>

                <!-- Stars -->
                <div class="flex gap-1.5 mb-5">
                  <i
                    v-for="star in 5"
                    :key="star"
                    class="ph-fill ph-star text-lg"
                    :class="star <= 5 ? 'star-gold' : 'star-empty'"
                  ></i>
                </div>

                <!-- Message -->
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed flex-1 mb-8 text-sm md:text-base">
                  "{{ t(testimonial.content) }}"
                </p>

                <!-- Author -->
                <div class="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-navy-800">
                  <div
                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 dark:from-navy-800 dark:to-navy-700
                           flex items-center justify-center flex-shrink-0 border border-transparent dark:border-navy-600"
                  >
                    <span class="text-navy-600 dark:text-white font-bold text-lg">
                      {{ t(testimonial.author).charAt(0) }}
                    </span>
                  </div>
                  <div>
                    <h4 class="font-bold text-navy-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {{ t(testimonial.author) }}
                    </h4>
                    <p class="text-sm text-gold-600 font-medium">Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Nav Buttons -->
        <button
          @click="prevSlide"
          class="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12
                 bg-white dark:bg-navy-900 border-2 border-gold-200 dark:border-gold-500/30 rounded-2xl
                 flex items-center justify-center text-navy-800 dark:text-white
                 hover:bg-gold-500 hover:text-navy-900 dark:hover:bg-gold-500 dark:hover:text-navy-950 dark:hover:border-gold-500
                 transition-all shadow-lg hover:shadow-gold z-10"
        >
          <i class="ph-fill ph-caret-left"></i>
        </button>
        <button
          @click="nextSlide"
          class="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12
                 bg-white dark:bg-navy-900 border-2 border-gold-200 dark:border-gold-500/30 rounded-2xl
                 flex items-center justify-center text-navy-800 dark:text-white
                 hover:bg-gold-500 hover:text-navy-900 dark:hover:bg-gold-500 dark:hover:text-navy-950 dark:hover:border-gold-500
                 transition-all shadow-lg hover:shadow-gold z-10"
        >
          <i class="ph-fill ph-caret-right"></i>
        </button>
      </div>

      <!-- Dots -->
      <div class="flex justify-center gap-3 mt-10">
        <button
          v-for="index in totalSlides"
          :key="index"
          @click="currentSlide = index - 1"
          class="h-2.5 rounded-full transition-all duration-500"
          :class="
            currentSlide === index - 1
              ? 'bg-gold-500 w-10'
              : 'bg-navy-200 dark:bg-navy-700 w-2.5 hover:bg-navy-300 dark:hover:bg-navy-600'
          "
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { testimonials } = useTestimonials()
const { t } = useLocale()

const currentSlide = ref(0)
const visibleCards = ref(3)

const totalSlides = computed(() => {
  return Math.max(1, testimonials.value.length - visibleCards.value + 1)
})

const nextSlide = () => {
  currentSlide.value = currentSlide.value < totalSlides.value - 1
    ? currentSlide.value + 1
    : 0
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value > 0
    ? currentSlide.value - 1
    : totalSlides.value - 1
}

const updateVisibleCards = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) visibleCards.value = 1
    else if (window.innerWidth < 1024) visibleCards.value = 2
    else visibleCards.value = 3
  }
}

let autoplay: ReturnType<typeof setInterval>

onMounted(() => {
  updateVisibleCards()
  window.addEventListener('resize', updateVisibleCards)
  autoplay = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCards)
  clearInterval(autoplay)
})
</script>
