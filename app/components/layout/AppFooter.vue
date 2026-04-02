<!-- app/components/layout/AppFooter.vue -->
<template>
  <footer class="relative bg-navy-950 text-white overflow-hidden">
    <!-- Decorative Top Border -->
    <div class="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-pattern-dots opacity-30"></div>

    <div class="relative container mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">

        <!-- About -->
        <div class="md:col-span-5">
          <div class="flex items-center gap-4 mb-8">
            <img
              :src="'/images/logo.png'"
              alt="Universal Oxford Groupe"
              class="w-20 h-20 object-contain rounded-full
                     ring-2 ring-gold-500/30"
            />
            <div>
              <h3 class="font-display font-bold text-2xl text-white">
                Universal Oxford
              </h3>
              <span class="text-gold-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Groupe
              </span>
            </div>
          </div>
          <p class="text-gray-400 leading-relaxed text-sm mb-8 max-w-md">
            Universal Oxford Groupe is a premier educational institution offering
            world-class language courses and IT training. With expert instructors
            and modern methods, we empower students to achieve excellence in
            languages like English, French, Spanish, German, Italian and master
            essential computer skills.
          </p>
          <!-- Social -->
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              :title="social.name"
              class="w-11 h-11 rounded-xl bg-white/5 border border-white/10
                     flex items-center justify-center hover:bg-gold-500
                     hover:border-gold-500 hover:text-navy-900 text-gray-400
                     transition-all duration-300 hover:scale-110 hover:shadow-gold"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3">
          <h4 class="font-display font-bold text-lg mb-6 text-gold-500">
            Quick Links
          </h4>
          <div class="gold-line-left"></div>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-gray-400 hover:text-gold-500 transition-all duration-300
                       flex items-center gap-3 group text-sm py-1"
              >
                <i class="ph-fill ph-caret-right text-[10px] text-gold-500/50
                          group-hover:text-gold-500 group-hover:translate-x-1
                          transition-all"></i>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="md:col-span-4">
          <h4 class="font-display font-bold text-lg mb-6 text-gold-500">
            Get in Touch
          </h4>
          <div class="gold-line-left"></div>
          <div class="space-y-4">
            <a href="tel:+2125XXXXXXXX"
               class="flex items-center gap-4 text-gray-400 hover:text-white
                      transition-colors group text-sm">
              <div class="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center
                          justify-center group-hover:bg-gold-500/20 transition-colors flex-shrink-0">
                <i class="ph-fill ph-phone text-gold-500 text-sm"></i>
              </div>
              +212 5XX-XXXXXX
            </a>
            <a href="https://wa.me/2126XXXXXXXX" target="_blank"
               class="flex items-center gap-4 text-gray-400 hover:text-white
                      transition-colors group text-sm">
              <div class="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center
                          justify-center group-hover:bg-gold-500/20 transition-colors flex-shrink-0">
                <i class="ph-fill ph-whatsapp-logo text-gold-500"></i>
              </div>
              +212 6XX-XXXXXX
            </a>
            <a href="mailto:contact@universaloxford.com"
               class="flex items-center gap-4 text-gray-400 hover:text-white
                      transition-colors group text-sm">
              <div class="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center
                          justify-center group-hover:bg-gold-500/20 transition-colors flex-shrink-0">
                <i class="ph-fill ph-envelope text-gold-500 text-sm"></i>
              </div>
              contact@universaloxford.com
            </a>
            <div class="flex items-center gap-4 text-gray-400 text-sm">
              <div class="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center
                          justify-center flex-shrink-0">
                <i class="ph-fill ph-map-pin text-gold-500 text-sm"></i>
              </div>
              Rue Des Haddadas N°95, Oued Zem 25350
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="relative border-t border-white/5">
      <div class="container mx-auto px-6 py-5 flex flex-col md:flex-row
                  items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }}
          <span class="text-gold-500 font-semibold">Universal Oxford Groupe</span>.
          All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-sm">
          <NuxtLink to="/terms" class="text-gray-500 hover:text-gold-500 transition-colors">
            Terms of Use
          </NuxtLink>
          <span class="text-gray-700">|</span>
          <NuxtLink to="/privacy" class="text-gray-500 hover:text-gold-500 transition-colors">
            Privacy Policy
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Schools', path: '/#schools' },
  { label: 'Testimonials', path: '/#testimonials' },
  { label: 'Our Partners', path: '/#partners' },
  { label: 'Careers', path: '/jobs' },
  { label: 'Contact Us', path: '/contact' },
]

const socialLinks = [
  { name: 'Facebook', icon: 'ph-fill ph-facebook-logo', url: '#' },
  { name: 'Instagram', icon: 'ph-fill ph-instagram-logo', url: '#' },
  { name: 'YouTube', icon: 'ph-fill ph-youtube-logo', url: '#' },
  { name: 'LinkedIn', icon: 'ph-fill ph-linkedin-logo', url: '#' },
  { name: 'WhatsApp', icon: 'ph-fill ph-whatsapp-logo', url: '#' },
  { name: 'TikTok', icon: 'ph-fill ph-tiktok-logo', url: '#' },
]
</script>
