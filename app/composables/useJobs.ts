import type { Job, JobApplication } from '~/types'

export const useJobs = () => {
  const config = useRuntimeConfig()

  const jobs = ref<Job[]>([
    {
      id: 1,
      title: 'English Teacher - Full Time',
      description: `We are looking for an experienced English teacher to join our team.

**Responsibilities:**
- Teach English to students of various levels (A1-C2)
- Prepare lesson plans and course materials
- Assess student progress and provide feedback
- Participate in school events and activities

**Requirements:**
- TEFL/TESOL certification
- Minimum 3 years of teaching experience
- Excellent communication skills
- Bachelor's degree in English or related field`,
      requirements: 'TEFL certified, 3+ years experience',
      location: 'Oued Zem',
      type: 'Full-time',
      created_at: '2024-12-01'
    },
    {
      id: 2,
      title: 'French Teacher - Part Time',
      description: `Join our team as a part-time French teacher.

**Responsibilities:**
- Conduct French language classes
- Develop engaging learning materials
- Track student progress

**Requirements:**
- Native or near-native French proficiency
- Teaching certification preferred
- Minimum 2 years experience`,
      requirements: 'Native French, 2+ years experience',
      location: 'Oued Zem',
      type: 'Part-time',
      created_at: '2024-12-05'
    },
    {
      id: 3,
      title: 'Administrative Assistant',
      description: `We need an organized administrative assistant to support our school operations.

**Responsibilities:**
- Handle student registrations
- Manage schedules and appointments
- Answer phone calls and emails
- Maintain records and files

**Requirements:**
- Bilingual (Arabic/French)
- Computer proficiency
- Strong organizational skills`,
      requirements: 'Bilingual, organized',
      location: 'Oued Zem',
      type: 'Full-time',
      created_at: '2024-12-10'
    },
  ])

  const selectedJob = ref<Job | null>(null)

  const selectJob = (job: Job) => {
    selectedJob.value = job
  }

  const applyForJob = async (application: JobApplication) => {
    // لاحقاً: إرسال إلى API
    console.log('Job application submitted:', application)
    // const formData = new FormData()
    // Object.entries(application).forEach(([key, value]) => {
    //   if (value) formData.append(key, value)
    // })
    // await $fetch(`${config.public.apiBase}/jobs/apply`, {
    //   method: 'POST',
    //   body: formData
    // })
    return { success: true, message: 'Application submitted successfully!' }
  }

  return {
    jobs,
    selectedJob,
    selectJob,
    applyForJob,
  }
}
