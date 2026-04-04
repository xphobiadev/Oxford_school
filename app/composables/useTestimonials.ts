import type { Testimonial } from '~/types'

export const useTestimonials = () => {
  const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })
  const testimonials = ref<Testimonial[]>([
    { id: 1, author: l('Fatima Zahra'), photo: '/images/test-1.jpg', order: 1, website: null, content: l('An incredible learning experience! The teachers are dedicated and the curriculum is outstanding.', 'Une expérience d\'apprentissage incroyable ! Les professeurs sont dévoués.', 'تجربة تعلم مذهلة! الأساتذة متفانون والمنهج رائع.') },
    { id: 2, author: l('Youssef El Amrani'), photo: '/images/test-2.jpg', order: 2, website: null, content: l('Oxford School Group transformed my English skills completely. Highly recommended!', 'Le groupe Oxford a complètement transformé mes compétences en anglais.', 'لقد خولپت مجموعة أكسفورد مهاراتي في الإنجليزية بالكامل.') },
  ])

  return { testimonials }
}
