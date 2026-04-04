import type { Partner } from '~/types'

export const usePartners = () => {
  const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })
  const partners = ref<Partner[]>([
    { id: 1, name: l('Cambridge English'), logo: '/images/partner-1.png', website: null, order: 1 },
    { id: 2, name: l('Alliance Française'), logo: '/images/partner-2.png', website: null, order: 2 },
    { id: 3, name: l('Instituto Cervantes'), logo: '/images/partner-3.png', website: null, order: 3 },
  ])

  return { partners }
}
