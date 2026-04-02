<template>
  <div>
    <AppHeader />

    <!-- Hero -->
    <section class="bg-primary-800 pt-28 pb-16">
      <div class="container mx-auto px-4 text-center text-white">
        <h1 class="font-serif text-4xl md:text-5xl font-bold mb-4">
          <i class="fas fa-briefcase text-accent-500 mr-3"></i>
          Career Opportunities
        </h1>
        <p class="text-xl text-gray-300">Join our team and shape the future of education</p>
      </div>
    </section>

    <!-- Jobs Layout (LinkedIn-style) -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

          <!-- Sidebar: Jobs List -->
          <div class="lg:w-[380px] flex-shrink-0">
            <div class="lg:sticky lg:top-24">
              <h2 class="font-semibold text-lg text-gray-700 mb-4">
                <i class="fas fa-list mr-2"></i>
                Available Positions ({{ jobs.length }})
              </h2>
              <div class="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                <button
                  v-for="job in jobs"
                  :key="job.id"
                  @click="selectJob(job)"
                  class="w-full text-left p-5 rounded-xl border-2 transition-all duration-300"
                  :class="selectedJob?.id === job.id
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'"
                >
                  <h3 class="font-semibold text-gray-800 mb-2">{{ job.title }}</h3>
                  <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span v-if="job.location">
                      <i class="fas fa-map-marker-alt mr-1 text-primary-400"></i>
                      {{ job.location }}
                    </span>
                    <span v-if="job.type">
                      <i class="fas fa-clock mr-1 text-primary-400"></i>
                      {{ job.type }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-400 mt-2">
                    <i class="fas fa-calendar mr-1"></i>
                    Posted: {{ formatDate(job.created_at) }}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <!-- Main: Job Details -->
          <div class="flex-1">
            <Transition name="fade" mode="out-in">
              <div v-if="selectedJob" :key="selectedJob.id" class="card p-8 md:p-10">
                <!-- Job Header -->
                <div class="mb-8">
                  <h2 class="font-serif text-3xl font-bold text-primary-800 mb-3">
                    {{ selectedJob.title }}
                  </h2>
                  <div class="flex flex-wrap items-center gap-4 text-gray-500">
                    <span v-if="selectedJob.location" class="flex items-center gap-2">
                      <i class="fas fa-map-marker-alt text-primary-400"></i>
                      {{ selectedJob.location }}
                    </span>
                    <span v-if="selectedJob.type" class="flex items-center gap-2">
                      <i class="fas fa-clock text-primary-400"></i>
                      {{ selectedJob.type }}
                    </span>
                    <span class="flex items-center gap-2">
                      <i class="fas fa-calendar text-primary-400"></i>
                      {{ formatDate(selectedJob.created_at) }}
                    </span>
                  </div>
                </div>

                <!-- Job Description -->
                <div class="prose prose-lg max-w-none mb-10 text-gray-700 leading-relaxed"
                     v-html="formatDescription(selectedJob.description)">
                </div>

                <!-- Apply Button -->
                <div class="border-t pt-8">
                  <button
                    @click="showApplyModal = true"
                    class="btn-primary text-lg px-10 py-4 flex items-center gap-3 mx-auto"
                  >
                    <i class="fas fa-paper-plane"></i>
                    Apply Now
                  </button>
                </div>
              </div>

              <div v-else class="card p-16 text-center">
                <i class="fas fa-hand-pointer text-5xl text-gray-300 mb-6"></i>
                <h3 class="text-xl font-semibold text-gray-500">Select a job to view details</h3>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Apply Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showApplyModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showApplyModal = false"></div>

          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-scale-up
                      max-h-[90vh] overflow-y-auto">
            <button @click="showApplyModal = false"
                    class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100
                           hover:bg-red-100 flex items-center justify-center">
              <i class="fas fa-times text-gray-500"></i>
            </button>

            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-file-alt text-primary-600 text-2xl"></i>
              </div>
              <h2 class="font-serif text-2xl font-bold text-primary-800">Apply for Position</h2>
              <p class="text-gray-500 mt-2">{{ selectedJob?.title }}</p>
            </div>

            <form @submit.prevent="submitApplication" class="space-y-5">
              <!-- First & Last Name -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input v-model="applyForm.first_name" type="text" required
                         class="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                                focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                                transition-all outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input v-model="applyForm.last_name" type="text" required
                         class="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                                focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                                transition-all outline-none" />
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-phone mr-2 text-primary-500"></i>Phone *
                </label>
                <input v-model="applyForm.phone" type="tel" required
                       class="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                              focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                              transition-all outline-none" />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-envelope mr-2 text-primary-500"></i>Email *
                </label>
                <input v-model="applyForm.email" type="email" required
                       class="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                              focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                              transition-all outline-none" />
              </div>

              <!-- CV Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-file-pdf mr-2 text-primary-500"></i>Upload CV *
                </label>
                <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center
                            hover:border-primary-400 transition-colors cursor-pointer"
                     @click="cvInput?.click()">
                  <input ref="cvInput" type="file" accept=".pdf,.doc,.docx"
                         @change="handleCvUpload" class="hidden" />
                  <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                  <p class="text-sm text-gray-500">
                    {{ applyCv ? applyCv.name : 'Click to upload your CV (PDF, DOC)' }}
                  </p>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-comment mr-2 text-primary-500"></i>Additional Notes
                </label>
                <textarea v-model="applyForm.notes" rows="3"
                          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200
                                 focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                                 transition-all outline-none resize-none"></textarea>
              </div>

              <!-- Submit -->
              <button type="submit" :disabled="isSubmitting"
                      class="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3">
                <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-paper-plane"></i>
                {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
              </button>
            </form>

            <!-- Success -->
            <Transition name="fade">
              <div v-if="showApplySuccess"
                   class="absolute inset-0 bg-white rounded-3xl flex items-center justify-center">
                <div class="text-center p-8">
                  <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-green-500 text-3xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                  <p class="text-gray-500 mb-6">We will review your application and get back to you.</p>
                  <button @click="showApplyModal = false; showApplySuccess = false"
                          class="btn-primary">Close</button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { jobs, selectedJob, selectJob, applyForJob } = useJobs()

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
