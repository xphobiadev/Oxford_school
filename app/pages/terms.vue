<template>
  <div>
    <AppHeader />
    <section class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-28 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots opacity-30"></div>
      <div class="container mx-auto px-4 text-center text-white relative z-10">
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
          <i class="ph-fill ph-file-text text-gold-500 mr-3"></i>
          Terms of Use
        </h1>
        <p class="text-xl text-gray-300 dark:text-gray-400">شروط الاستخدام</p>
        <div class="gold-line mt-6"></div>
      </div>
    </section>
    <section class="py-12 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-4 max-w-4xl prose prose-lg dark:prose-invert">
        <h2 class="text-navy-900 dark:text-white">1. Acceptance of Terms</h2>
        <p class="text-gray-600 dark:text-gray-300">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h2 class="text-navy-900 dark:text-white mt-8">2. Use License</h2>
        <p class="text-gray-600 dark:text-gray-300">Permission is granted to temporarily download one copy of the materials (information or software) on Universal Oxford Groupe's website for personal, non-commercial transitory viewing only.</p>
        <h2 class="text-navy-900 dark:text-white mt-8">3. Disclaimer</h2>
        <p class="text-gray-600 dark:text-gray-300">The materials on Universal Oxford Groupe's website are provided on an 'as is' basis. Universal Oxford Groupe makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <h2 class="text-navy-900 dark:text-white mt-8">4. Limitations</h2>
        <p class="text-gray-600 dark:text-gray-300">In no event shall Universal Oxford Groupe or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Universal Oxford Groupe's website.</p>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Terms of Use - Oxford School Group'
})
</script>
