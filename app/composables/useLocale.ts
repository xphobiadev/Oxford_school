import type { LocalizedField } from '~/types'

export const useLocale = () => {
  const currentLang = useState<'en' | 'fr' | 'ar'>('site-locale', () => 'en')

  const setLang = (lang: 'en' | 'fr' | 'ar') => {
    currentLang.value = lang
    if (import.meta.client) {
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }
  }

  const t = (field: LocalizedField | string | null | undefined): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    
    // Prioritize current language selected
    const val = field[currentLang.value]
    if (val) return val

    // Always fallback to english if current lang isn't available
    if (field.en) return field.en
    if (field.fr) return field.fr
    if (field.ar) return field.ar
    
    return ''
  }

  return {
    currentLang,
    setLang,
    t
  }
}
