<!-- app/components/layout/AppHeader.vue -->
<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="
      isScrolled
        ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gold-500/10'
        : 'bg-white/50 dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none'
    "
  >
    <nav class="container mx-auto px-6 py-3 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-4 group">
        <div class="relative">
          <img
            :src="'/images/logo.png'"
            alt="Universal Oxford Groupe"
            class="w-14 h-14 object-contain rounded-full
                   group-hover:scale-110 transition-transform duration-500
                   ring-2 ring-gold-500/30 group-hover:ring-gold-500/60"
          />
          <div
            class="absolute inset-0 rounded-full bg-gold-500/0
                   group-hover:bg-gold-500/10 transition-colors duration-500"
          ></div>
        </div>
        <div class="hidden sm:block">
          <span class="font-display font-bold text-lg leading-tight block transition-colors duration-300"
                :class="isScrolled ? 'text-navy-900 dark:text-white' : 'text-navy-900 dark:text-white'">
            Universal Oxford
          </span>
          <span class="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase">
            Groupe
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <ul class="hidden lg:flex items-center gap-1">
        <li v-for="item in menuItems" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="relative px-5 py-2.5 rounded-full font-medium text-sm tracking-wide
                   transition-all duration-300 group flex items-center gap-2 text-navy-800 hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
          >
            <i :class="item.icon" class="text-gold-600 dark:text-gold-500/70 group-hover:text-gold-500 text-xs"></i>
            {{ item.label }}
          </NuxtLink>
        </li>
        <li class="ml-4 flex items-center gap-4">
          <ThemeToggle />
          <NuxtLink
            to="/#contact"
            class="btn-gold text-sm py-2.5 px-5 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <i class="fas fa-paper-plane"></i>
            Contact Us
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center
               transition-all duration-300 border border-gold-500/20
               hover:border-gold-500/50 hover:bg-black/5 dark:hover:bg-white/5"
        :class="isScrolled ? 'text-navy-900 dark:text-white' : 'text-navy-900 dark:text-white'"
      >
        <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-6 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-6 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white/98 dark:bg-navy-900/98 backdrop-blur-2xl border-t border-gold-500/10
               shadow-2xl"
      >
        <ul class="py-6 px-6 space-y-1">
          <li v-for="item in menuItems" :key="item.path">
            <NuxtLink
              :to="item.path"
              class="flex items-center gap-4 px-5 py-4 rounded-2xl text-navy-700 dark:text-gray-300
                     hover:text-gold-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium
                     border border-transparent hover:border-gold-500/10"
              @click="isMobileMenuOpen = false"
            >
              <i :class="item.icon" class="text-gold-500 w-5 text-center"></i>
              {{ item.label }}
            </NuxtLink>
          </li>
          <li class="pt-4">
            <NuxtLink
              to="/#contact"
              class="btn-gold w-full text-center py-4 block"
              @click="isMobileMenuOpen = false"
            >
              <i class="fas fa-paper-plane mr-2"></i>
              Contact Us
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const menuItems = [
  { label: 'Home', path: '/', icon: 'fas fa-home' },
  { label: 'Our Schools', path: '/#schools', icon: 'fas fa-graduation-cap' },
  { label: 'Testimonials', path: '/#testimonials', icon: 'fas fa-star' },
  { label: 'Careers', path: '/jobs', icon: 'fas fa-briefcase' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
