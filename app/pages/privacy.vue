<template>
  <div>
    <AppHeader />
    <section class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-28 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots opacity-30"></div>
      <div class="container mx-auto px-4 text-center text-white relative z-10">
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
          <i class="fas fa-shield-alt text-gold-500 mr-3"></i>
          Privacy Policy
        </h1>
        <p class="text-xl text-gray-300 dark:text-gray-400">سياسة الخصوصية</p>
        <div class="gold-line mt-6"></div>
      </div>
    </section>
    <section class="py-12 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-4 max-w-4xl prose prose-lg dark:prose-invert">
        <h2 class="text-navy-900 dark:text-white">1. Information Collection</h2>
        <p class="text-gray-600 dark:text-gray-300">We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.</p>
        <h2 class="text-navy-900 dark:text-white mt-8">2. Data Usage</h2>
        <p class="text-gray-600 dark:text-gray-300">Any of the information we collect from you may be used in one of the following ways: To personalize your experience, to improve our website, to improve customer service, or to process transactions.</p>
        <h2 class="text-navy-900 dark:text-white mt-8">3. Data Protection</h2>
        <p class="text-gray-600 dark:text-gray-300">We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
        <h2 class="text-navy-900 dark:text-white mt-8">4. Cookies</h2>
        <p class="text-gray-600 dark:text-gray-300">We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Privacy Policy - Oxford School Group'
})
</script>
