import type { School, Testimonial, Partner, Teacher, Language } from '~/types'

export const useSchool = () => {
  const config = useRuntimeConfig()

  // Helper macro to generate generic localized fields
  const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })

  // Mock Data
  const mainSchool = ref<School>({
    id: 1,
    name: l('Universal Oxford Groupe', 'Groupe Oxford Universel', 'مجموعة أكسفورد العالمية'),
    address: l('Rue Des Haddadas N°95, Oued Zem 25350', 'Rue Des Haddadas N°95, Oued Zem 25350', 'شارع الحدادات رقم 95، وادي زم 25350'),
    short_description: l('Excellence in Education since 1990', 'L\'excellence dans l\'éducation depuis 1990', 'التميز في التعليم منذ 1990'),
    email: 'contact@oxfordschoolgroup.com',
    primary_phone: '+212 5XX-XXXXXX',
    secondary_phone: '+212 6XX-XXXXXX',
    logo: '/images/oxford-logo.png',
    language_ids: [],
    languages: [],
    slug: 'universal-oxford',
    heroImage: '/images/hero-bg.jpg',
    mapLat: 33.5731,
    mapLng: -7.5898,
  })

  const subSchools = ref<School[]>([
    {
      id: 2,
      name: l('Oxford Academy', 'Académie Oxford', 'أكاديمية أكسفورد'),
      address: l('456 Academy Blvd, City', '456 Boulevard de l\'Académie, Ville', '456 شارع الأكاديمية، المدينة'),
      short_description: l('Leading academy for language learning', 'Académie leader pour l\'apprentissage des langues', 'الأكاديمية الرائدة لتعلم اللغات'),
      email: 'academy@oxfordschoolgroup.com',
      primary_phone: '+212 5XX-XXXXXX',
      secondary_phone: '+212 6XX-XXXXXX',
      logo: '/images/school-1.png',
      language_ids: [1, 2],
      languages: [
        {
          id: 1,
          code: 'en',
          name: l('English', 'Anglais', 'الإنجليزية'),
          logo: '🇬🇧',
          teachers: [
            {
              id: 1,
              first_name: l('Ahmed', 'Ahmed', 'أحمد'),
              last_name: l('Benali', 'Benali', 'بن علي'),
              meta: {
                en: { experience_years: 10, bio: 'Expert English teacher with a decade of experience in communicative language teaching.', education: 'MA in Applied Linguistics', certifications: ['CELTA', 'DELTA', 'IELTS Examiner'] },
                fr: { experience_years: 10, bio: 'Professeur d\'anglais expert avec une décennie d\'enseignement communicatif.', education: 'Master en Linguistique Appliquée', certifications: ['CELTA', 'DELTA', 'Examinateur IELTS'] },
                ar: { experience_years: 10, bio: 'مدرس لغة إنجليزية خبير مع عقد من الخبرة في تدريس اللغة التواصلية.', education: 'ماجستير في اللسانيات التطبيقية', certifications: ['سيلتا', 'دلتا', 'ممتحن آيلتس'] },
              },
              galleries: [
                {
                  id: 1,
                  title: l('English Speaking Workshop 2024', 'Atelier de conversation anglaise 2024', 'ورشة المحادثة الإنجليزية 2024'),
                  activity_date: '2024-11-15',
                  media: [
                    { id: 1, url: 'https://picsum.photos/seed/workshop1/600/400', mime_type: 'image/jpeg' },
                    { id: 2, url: 'https://picsum.photos/seed/workshop2/600/400', mime_type: 'image/jpeg' },
                    { id: 3, url: 'https://picsum.photos/seed/workshop3/600/400', mime_type: 'image/jpeg' },
                    { id: 10, url: 'https://picsum.photos/seed/workshop4/600/400', mime_type: 'image/jpeg' },
                  ]
                },
                {
                  id: 2,
                  title: l('End of Year Celebration', 'Célébration de fin d\'année', 'حفل نهاية السنة'),
                  activity_date: '2024-06-20',
                  media: [
                    { id: 4, url: 'https://picsum.photos/seed/celebration1/600/400', mime_type: 'image/jpeg' },
                    { id: 5, url: 'https://picsum.photos/seed/celebration2/600/400', mime_type: 'image/jpeg' },
                    { id: 11, url: 'https://picsum.photos/seed/celebration3/600/400', mime_type: 'image/jpeg' },
                  ]
                }
              ],
              mappedLanguages: [
                { language_name: 'English', level: 'C2' },
                { language_name: 'French', level: 'B2' }
              ]
            },
            {
              id: 2,
              first_name: l('Sara', 'Sara', 'سارة'),
              last_name: l('Moussaoui', 'Moussaoui', 'موساوي'),
              meta: {
                en: { experience_years: 7, bio: 'Passionate English instructor specializing in exam preparation and academic writing.', education: 'BA in English Literature', certifications: ['TEFL', 'TKT'] },
                fr: { experience_years: 7, bio: 'Instructrice d\'anglais passionnée spécialisée dans la préparation aux examens.', education: 'Licence en Littérature Anglaise', certifications: ['TEFL', 'TKT'] },
                ar: { experience_years: 7, bio: 'مدرسة لغة إنجليزية شغوفة متخصصة في التحضير للامتحانات والكتابة الأكاديمية.', education: 'إجازة في الأدب الإنجليزي', certifications: ['تيفل', 'تي كي تي'] },
              },
              galleries: [
                {
                  id: 3,
                  title: l('Reading Club Session', 'Session du Club de Lecture', 'جلسة نادي القراءة'),
                  activity_date: '2024-10-05',
                  media: [
                    { id: 6, url: 'https://picsum.photos/seed/reading1/600/400', mime_type: 'image/jpeg' },
                    { id: 7, url: 'https://picsum.photos/seed/reading2/600/400', mime_type: 'image/jpeg' },
                  ]
                }
              ],
              mappedLanguages: [
                { language_name: 'English', level: 'C1' },
                { language_name: 'Arabic', level: 'Native' }
              ]
            }
          ] as Teacher[]
        },
        {
          id: 2,
          code: 'fr',
          name: l('French', 'Français', 'الفرنسية'),
          logo: '🇫🇷',
          teachers: [
            {
              id: 3,
              first_name: l('Jean', 'Jean', 'جان'),
              last_name: l('Dupont', 'Dupont', 'دوبون'),
              meta: {
                en: { experience_years: 12, bio: 'Native French speaker with expertise in DELF/DALF preparation.', education: 'MA in French as a Foreign Language (FLE)', certifications: ['DALF C2', 'FLE Certified'] },
                fr: { experience_years: 12, bio: 'Locuteur natif français expert dans la préparation DELF/DALF.', education: 'Master en Français Langue Étrangère (FLE)', certifications: ['DALF C2', 'Certifié FLE'] },
                ar: { experience_years: 12, bio: 'متحدث فرنسي أصلي خبير في تحضير DELF/DALF.', education: 'ماجستير في تعليم الفرنسية كلغة أجنبية', certifications: ['دالف C2', 'معتمد FLE'] },
              },
              galleries: [],
              mappedLanguages: [
                { language_name: 'French', level: 'Native' },
                { language_name: 'English', level: 'B2' }
              ]
            }
          ] as Teacher[]
        }
      ],
      slug: 'oxford-academy',
      heroImage: '/images/school-1-hero.jpg',
      mapLat: 33.5731,
      mapLng: -7.5898,
    },
    {
      id: 3,
      name: l('Oxford Institute', 'Institut Oxford', 'معهد أكسفورد'),
      address: l('789 Institute Ave, City', '789 Avenue de l\'Institut, Ville', '789 شارع المعهد، المدينة'),
      short_description: l('Professional training and certification center', 'Centre de formation professionnelle et de certification', 'مركز تدريب واعتماد مهني'),
      email: 'institute@oxfordschoolgroup.com',
      primary_phone: '+212 5XX-XXXXXX',
      secondary_phone: '+212 6XX-XXXXXX',
      logo: '/images/school-2.png',
      language_ids: [],
      languages: [],
      slug: 'oxford-institute',
      heroImage: '/images/school-2-hero.jpg',
      mapLat: 33.5800,
      mapLng: -7.5900,
    },
    {
      id: 4,
      name: l('Oxford Kids', 'Oxford Enfants', 'أكسفورد للأطفال'),
      address: l('321 Kids Lane, City', '321 Ruelle des Enfants, Ville', '321 حارة الأطفال، المدينة'),
      short_description: l('Early childhood language education', 'Éducation linguistique pour la petite enfance', 'تعليم اللغات في مرحلة الطفولة المبكرة'),
      email: 'kids@oxfordschoolgroup.com',
      primary_phone: '+212 5XX-XXXXXX',
      secondary_phone: '+212 6XX-XXXXXX',
      logo: '/images/school-3.png',
      language_ids: [],
      languages: [],
      slug: 'oxford-kids',
      heroImage: '/images/school-3-hero.jpg',
      mapLat: 33.5650,
      mapLng: -7.5850,
    }
  ])

  const getSchoolBySlug = (slug: string): School | undefined => {
    return subSchools.value.find(s => s.slug === slug)
  }

  return {
    mainSchool,
    subSchools,
    getSchoolBySlug,
  }
}
