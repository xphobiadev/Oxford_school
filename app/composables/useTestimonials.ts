import type { Testimonial } from '~/types'

export const useTestimonials = () => {
  const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })
  const testimonials = ref<Testimonial[]>([
    { id: 1, author: l('Fatima Zahra'), photo: '/images/test-1.jpg', order: 1, website: null, content: l('An incredible learning experience! The teachers are dedicated and the curriculum is outstanding.', 'Une expérience d\'apprentissage incroyable ! Les professeurs sont dévoués.', 'تجربة تعلم مذهلة! الأساتذة متفانون والمنهج رائع.') },
    { id: 2, author: l('Youssef El Amrani'), photo: '/images/test-2.jpg', order: 2, website: null, content: l('Oxford School Group transformed my English skills completely. Highly recommended!', 'Le groupe Oxford a complètement transformé mes compétences en anglais.', 'لقد خولپت مجموعة أكسفورد مهاراتي في الإنجليزية بالكامل.') },
    { id: 3, author: l('Omar Benaissa'), photo: '', order: 3, website: null, content: l('The IT training programs are top-notch. I secured a job right after getting my certification.', 'Les programmes de formation informatique sont de premier ordre. J\'ai obtenu un emploi juste après avoir obtenu ma certification.', 'برامج التدريب في تكنولوجيا المعلومات ممتازة جداً. حصلت على وظيفة مباشرة بعد حصولي على الشهادة.') },
    { id: 4, author: l('Sara M.'), photo: '', order: 4, website: null, content: l('The environment is very supportive and encouraging. I love learning French here.', 'L\'environnement est très favorable et encourageant. J\'adore apprendre le français.', 'البيئة داعمة ومشجعة للغاية. أحب تعلم اللغة الفرنسية هنا.') },
    { id: 5, author: l('Amina R.'), photo: '', order: 5, website: null, content: l('Thanks to Universal Oxford, I successfully passed the Goethe certification with an excellent score!', 'Grâce à Universal Oxford, j\'ai réussi la certification Goethe avec un excellent score !', 'بفضل يونيفرسال أكسفورد، نجحت في اجتياز شهادة معهد غوته بدرجة ممتازة!') },
  ])

  return { testimonials }
}
