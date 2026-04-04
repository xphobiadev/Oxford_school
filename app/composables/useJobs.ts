import type { Job, JobApplication } from '~/types'

export const useJobs = () => {
  const config = useRuntimeConfig()
  const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })

  const jobs = ref<Job[]>([
    {
      id: 1,
      title: l('English Teacher - Full Time', 'Professeur d\'anglais - Temps plein', 'مدرس لغة إنجليزية - دوام كامل'),
      description: l(`We are looking for an experienced English teacher to join our team.

**Responsibilities:**
- Teach English to students of various levels (A1-C2)
- Prepare lesson plans and course materials
- Assess student progress and provide feedback
- Participate in school events and activities

**Requirements:**
- TEFL/TESOL certification
- Minimum 3 years of teaching experience
- Excellent communication skills
- Bachelor's degree in English or related field`),
      school_id: 1,
      created_at: '2024-12-01'
    },
    {
      id: 2,
      title: l('French Teacher - Part Time', 'Professeur de français - Temps partiel', 'مدرس لغة فرنسية - دوام جزئي'),
      description: l(`Join our team as a part-time French teacher.

**Responsibilities:**
- Conduct French language classes
- Develop engaging learning materials
- Track student progress

**Requirements:**
- Native or near-native French proficiency
- Teaching certification preferred
- Minimum 2 years experience`),
      school_id: 1,
      created_at: '2024-12-05'
    },
    {
      id: 3,
      title: l('Administrative Assistant', 'Assistant Administratif', 'مساعد إداري'),
      description: l(`We need an organized administrative assistant to support our school operations.

**Responsibilities:**
- Handle student registrations
- Manage schedules and appointments
- Answer phone calls and emails
- Maintain records and files

**Requirements:**
- Bilingual (Arabic/French)
- Computer proficiency
- Strong organizational skills`),
      school_id: 1,
      created_at: '2024-12-10'
    },
  ])

  const selectedJob = ref<Job | null>(null)

  const selectJob = (job: Job) => {
    selectedJob.value = job
  }

  const applyForJob = async (application: JobApplication) => {
    console.log('Job application submitted:', application)
    return { success: true, message: 'Application submitted successfully!' }
  }

  return {
    jobs,
    selectedJob,
    selectJob,
    applyForJob,
  }
}
