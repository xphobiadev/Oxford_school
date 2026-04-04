<template>
  <div class="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-navy-900 transition-colors duration-300">
    <!-- Header Section -->
    <div class="container mx-auto px-4 mt-8 mb-12 relative z-10 text-center">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium text-sm mb-6 border border-gold-500/20"
        data-aos="fade-down"
      >
        <i class="ph-fill ph-certificate text-lg"></i>
        <span>Certificate Verification</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-6" data-aos="fade-up">
        Verify Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">Certificate</span>
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        Enter your certificate code below to verify its authenticity and view the details of your achievement.
      </p>
    </div>

    <div class="container mx-auto px-4 max-w-3xl relative z-10" data-aos="fade-up" data-aos-delay="200">
      <!-- Search Form -->
      <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-xl border border-gray-100 dark:border-navy-700 p-6 md:p-8 mb-8 backdrop-blur-sm">
        <form @submit.prevent="verifyCertificate" class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="ph ph-hash text-gray-400 dark:text-gray-500 text-xl"></i>
            </div>
            <input
              v-model="searchCode"
              type="text"
              placeholder="Enter Certificate Code (e.g. OXF-2024-001)"
              class="w-full bg-gray-50 dark:bg-navy-900/50 border border-gray-200 dark:border-navy-600 text-navy-900 dark:text-white rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all font-medium"
              required
            />
          </div>
          <button
            type="submit"
            class="btn-gold py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shrink-0"
            :disabled="isSearching"
          >
            <i class="ph-bold ph-magnifying-glass" v-if="!isSearching"></i>
            <i class="ph-bold ph-spinner animate-spin" v-else></i>
            {{ isSearching ? 'Verifying...' : 'Verify Certificate' }}
          </button>
        </form>

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <!-- Error State -->
          <div v-if="errorMsg" class="mt-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-3">
            <i class="ph-fill ph-warning-circle text-red-500 text-xl mt-0.5"></i>
            <div>
              <h4 class="text-sm font-semibold text-red-800 dark:text-red-400">Verification Failed</h4>
              <p class="text-sm text-red-600 dark:text-red-300/80 mt-1">{{ errorMsg }}</p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Result Card -->
      <Transition
        enter-active-class="transition duration-500 ease-out delay-100"
        enter-from-class="transform translate-y-8 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-8 opacity-0"
      >
        <div v-if="certificateData" class="bg-white dark:bg-navy-800 rounded-2xl shadow-xl border border-gold-500/20 overflow-hidden relative group">
          <!-- Decorative Background Elements -->
          <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors duration-500"></div>
          
          <div class="p-8 md:p-10 relative z-10">
            <div class="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 dark:border-navy-700 pb-6 mb-6 gap-4">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <i class="ph-fill ph-seal-check text-3xl text-gold-500"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-2xl text-navy-900 dark:text-white">Verified Certificate</h3>
                  <p class="text-gold-600 dark:text-gold-400 text-sm font-medium tracking-wide">ID: {{ certificateData.code }}</p>
                </div>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold border border-green-200 dark:border-green-500/20">
                <i class="ph-bold ph-check-circle"></i>
                Authentic
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <!-- Full Name -->
              <div class="space-y-1">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Full Name</p>
                <p class="text-lg font-semibold text-navy-900 dark:text-white">{{ certificateData.holder_label }}</p>
              </div>

              <!-- Certificate Language / Title -->
              <div class="space-y-1">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Course / Title</p>
                <p class="text-lg font-semibold text-navy-900 dark:text-white">{{ t(certificateData.description) }}</p>
              </div>

              <!-- Language and Level -->
              <div class="space-y-1">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Language & Level</p>
                <p class="text-lg font-semibold text-navy-900 dark:text-white flex items-center gap-2">
                  <span>{{ t(certificateData.language_name) }}</span>
                  <span class="px-2 py-0.5 rounded-md bg-gold-500/10 text-gold-600 dark:text-gold-400 text-sm border border-gold-500/20">{{ certificateData.level }}</span>
                </p>
              </div>

              <!-- Issued At -->
              <div class="space-y-1">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Date of Issue</p>
                <p class="text-lg font-semibold text-navy-900 dark:text-white flex items-center gap-2">
                  <i class="ph ph-calendar-blank text-gray-400 dark:text-gray-500"></i>
                  {{ certificateData.issued_at }}
                </p>
              </div>

               <!-- Duration -->
               <div class="space-y-1">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Duration</p>
                <p class="text-lg font-semibold text-navy-900 dark:text-white flex items-center gap-2">
                  <i class="ph ph-clock text-gray-400 dark:text-gray-500"></i>
                  {{ certificateData.duration }}
                </p>
              </div>
            </div>
            
            <div class="mt-8 pt-8 border-t border-gray-100 dark:border-navy-700 flex justify-center">
              <button class="text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 font-semibold text-sm flex items-center gap-2 transition-colors">
                <i class="ph-bold ph-download-simple"></i>
                Download Certificate Summary
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Certificate } from '~/types'

const searchCode = ref('')
const isSearching = ref(false)
const errorMsg = ref('')

const { t } = useLocale()
const l = (en: string, fr?: string, ar?: string) => ({ en, fr: fr || null, ar: ar || null })

// Extending Certificate for page display needs (Language is not officially in Certificate DTO but assumed joined)
interface DisplayCertificate extends Certificate {
  language_name: ReturnType<typeof l>;
  code: string;
  duration: string;
}

const certificateData = ref<DisplayCertificate | null>(null)

const mockCertificates: Record<string, DisplayCertificate> = {
  'OXF-2024-001': {
    id: 1,
    ref_no: 'OXF-2024-001',
    code: 'OXF-2024-001',
    holder_label: 'Ahmed Mohammed',
    description: l('General English Proficiency', 'Compétence générale en anglais', 'كفاءة في اللغة الإنجليزية'),
    language_name: l('English', 'Anglais', 'الإنجليزية'),
    level: 'B1',
    issued_at: 'March 15, 2024',
    duration: '3 Months'
  } as any,
  'OXF-2024-002': {
    id: 2,
    ref_no: 'OXF-2024-002',
    code: 'OXF-2024-002',
    holder_label: 'Sarah Johnson',
    description: l('French Language Foundation', 'Fondation de la langue française', 'أساسيات اللغة الفرنسية'),
    language_name: l('French', 'Français', 'الفرنسية'),
    level: 'A2',
    issued_at: 'January 20, 2024',
    duration: '6 Months'
  } as any
}

const verifyCertificate = () => {
  if (!searchCode.value.trim()) return

  isSearching.value = true
  errorMsg.value = ''
  certificateData.value = null

  // Simulate API Call
  setTimeout(() => {
    isSearching.value = false
    const code = searchCode.value.trim().toUpperCase()
    
    if (mockCertificates[code]) {
      certificateData.value = mockCertificates[code]
    } else {
      errorMsg.value = `No certificate found with the code "${searchCode.value}". Please check and try again, or contact administration.`
    }
  }, 1000)
}
</script>
