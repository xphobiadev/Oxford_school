import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 80, // Offset for the fixed header
          })
        }, 100)
      })
    }

    // Scroll to top on new page visit
    if (to.path !== from.path) {
      return { top: 0, left: 0, behavior: 'smooth' }
    }

    return { top: 0 }
  }
}
