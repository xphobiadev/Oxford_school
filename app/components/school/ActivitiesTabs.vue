<template>
  <div class="mb-12">
    <h2 class="font-display text-4xl font-bold bg-gradient-to-r from-navy-800 via-gold-600 to-navy-800 dark:from-gold-300 dark:via-gold-500 dark:to-gold-300 bg-clip-text text-transparent mb-8 flex items-center justify-center">
      <i class="ph-fill ph-images text-gold-500/80 mr-4"></i>
      Activities
    </h2>

    <!-- Galleries Grid (sorted by activity_date desc) -->
    <div v-if="sortedGalleries.length">
      <!-- Gallery List -->
      <div v-if="!selectedGallery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="gallery in sortedGalleries"
          :key="gallery.id"
          @click="selectedGallery = gallery"
          class="group relative rounded-3xl bg-white dark:bg-navy-900/40 border border-gray-200 dark:border-navy-700/80 backdrop-blur-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-md dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(212,168,38,0.2)]"
        >
          <div class="h-48 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-navy-800 dark:to-navy-900
                      flex items-center justify-center relative overflow-hidden">
            <!-- Show first media thumbnail if available -->
            <img
              v-if="getFirstImage(gallery)"
              :src="getFirstImage(gallery)"
              :alt="t(gallery.title) || ''"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <i v-else class="ph-fill ph-images text-5xl text-indigo-200 dark:text-gold-500/20 group-hover:scale-110 transition-transform duration-500"></i>

            <!-- Media count badge -->
            <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <i class="ph-fill ph-image"></i>
              {{ gallery.media.length }}
            </div>

            <!-- Video indicator -->
            <div v-if="hasVideos(gallery)" class="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <i class="ph-fill ph-video"></i>
            </div>
          </div>
          <div class="p-5 bg-white dark:bg-transparent">
            <h4 class="font-display font-semibold text-lg text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-gold-400 transition-colors">{{ t(gallery.title) }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <i class="ph-fill ph-calendar text-gold-500"></i>
              {{ formatDate(gallery.activity_date) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Selected Gallery Detail -->
      <div v-else class="animate-fade-up">
        <button @click="selectedGallery = null"
                class="mb-6 text-indigo-600 dark:text-gold-500 hover:text-navy-900 dark:hover:text-gold-400 font-medium
                       flex items-center gap-2 bg-white dark:bg-navy-900/50 px-5 py-2.5 rounded-full border border-gray-200 dark:border-navy-700 shadow-sm w-fit transition-all hover:-translate-x-1">
          <i class="ph-fill ph-arrow-left"></i>
          Back to Activities
        </button>

        <div class="mb-8">
          <h3 class="font-display text-3xl font-bold text-navy-900 dark:text-white">{{ t(selectedGallery.title) }}</h3>
          <p class="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <i class="ph-fill ph-calendar text-gold-500"></i>
            {{ formatDate(selectedGallery.activity_date) }}
          </p>
        </div>

        <!-- Media Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="(media, index) in selectedGallery.media"
            :key="media.id"
            @click="openLightbox(index)"
            class="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-navy-700/50 shadow-sm relative group/media"
          >
            <!-- Image -->
            <template v-if="isImage(media)">
              <img
                :src="media.url"
                :alt="'Media ' + media.id"
                class="w-full h-full object-cover group-hover/media:scale-110 transition-transform duration-500"
              />
            </template>

            <!-- Video -->
            <template v-else>
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i class="ph-fill ph-play text-white text-2xl ml-1"></i>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 text-gray-400 dark:text-gray-500">
      <i class="ph-fill ph-image text-5xl mb-4 text-gray-300 dark:text-navy-700"></i>
      <p>No activities available yet</p>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLightbox && selectedGallery" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/90" @click="showLightbox = false"></div>
          <div class="relative w-full max-w-5xl">
            <button @click="showLightbox = false"
                    class="absolute -top-12 right-0 text-white text-2xl hover:text-gold-500 z-10">
              <i class="ph-fill ph-x"></i>
            </button>

            <!-- Navigation -->
            <button @click="prevMedia"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20
                           rounded-full flex items-center justify-center text-white
                           hover:bg-white/40 transition-colors z-10">
              <i class="ph-fill ph-caret-left"></i>
            </button>
            <button @click="nextMedia"
                    class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20
                           rounded-full flex items-center justify-center text-white
                           hover:bg-white/40 transition-colors z-10">
              <i class="ph-fill ph-caret-right"></i>
            </button>

            <!-- Media Display -->
            <div class="aspect-video bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
              <template v-if="currentMedia && isImage(currentMedia)">
                <img
                  :src="currentMedia.url"
                  class="max-w-full max-h-full object-contain"
                  :alt="'Photo ' + (lightboxIndex + 1)"
                />
              </template>
              <template v-else-if="currentMedia">
                <video
                  :src="currentMedia.url"
                  controls
                  class="max-w-full max-h-full"
                ></video>
              </template>
            </div>

            <p class="text-center text-gray-400 text-sm mt-4">
              {{ lightboxIndex + 1 }} / {{ selectedGallery.media.length }}
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Teacher, Gallery, Media } from '~/types'

const { t } = useLocale()

const props = defineProps<{
  teacher: Teacher
}>()

const selectedGallery = ref<Gallery | null>(null)

// Sort galleries by activity_date descending (newest first)
const sortedGalleries = computed(() => {
  return [...(props.teacher.galleries || [])].sort((a, b) => {
    return new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()
  })
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const isImage = (media: Media) => {
  return media.mime_type.startsWith('image/')
}

const hasVideos = (gallery: Gallery) => {
  return gallery.media.some(m => m.mime_type.startsWith('video/'))
}

const getFirstImage = (gallery: Gallery): string | null => {
  const img = gallery.media.find(m => m.mime_type.startsWith('image/'))
  return img ? img.url : null
}

// Lightbox
const showLightbox = ref(false)
const lightboxIndex = ref(0)

const currentMedia = computed(() => {
  if (!selectedGallery.value) return null
  return selectedGallery.value.media[lightboxIndex.value] || null
})

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  showLightbox.value = true
}

const nextMedia = () => {
  if (selectedGallery.value) {
    lightboxIndex.value = (lightboxIndex.value + 1) % selectedGallery.value.media.length
  }
}

const prevMedia = () => {
  if (selectedGallery.value) {
    lightboxIndex.value = lightboxIndex.value === 0
      ? selectedGallery.value.media.length - 1
      : lightboxIndex.value - 1
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
