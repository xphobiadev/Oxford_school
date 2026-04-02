<template>
  <div class="text-center my-16">
    <button @click="$emit('click')" class="relative group">
      <!-- Glow Background -->
      <div class="absolute inset-0 bg-gold-400/40 dark:bg-gold-500/20 rounded-full blur-2xl
                  group-hover:bg-gold-400/60 dark:group-hover:bg-gold-500/40 transition-all scale-110"></div>

      <!-- Button -->
      <div class="relative flex items-center gap-4 bg-gradient-to-r from-gold-400 to-gold-500 dark:bg-none dark:bg-navy-900/80 border border-gold-300 dark:border-gold-500/30 text-navy-950 dark:text-gold-400 rounded-full px-10 py-5 text-xl font-bold shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl dark:hover:bg-navy-800 dark:hover:border-gold-500/60 dark:hover:text-gold-300">
        <i class="fas fa-graduation-cap text-3xl"></i>
        <span>Register Now — Enroll Today!</span>
        <i class="fas fa-arrow-right text-xl group-hover:translate-x-2 transition-transform"></i>
      </div>
    </button>
    <p class="text-navy-600 dark:text-gray-400 mt-6 text-sm font-medium tracking-wide">
      <i class="fas fa-shield-alt text-gold-500 mr-2"></i>
      Join hundreds of successful students • Quick & Easy Registration
    </p>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>
