<template>
  <div class="relative group">
    <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 text-navy-800 dark:text-gray-300 text-sm font-medium focus:outline-none">
      <i class="ph-fill ph-translate text-gold-600 dark:text-gold-500"></i>
      <span class="uppercase">{{ currentLang }}</span>
    </button>
    
    <!-- Dropdown -->
    <div class="absolute right-0 mt-2 w-32 bg-white dark:bg-navy-800 rounded-xl shadow-xl border border-gray-100 dark:border-navy-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
      <ul class="py-2">
        <li>
          <button @click="setLang('en')" class="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-navy-700 hover:text-gold-600 dark:hover:text-gold-400 text-sm flex items-center justify-between" :class="{ 'text-gold-600 font-bold dark:text-gold-400': currentLang === 'en', 'text-navy-700 dark:text-gray-300': currentLang !== 'en' }">
            English <i class="ph-bold ph-check" v-if="currentLang === 'en'"></i>
          </button>
        </li>
        <li>
          <button @click="setLang('fr')" class="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-navy-700 hover:text-gold-600 dark:hover:text-gold-400 text-sm flex items-center justify-between" :class="{ 'text-gold-600 font-bold dark:text-gold-400': currentLang === 'fr', 'text-navy-700 dark:text-gray-300': currentLang !== 'fr' }">
            Français <i class="ph-bold ph-check" v-if="currentLang === 'fr'"></i>
          </button>
        </li>
        <li>
          <button @click="setLang('ar')" class="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-navy-700 hover:text-gold-600 dark:hover:text-gold-400 text-sm flex items-center justify-between" :class="{ 'text-gold-600 font-bold dark:text-gold-400': currentLang === 'ar', 'text-navy-700 dark:text-gray-300': currentLang !== 'ar' }">
            العربية <i class="ph-bold ph-check" v-if="currentLang === 'ar'"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { currentLang, setLang } = useLocale()
</script>
