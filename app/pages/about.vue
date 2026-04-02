<template>
  <div>
    <AppHeader />
    <section class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-28 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots opacity-30"></div>
      <div class="container mx-auto px-4 text-center text-white relative z-10">
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
          <i class="fas fa-info-circle text-gold-500 mr-3"></i>
          About Us
        </h1>
        <p class="text-xl text-gray-300 dark:text-gray-400">من نحن</p>
        <div class="gold-line mt-6"></div>
      </div>
    </section>
    <section class="py-12 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-4 max-w-4xl prose prose-lg dark:prose-invert text-center">
        <h2 class="text-navy-900 dark:text-white text-3xl font-display font-bold mb-6">Universal Oxford Formations</h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          Universal Oxford Formations is a premier educational institution offering
          world-class language courses and IT training. With expert instructors
          and modern methods, we empower students to achieve excellence in
          languages like English, French, Spanish, German, Italian and master
          essential computer skills.
        </p>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mt-6">
          Our mission is to bridge language barriers and provide high-quality education
          that serves as a catalyst for professional and personal growth. Whether you are looking to advance your career, prepare for studying abroad, or simply learn a new skill, we have the right program for you.
        </p>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About Us - Universal Oxford Formations'
})
</script>
