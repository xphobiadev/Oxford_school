import type { School, Testimonial, Partner } from '~/types'

export const useSchool = () => {
  const config = useRuntimeConfig()

  // بيانات تجريبية - ستُستبدل بـ API حقيقي
  const mainSchool = ref<School>({
    id: 1,
    name: 'Universal Oxford Groupe',
    slug: 'universal-oxford',
    logo: '/images/oxford-logo.png',
    description: 'Excellence in Education since 1990',
    heroImage: '/images/hero-bg.jpg',
    address: 'Rue Des Haddadas N°95, Oued Zem 25350',
    phone: '+212 5XX-XXXXXX',
    whatsapp: '+212 6XX-XXXXXX',
    email: 'contact@oxfordschoolgroup.com',
    mapLat: 33.5731,
    mapLng: -7.5898,
    languages: []
  })

  const subSchools = ref<School[]>([
    {
      id: 2,
      name: 'Oxford Academy',
      slug: 'oxford-academy',
      logo: '/images/school-1.png',
      description: 'Leading academy for language learning',
      heroImage: '/images/school-1-hero.jpg',
      address: '456 Academy Blvd, City',
      phone: '+212 5XX-XXXXXX',
      whatsapp: '+212 6XX-XXXXXX',
      email: 'academy@oxfordschoolgroup.com',
      mapLat: 33.5731,
      mapLng: -7.5898,
      languages: [
        {
          id: 1,
          name: 'English',
          icon: '🇬🇧',
          logo: '/images/lang-english.png',
          teachers: [
            {
              id: 1,
              name: 'Prof. Ahmed Benali',
              photo: '/images/teacher-1.jpg',
              bio: 'Expert English teacher with over 10 years of experience in teaching ESL students.',
              experience_years: 10,
              languages: [
                { language_name: 'English', level: 'C2' },
                { language_name: 'French', level: 'B2' },
              ],
              videos: [
                { id: 1, title: 'English Grammar Basics', thumbnail: '/images/vid-1.jpg', url: 'https://www.youtube.com/embed/xxx' },
                { id: 2, title: 'Speaking Practice', thumbnail: '/images/vid-2.jpg', url: 'https://www.youtube.com/embed/yyy' },
              ],
              albums: [
                {
                  id: 1, title: 'Class 2024', cover: '/images/album-1.jpg', year: '2024',
                  photos: [
                    { id: 1, url: '/images/photo-1.jpg', caption: 'First day' },
                    { id: 2, url: '/images/photo-2.jpg', caption: 'Group activity' },
                  ]
                }
              ]
            },
            {
              id: 2,
              name: 'Prof. Sara Moussaoui',
              photo: '/images/teacher-2.jpg',
              bio: 'Passionate English instructor specializing in Business English.',
              experience_years: 7,
              languages: [
                { language_name: 'English', level: 'C1' },
                { language_name: 'Arabic', level: 'Native' },
              ],
              videos: [],
              albums: []
            }
          ]
        },
        {
          id: 2,
          name: 'French',
          icon: '🇫🇷',
          logo: '/images/lang-french.png',
          teachers: [
            {
              id: 3,
              name: 'Prof. Jean Dupont',
              photo: '/images/teacher-3.jpg',
              bio: 'Native French speaker with DALF certification and 12 years of teaching experience.',
              experience_years: 12,
              languages: [
                { language_name: 'French', level: 'Native' },
                { language_name: 'English', level: 'B2' },
              ],
              videos: [],
              albums: []
            }
          ]
        },
        {
          id: 3,
          name: 'Spanish',
          icon: '🇪🇸',
          logo: '/images/lang-spanish.png',
          teachers: []
        }
      ]
    },
    {
      id: 3,
      name: 'Oxford Institute',
      slug: 'oxford-institute',
      logo: '/images/school-2.png',
      description: 'Professional training and certification center',
      heroImage: '/images/school-2-hero.jpg',
      address: '789 Institute Ave, City',
      phone: '+212 5XX-XXXXXX',
      whatsapp: '+212 6XX-XXXXXX',
      email: 'institute@oxfordschoolgroup.com',
      mapLat: 33.5800,
      mapLng: -7.5900,
      languages: []
    },
    {
      id: 4,
      name: 'Oxford Kids',
      slug: 'oxford-kids',
      logo: '/images/school-3.png',
      description: 'Early childhood language education',
      heroImage: '/images/school-3-hero.jpg',
      address: '321 Kids Lane, City',
      phone: '+212 5XX-XXXXXX',
      whatsapp: '+212 6XX-XXXXXX',
      email: 'kids@oxfordschoolgroup.com',
      mapLat: 33.5650,
      mapLng: -7.5850,
      languages: []
    }
  ])

  const getSchoolBySlug = (slug: string): School | undefined => {
    return subSchools.value.find(s => s.slug === slug)
  }

  // لاحقاً: استبدال بـ API
  // const fetchSchools = async () => {
  //   const { data } = await useFetch(`${config.public.apiBase}/schools`)
  //   subSchools.value = data.value
  // }

  return {
    mainSchool,
    subSchools,
    getSchoolBySlug,
  }
}

export const useTestimonials = () => {
  const testimonials = ref<Testimonial[]>([
    { id: 1, name: 'Fatima Zahra', photo: '/images/test-1.jpg', rating: 5, message: 'An incredible learning experience! The teachers are dedicated and the curriculum is outstanding.' },
    { id: 2, name: 'Youssef El Amrani', photo: '/images/test-2.jpg', rating: 5, message: 'Oxford School Group transformed my English skills completely. Highly recommended!' },
    { id: 3, name: 'Amina Boutayeb', photo: '/images/test-3.jpg', rating: 4, message: 'Great environment for learning. My children love going to their language classes.' },
    { id: 4, name: 'Karim Hassani', photo: '/images/test-4.jpg', rating: 5, message: 'Professional staff and modern teaching methods. Best language school in the city.' },
    { id: 5, name: 'Nadia Berrada', photo: '/images/test-5.jpg', rating: 5, message: 'I achieved my B2 certification thanks to the amazing professors here.' },
    { id: 6, name: 'Omar Tazi', photo: '/images/test-6.jpg', rating: 4, message: 'Flexible schedules and excellent course materials. Very satisfied with my progress.' },
  ])

  return { testimonials }
}

export const usePartners = () => {
  const partners = ref<Partner[]>([
    { id: 1, name: 'Partner 1', logo: '/images/partner-1.png' },
    { id: 2, name: 'Partner 2', logo: '/images/partner-2.png' },
    { id: 3, name: 'Partner 3', logo: '/images/partner-3.png' },
    { id: 4, name: 'Partner 4', logo: '/images/partner-4.png' },
    { id: 5, name: 'Partner 5', logo: '/images/partner-5.png' },
    { id: 6, name: 'Partner 6', logo: '/images/partner-6.png' },
  ])

  return { partners }
}
