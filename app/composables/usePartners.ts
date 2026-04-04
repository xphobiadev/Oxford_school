import type { Partner } from '~/types'

export const usePartners = () => {
  const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })
  const partners = ref<Partner[]>([
    { id: 1, name: l('Cambridge English'), logo: '/images/partner-1.png', website: null, order: 1 },
    { id: 2, name: l('Alliance Française'), logo: '/images/partner-2.png', website: null, order: 2 },
    { id: 3, name: l('Instituto Cervantes'), logo: '/images/partner-3.png', website: null, order: 3 },
    { id: 4, name: l('British Council'), logo: '', website: null, order: 4 },
    { id: 5, name: l('Goethe-Institut'), logo: '', website: null, order: 5 },
    { id: 6, name: l('Microsoft Education'), logo: '', website: null, order: 6 },
    { id: 7, name: l('TOEFL'), logo: '', website: null, order: 7 },
    { id: 8, name: l('Cisco Networking Academy'), logo: '', website: null, order: 8 },
  ])

  return { partners }
}
