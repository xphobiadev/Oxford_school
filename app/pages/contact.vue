<template>
  <div>
    <AppHeader />
    <section class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-28 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots dark:opacity-30 opacity-10"></div>
      <div class="container mx-auto px-4 text-center text-navy-900 dark:text-white relative z-10">
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
          <i class="ph-fill ph-envelope text-gold-500 mr-3"></i>
          Contact Us
        </h1>
        <p class="text-xl text-gray-300 dark:text-gray-400">اتصل بنا</p>
        <div class="gold-line mt-6"></div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <!-- Contact Info -->
          <div>
            <h2 class="font-display font-bold text-3xl mb-6 text-navy-900 dark:text-white">
              Get in Touch
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              We'd love to hear from you. Please fill out the form or reach out to us using the contact details below.
            </p>
            
            <div class="space-y-6">
              <a href="tel:+2125XXXXXXXX" class="flex items-center gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 hover:shadow-lg transition-all group border border-transparent dark:border-navy-700/80">
                <div class="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                  <i class="ph-fill ph-phone text-xl text-gold-500 group-hover:text-white transition-colors"></i>
                </div>
                <div>
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1">Phone</h4>
                  <p class="text-gray-500 dark:text-gray-400">+212 5XX-XXXXXX</p>
                </div>
              </a>
              
              <a href="https://wa.me/2126XXXXXXXX" target="_blank" class="flex items-center gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 hover:shadow-lg transition-all group border border-transparent dark:border-navy-700/80">
                <div class="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <i class="ph-fill ph-whatsapp-logo text-xl text-green-500 group-hover:text-white transition-colors"></i>
                </div>
                <div>
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1">WhatsApp</h4>
                  <p class="text-gray-500 dark:text-gray-400">+212 6XX-XXXXXX</p>
                </div>
              </a>

              <a href="mailto:contact@universaloxford.com" class="flex items-center gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 hover:shadow-lg transition-all group border border-transparent dark:border-navy-700/80">
                <div class="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <i class="ph-fill ph-envelope text-xl text-blue-500 group-hover:text-white transition-colors"></i>
                </div>
                <div>
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1">Email</h4>
                  <p class="text-gray-500 dark:text-gray-400">contact@universaloxford.com</p>
                </div>
              </a>

              <div class="flex items-center gap-6 p-4 rounded-2xl bg-white dark:bg-navy-900/50 border border-transparent dark:border-navy-700/80">
                <div class="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                  <i class="ph-fill ph-map-pin text-xl text-red-500"></i>
                </div>
                <div>
                  <h4 class="text-navy-900 dark:text-white font-semibold mb-1">Location</h4>
                  <p class="text-gray-500 dark:text-gray-400">Rue Des Haddadas N°95, Oued Zem 25350</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white dark:bg-navy-900/50 p-8 rounded-3xl shadow-lg dark:shadow-none border border-transparent dark:border-navy-700/80">
            <h3 class="text-2xl font-bold font-display text-navy-900 dark:text-white mb-6">Send us a message</h3>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">Name</label>
                <input type="text" required
                       class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                              focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none 
                              text-navy-900 dark:text-white placeholder-gray-400" placeholder="Your name" />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">Email</label>
                <input type="email" required
                       class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                              focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none 
                              text-navy-900 dark:text-white placeholder-gray-400" placeholder="Your email address" />
              </div>
              <div>
                <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">Message</label>
                <textarea rows="4" required
                          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 transition-all outline-none resize-none
                                 text-navy-900 dark:text-white placeholder-gray-400" placeholder="Your message"></textarea>
              </div>
              <button type="submit" 
                      class="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 
                             text-navy-950 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 
                             transition-all shadow-lg hover:shadow-xl">
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
