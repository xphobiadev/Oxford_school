<template>
  <div>
    <AppHeader />
    <section class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-24 md:pt-28 pb-12 md:pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots dark:opacity-30 opacity-10"></div>
      <div class="container mx-auto px-4 md:px-6 text-center text-navy-900 dark:text-white relative z-10">
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <i class="ph-fill ph-envelope text-gold-500 mr-2 md:mr-3"></i>
          Contact Us
        </h1>
        <p class="text-lg sm:text-xl text-gray-300 dark:text-gray-400">اتصل بنا</p>
        <div class="gold-line mt-4 md:mt-6"></div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-gray-50 dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          
          <!-- Contact Info -->
          <div>
            <h2 class="font-display font-bold text-2xl md:text-3xl mb-4 md:mb-6 text-navy-900 dark:text-white">
              Get in Touch
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8 md:mb-10 leading-relaxed text-sm sm:text-base">
              We'd love to hear from you. Please fill out the form or reach out to us using the contact details below.
            </p>
            
            <div class="space-y-4 md:space-y-6">
              <a href="tel:+2125XXXXXXXX" class="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 hover:shadow-lg transition-all group border border-transparent dark:border-navy-700/80">
                <div class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                  <i class="ph-fill ph-phone text-lg sm:text-xl text-gold-500 group-hover:text-white transition-colors"></i>
                </div>
                <div class="min-w-0">
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1 text-sm sm:text-base">Phone</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base truncate">+212 5XX-XXXXXX</p>
                </div>
              </a>
              
              <a href="https://wa.me/2126XXXXXXXX" target="_blank" class="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 hover:shadow-lg transition-all group border border-transparent dark:border-navy-700/80">
                <div class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <i class="ph-fill ph-whatsapp-logo text-lg sm:text-xl text-green-500 group-hover:text-white transition-colors"></i>
                </div>
                <div class="min-w-0">
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1 text-sm sm:text-base">WhatsApp</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base truncate">+212 6XX-XXXXXX</p>
                </div>
              </a>

              <a href="mailto:contact@universaloxford.com" class="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 hover:shadow-lg transition-all group border border-transparent dark:border-navy-700/80">
                <div class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <i class="ph-fill ph-envelope text-lg sm:text-xl text-blue-500 group-hover:text-white transition-colors"></i>
                </div>
                <div class="min-w-0">
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1 text-sm sm:text-base">Email</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base truncate">contact@universaloxford.com</p>
                </div>
              </a>

              <div class="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 border border-transparent dark:border-navy-700/80">
                <div class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center">
                  <i class="ph-fill ph-map-pin text-lg sm:text-xl text-red-500"></i>
                </div>
                <div class="min-w-0">
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1 text-sm sm:text-base">Location</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base break-words">Rue Des Haddadas N°95, Oued Zem 25350</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white dark:bg-navy-900/50 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg dark:shadow-none border border-transparent dark:border-navy-700/80 mt-6 md:mt-0">
            <h3 class="text-xl md:text-2xl font-bold font-display text-navy-900 dark:text-white mb-6">Send us a message</h3>
            <form @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-1 md:mb-2">Name</label>
                <input type="text" required
                       class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                              focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none 
                              text-navy-900 dark:text-white placeholder-gray-400 text-sm md:text-base" placeholder="Your name" />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-1 md:mb-2">Email</label>
                <input type="email" required
                       class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                              focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none 
                              text-navy-900 dark:text-white placeholder-gray-400 text-sm md:text-base" placeholder="Your email address" />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-1 md:mb-2">Phone</label>
                <input type="tel"
                       class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                              focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none 
                              text-navy-900 dark:text-white placeholder-gray-400 text-sm md:text-base" placeholder="Your phone number" />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-1 md:mb-2">Subject</label>
                <input type="text" required
                       class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                              focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none 
                              text-navy-900 dark:text-white placeholder-gray-400 text-sm md:text-base" placeholder="Message subject" />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-1 md:mb-2">Message</label>
                <textarea rows="4" required
                          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none resize-none
                                 text-navy-900 dark:text-white placeholder-gray-400 text-sm md:text-base" placeholder="Your message"></textarea>
              </div>
              <button type="submit" 
                      class="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 
                             text-navy-950 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold flex items-center justify-center gap-2 md:gap-3 
                             transition-all shadow-lg hover:shadow-xl mt-2">
                <i class="ph-fill ph-paper-plane-right"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const submitForm = () => {
  alert('Thank you for your message. We will get back to you soon!')
}

useHead({
  title: 'Contact Us - Oxford School Group'
})
</script>
