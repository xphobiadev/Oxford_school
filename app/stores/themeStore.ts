import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false)

    // Initialize from localStorage
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') {
            isDark.value = true
        } else if (!saved) {
            // Check system preference
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
    }

    const applyTheme = () => {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', isDark.value)
        }
    }

    const toggle = () => {
        isDark.value = !isDark.value
    }

    // Watch and persist
    watch(isDark, (val) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', val ? 'dark' : 'light')
        }
        applyTheme()
    }, { immediate: true })

    return { isDark, toggle }
})
