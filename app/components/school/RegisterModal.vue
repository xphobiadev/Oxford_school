<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 overflow-y-auto w-full">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Scrollable Container -->
      <div class="flex min-h-screen items-center justify-center p-4 text-left">
        <!-- Modal -->
        <div class="relative bg-white dark:bg-navy-900 rounded-3xl shadow-2xl dark:shadow-gold-500/10 border border-transparent dark:border-navy-700/80 w-full max-w-lg p-8 animate-scale-up z-10 my-8">
        <!-- Close Button -->
        <button @click="$emit('close')"
                class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-navy-800
                       hover:bg-red-100 dark:hover:bg-red-500/20 flex items-center justify-center transition-colors border border-transparent dark:border-navy-700">
          <i class="ph-fill ph-x text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"></i>
        </button>

        <!-- Header -->
        <div class="text-center mb-8 mt-2">
          <div class="w-16 h-16 bg-indigo-50 dark:bg-navy-800 border border-indigo-100 dark:border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i class="ph-fill ph-user-plus text-indigo-600 dark:text-gold-500 text-2xl"></i>
          </div>
          <h2 class="font-display text-3xl font-bold text-navy-900 dark:text-white">Register Now</h2>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Fill in your details to get started</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitRegistration" class="space-y-5">
          <!-- First Name & Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
                <i class="ph-fill ph-user mr-2 text-indigo-500 dark:text-gold-500"></i>First Name *
              </label>
              <input
                v-model="form.first_name"
                type="text"
                required
                placeholder="First name"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                       focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                       transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
                <i class="ph-fill ph-user mr-2 text-indigo-500 dark:text-gold-500"></i>Last Name *
              </label>
              <input
                v-model="form.last_name"
                type="text"
                required
                placeholder="Last name"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                       focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                       transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
              <i class="ph-fill ph-envelope mr-2 text-indigo-500 dark:text-gold-500"></i>Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="your@email.com"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                     focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                     transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
              <i class="ph-fill ph-phone mr-2 text-indigo-500 dark:text-gold-500"></i>Phone Number *
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              placeholder="+212 6XX-XXXXXX"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                     focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                     transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>

          <!-- Birthday -->
          <div>
            <label class="block text-sm font-medium text-navy-800 dark:text-gray-300 mb-2">
              <i class="ph-fill ph-calendar mr-2 text-indigo-500 dark:text-gold-500"></i>Birthday *
            </label>
            <input
              v-model="form.birthday"
              type="date"
              required
              class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-navy-950/50 border border-gray-200 dark:border-navy-700
                     focus:border-indigo-500 dark:focus:border-gold-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-gold-500/10
                     transition-all outline-none text-navy-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-navy-800 to-navy-900 dark:from-gold-500 dark:to-gold-600 hover:from-navy-900 hover:to-black dark:hover:from-gold-400 dark:hover:to-gold-500 text-white dark:text-navy-950 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            <i v-if="isSubmitting" class="ph-fill ph-spinner fa-spin"></i>
            <i v-else class="ph-fill ph-paper-plane-right"></i>
            {{ isSubmitting ? 'Submitting...' : 'Submit Registration' }}
          </button>
        </form>

        <!-- Success Message -->
        <Transition name="fade">
          <div v-if="showSuccess"
               class="absolute inset-0 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md rounded-3xl flex items-center justify-center z-10 border border-transparent dark:border-navy-700">
            <div class="text-center p-8">
              <div class="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200 dark:border-green-500/30">
                <i class="ph-fill ph-check text-green-500 text-4xl"></i>
              </div>
              <h3 class="font-display text-3xl font-bold text-navy-900 dark:text-white mb-3">Registration Successful!</h3>
              <p class="text-gray-500 dark:text-gray-400 mb-8">We will contact you shortly.</p>
              <button @click="$emit('close')" class="bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-950 px-8 py-3 rounded-full font-bold hover:bg-black dark:hover:bg-gold-400 transition-colors shadow-md">Close</button>
            </div>
          </div>
        </Transition>
      </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { RegistrationData } from '~/types'

const props = defineProps<{
  schoolId: number
  languageId: number
  teacherId: number
}>()

const emit = defineEmits(['close'])

const isSubmitting = ref(false)
const showSuccess = ref(false)

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  birthday: '',
})

const submitRegistration = async () => {
  isSubmitting.value = true

  const registrationData: RegistrationData = {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    birthday: form.birthday,
    school_id: props.schoolId,
    language_id: props.languageId,
    teacher_id: props.teacherId,
  }

  try {
    console.log('Registration data:', registrationData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    showSuccess.value = true
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
