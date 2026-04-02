<template>
  <button
    @click="toggleTheme"
    class="relative p-2 rounded-full transition-all duration-300
           hover:bg-gold-500/10 dark:hover:bg-gold-500/10 focus:outline-none"
    aria-label="Toggle Theme"
    title="Toggle Light/Dark Mode"
  >
    <div class="relative w-6 h-6 flex items-center justify-center overflow-hidden">
      <Transition name="spin-fade" mode="out-in">
        <i
          v-if="$colorMode.value === 'dark'"
          class="ph-fill ph-sun text-gold-400 absolute text-xl transition-all"
        ></i>
        <i
          v-else
          class="ph-fill ph-moon text-navy-800 absolute text-xl transition-all"
        ></i>
      </Transition>
    </div>
  </button>
</template>

<script setup lang="ts">
// Make sure this only renders once the client is loaded to prevent hydration mismatch
const colorMode = useColorMode()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.spin-fade-enter-active,
.spin-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.spin-fade-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}
.spin-fade-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}
</style>
