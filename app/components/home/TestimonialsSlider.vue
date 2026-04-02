<template>
  <section class="relative py-24 bg-white overflow-hidden" id="testimonials">
    <!-- Background -->
    <div class="absolute inset-0 bg-pattern-dots opacity-50"></div>
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

    <div class="relative container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="badge-gold mx-auto mb-6">
          <i class="fas fa-star"></i>
          Student Reviews
        </div>
        <h2 class="section-title">What Our Students Say</h2>
        <div class="gold-line"></div>
        <p class="section-subtitle">
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
                class="bg-white rounded-3xl p-8 h-full flex flex-col
                       border border-gray-100 hover:border-gold-200
                       shadow-lg hover:shadow-xl transition-all duration-500
                       hover:-translate-y-1"
              >
                <!-- Quote Icon -->
                <div class="text-gold-500/20 mb-4">
                  <i class="fas fa-quote-left text-4xl"></i>
                </div>

                <!-- Stars -->
                <div class="flex gap-1.5 mb-5">
                  <i
                    v-for="star in 5"
                    :key="star"
                    class="fas fa-star text-lg"
                    :class="star <= testimonial.rating ? 'star-gold' : 'star-empty'"
                  ></i>
                </div>

                <!-- Message -->
                <p class="text-gray-600 leading-relaxed flex-1 mb-8 text-sm md:text-base">
                  "{{ testimonial.message }}"
                </p>

                <!-- Author -->
                <div class="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div
                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200
                           flex items-center justify-center flex-shrink-0"
                  >
                    <span class="text-navy-600 font-bold text-lg">
                      {{ testimonial.name.charAt(0) }}
                    </span>
                  </div>
                  <div>
                    <h4 class="font-bold text-navy-800">
                      {{ testimonial.name }}
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
                 bg-white border-2 border-gold-200 rounded-2xl
                 flex items-center justify-center text-navy-800
                 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500
                 transition-all shadow-lg hover:shadow-gold z-10"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          @click="nextSlide"
          class="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12
                 bg-white border-2 border-gold-200 rounded-2xl
                 flex items-center justify-center text-navy-800
                 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500
                 transition-all shadow-lg hover:shadow-gold z-10"
        >
          <i class="fas fa-chevron-right"></i>
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
              : 'bg-navy-200 w-2.5 hover:bg-navy-300'
          "
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { testimonials } = useTestimonials()

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
