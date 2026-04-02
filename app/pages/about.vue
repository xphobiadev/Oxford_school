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
    <section class="py-20 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <!-- Image/Logo Side -->
          <div class="lg:col-span-5 relative flex justify-center">
            <div class="absolute inset-0 bg-gold-500/10 dark:bg-gold-500/5 rounded-full blur-3xl max-w-md mx-auto aspect-square"></div>
            <img 
              src="/images/logo.png" 
              alt="Universal Oxford Formations Logo" 
              class="relative z-10 w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700
                     ring-4 ring-white/50 dark:ring-navy-800/50 rounded-full p-4 bg-white/10 backdrop-blur-sm" 
            />
          </div>

          <!-- Content Side -->
          <div class="lg:col-span-7">
            <h2 class="text-navy-900 dark:text-white text-4xl lg:text-5xl font-display font-bold mb-4">Universal Oxford Formations</h2>
            <div class="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-400 mb-8 rounded-full"></div>
            
            <div class="space-y-6">
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                <strong class="text-navy-800 dark:text-white font-semibold">Universal Oxford Formations</strong> is a premier educational institution dedicated to cultivating global communicators and tech-savvy professionals. We offer world-class language courses and comprehensive IT training designed to bridge educational paths with modern career demands.
              </p>
              
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Our expansive language center provides expert-led programs in English, French, Spanish, German, and Italian. Whether you are aiming to study abroad, integrate into a new cultural environment, or boost your corporate profile, our tailored linguistic approaches ensure rapid and profound mastery.
              </p>

              <h3 class="text-navy-900 dark:text-white text-2xl font-display font-bold pt-4">Our Vision & Mission</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                We envision a world interconnected through seamless communication and digital literacy. Our mission is to dismantle language and technological barriers by providing high-quality, engaging, and dynamic education. We view ourselves not just as a school, but as a catalyst for profound professional and personal growth.
              </p>

              <h3 class="text-navy-900 dark:text-white text-2xl font-display font-bold pt-4">Why Choose Us?</h3>
              <ul class="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
                <li class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-800/50 hover:border-gold-500/30 transition-colors">
                  <div class="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i class="fas fa-chalkboard-teacher text-gold-500"></i>
                  </div>
                  <div>
                    <strong class="block text-navy-900 dark:text-white mb-1">Expert Instructors</strong>
                    <span class="text-base text-gray-500 dark:text-gray-400">Learn from highly qualified, passionate professionals with years of industry and academic experience.</span>
                  </div>
                </li>
                
                <li class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-800/50 hover:border-gold-500/30 transition-colors">
                  <div class="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i class="fas fa-book-open text-gold-500"></i>
                  </div>
                  <div>
                    <strong class="block text-navy-900 dark:text-white mb-1">Modern Curriculum</strong>
                    <span class="text-base text-gray-500 dark:text-gray-400">Engage in interactive learning combining theoretical foundations with robust, active practice.</span>
                  </div>
                </li>
                
                <li class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-800/50 hover:border-gold-500/30 transition-colors">
                  <div class="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i class="fas fa-laptop-code text-gold-500"></i>
                  </div>
                  <div>
                    <strong class="block text-navy-900 dark:text-white mb-1">Holistic Development</strong>
                    <span class="text-base text-gray-500 dark:text-gray-400">Beyond languages, we prepare you with vital software and essential IT competencies for the modern world.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
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
