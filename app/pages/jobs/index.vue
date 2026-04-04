<template>
  <div>
    <AppHeader />

    <!-- Hero -->
    <section class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-28 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots opacity-30"></div>
      <div class="container mx-auto px-4 text-center text-white relative z-10">
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
          <i class="ph-fill ph-briefcase text-gold-500 mr-3"></i>
          Career Opportunities
        </h1>
        <p class="text-xl text-gray-300 dark:text-gray-400">Join our team and shape the future of education</p>
        <div class="gold-line mt-6"></div>
      </div>
    </section>

    <!-- Jobs Layout (LinkedIn-style) -->
    <section class="py-12 bg-gray-50 dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

          <!-- Sidebar: Jobs List -->
          <div class="lg:w-[380px] flex-shrink-0">
            <div class="lg:sticky lg:top-24">
              <h2 class="font-semibold text-lg text-navy-800 dark:text-gray-200 mb-4">
                <i class="ph-fill ph-list mr-2 text-gold-500"></i>
                Available Positions ({{ jobs.length }})
              </h2>
              <div class="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                <button
                  v-for="job in jobs"
                  :key="job.id"
                  @click="selectJob(job)"
                  class="w-full text-left p-5 rounded-2xl border-2 transition-all duration-300"
                  :class="selectedJob?.id === job.id
                    ? 'border-gold-500 bg-gold-500/5 dark:bg-gold-500/10 shadow-md dark:shadow-gold-500/10'
                    : 'border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-900/50 hover:border-gold-400 dark:hover:border-gold-500/50 hover:shadow-sm'"
                >
                  <h3 class="font-semibold text-navy-900 dark:text-white mb-2">{{ t(job.title) }}</h3>
                  <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <!-- Removed static location and type -->
                  </div>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    <i class="ph-fill ph-calendar mr-1"></i>
                    Posted: {{ formatDate(job.created_at) }}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <!-- Main: Job Details -->
          <div class="flex-1">
            <Transition name="fade" mode="out-in">
              <div v-if="selectedJob" :key="selectedJob.id"
                   class="bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-navy-700/80 rounded-3xl shadow-lg dark:shadow-navy-950/50 p-8 md:p-10 transition-colors duration-500">
                <!-- Job Header -->
                <div class="mb-8">
                  <h2 class="font-display text-3xl font-bold text-navy-900 dark:text-white mb-3">
                    {{ t(selectedJob.title) }}
                  </h2>
                  <div class="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
                    <span class="flex items-center gap-2">
                      <i class="ph-fill ph-calendar text-gold-500"></i>
                      {{ formatDate(selectedJob.created_at) }}
                    </span>
                  </div>
                </div>

                <!-- Job Description -->
                <div class="prose prose-lg max-w-none mb-10 text-gray-700 dark:text-gray-300 leading-relaxed"
                     v-html="formatDescription(t(selectedJob.description))">
                </div>

                <!-- Apply Button -->
                <div class="border-t border-gray-200 dark:border-navy-700 pt-8">
                  <button
                    @click="showApplyModal = true"
                    class="btn-primary text-lg px-10 py-4 flex items-center gap-3 mx-auto"
                  >
                    <i class="ph-fill ph-paper-plane-right"></i>
                    Apply Now
                  </button>
                </div>
              </div>

              <div v-else class="bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-navy-700/80 rounded-3xl shadow-lg p-16 text-center transition-colors duration-500">
                <i class="ph-fill ph-cursor-click text-5xl text-gray-300 dark:text-navy-700 mb-6"></i>
                <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400">Select a job to view details</h3>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Apply Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showApplyModal" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showApplyModal = false"></div>

          <div class="flex min-h-screen items-center justify-center p-4">
            <div class="relative bg-white dark:bg-navy-900 rounded-3xl shadow-2xl dark:shadow-gold-500/10 border border-transparent dark:border-navy-700/80 w-full max-w-lg p-8 animate-scale-up z-10 my-8">
              <button @click="showApplyModal = false"
                      class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-navy-800
                             hover:bg-red-100 dark:hover:bg-red-500/20 flex items-center justify-center transition-colors border border-transparent dark:border-navy-700">
                <i class="ph-fill ph-x text-gray-500 dark:text-gray-400"></i>
              </button>

              <div class="text-center mb-8 mt-2">
                <div class="w-16 h-16 bg-indigo-50 dark:bg-navy-800 border border-indigo-100 dark:border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i class="ph-fill ph-file-text text-indigo-600 dark:text-gold-500 text-2xl"></i>
                </div>
                <h2 class="font-display text-3xl font-bold text-navy-900 dark:text-white">Apply for Position</h2>
                <p class="text-gray-500 dark:text-gray-400 mt-2">{{ t(selectedJob?.title) }}</p>
              </div>

              <form @submit.prevent="submitApplication" class="space-y-5">
                <!-- First & Last Name -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">First Name *</label>
                    <input v-model="applyForm.first_name" type="text" required
                           class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                  focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                                  transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">Last Name *</label>
                    <input v-model="applyForm.last_name" type="text" required
                           class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                  focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                                  transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                  </div>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
                    <i class="ph-fill ph-phone mr-2 text-indigo-500 dark:text-gold-500"></i>Phone *
                  </label>
                  <input v-model="applyForm.phone" type="tel" required
                         class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                                transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
                    <i class="ph-fill ph-envelope mr-2 text-indigo-500 dark:text-gold-500"></i>Email *
                  </label>
                  <input v-model="applyForm.email" type="email" required
                         class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                                transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                </div>

                <!-- CV Upload -->
                <div>
                  <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
                    <i class="ph-fill ph-file-pdf mr-2 text-indigo-500 dark:text-gold-500"></i>Upload CV *
                  </label>
                  <div class="border-2 border-dashed border-gray-300 dark:border-navy-700 rounded-xl p-6 text-center
                              hover:border-gold-400 dark:hover:border-gold-500 transition-colors cursor-pointer bg-gray-50 dark:bg-navy-950/30"
                       @click="cvInput?.click()">
                    <input ref="cvInput" type="file" accept=".pdf,.doc,.docx"
                           @change="handleCvUpload" class="hidden" />
                    <i class="ph-fill ph-cloud-arrow-up text-3xl text-gray-400 dark:text-navy-600 mb-2"></i>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ applyCv ? applyCv.name : 'Click to upload your CV (PDF, DOC)' }}
                    </p>
                  </div>
                </div>

                <!-- Notes -->
                <div>
                  <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
                    <i class="ph-fill ph-chat-circle mr-2 text-indigo-500 dark:text-gold-500"></i>Additional Notes
                  </label>
                  <textarea v-model="applyForm.notes" rows="3"
                            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                                   focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                                   transition-all outline-none resize-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"></textarea>
                </div>

                <!-- Submit -->
                <button type="submit" :disabled="isSubmitting"
                        class="w-full bg-gradient-to-r from-navy-800 to-navy-900 dark:from-gold-500 dark:to-gold-600 hover:from-navy-900 hover:to-black dark:hover:from-gold-400 dark:hover:to-gold-500 text-white dark:text-navy-950 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                  <i v-if="isSubmitting" class="ph-fill ph-spinner fa-spin"></i>
                  <i v-else class="ph-fill ph-paper-plane-right"></i>
                  {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
                </button>
              </form>

              <!-- Success -->
              <Transition name="fade">
                <div v-if="showApplySuccess"
                     class="absolute inset-0 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md rounded-3xl flex items-center justify-center z-10 border border-transparent dark:border-navy-700">
                  <div class="text-center p-8">
                    <div class="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200 dark:border-green-500/30">
                      <i class="ph-fill ph-check text-green-500 text-4xl"></i>
                    </div>
                    <h3 class="font-display text-3xl font-bold text-navy-900 dark:text-white mb-3">Application Submitted!</h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-8">We will review your application and get back to you.</p>
                    <button @click="showApplyModal = false; showApplySuccess = false"
                            class="bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-950 px-8 py-3 rounded-full font-bold hover:bg-black dark:hover:bg-gold-400 transition-colors shadow-md">Close</button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { jobs, selectedJob, selectJob, applyForJob } = useJobs()
const { t } = useLocale()

const showApplyModal = ref(false)
const showApplySuccess = ref(false)
const isSubmitting = ref(false)

const applyForm = reactive({
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  notes: '',
})

const applyCv = shallowRef<File | null>(null)

// Auto-select first job
onMounted(() => {
  const firstJob = jobs.value[0]
  if (firstJob && !selectedJob.value) {
    selectJob(firstJob)
  }
})

const cvInput = ref<HTMLInputElement | null>(null)

const handleCvUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    applyCv.value = target.files.item(0)
  }
}

const submitApplication = async () => {
  if (!selectedJob.value) return

  isSubmitting.value = true
  try {
    await applyForJob({
      first_name: applyForm.first_name,
      last_name: applyForm.last_name,
      phone: applyForm.phone,
      email: applyForm.email,
      cv: applyCv.value || null,
      notes: applyForm.notes,
      job_id: selectedJob.value.id,
    })
    showApplySuccess.value = true
  } catch (error) {
    alert('Application failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDescription = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>')
}

useHead({
  title: 'Jobs - Oxford School Group'
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
