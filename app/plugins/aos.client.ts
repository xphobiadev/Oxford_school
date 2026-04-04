import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    nuxtApp.hook('app:mounted', () => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
      })
    })
    // Refresh AOS exactly AFTER page transitions finish, otherwise DOM elements are hidden by Vue's <Transition> logic during the scan
    nuxtApp.hook('page:transition:finish', () => {
      setTimeout(() => {
        AOS.init()
        AOS.refreshHard()
      }, 100)
    })
  }
})
