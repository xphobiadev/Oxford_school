<template>
  <div class="mb-12">
    <h2 class="font-display text-4xl font-bold bg-gradient-to-r from-navy-800 via-gold-600 to-navy-800 dark:from-gold-300 dark:via-gold-500 dark:to-gold-300 bg-clip-text text-transparent mb-8 flex items-center justify-center">
      <i class="fas fa-images text-gold-500/80 mr-4"></i>
      Activities
    </h2>

    <!-- Tabs -->
    <div class="flex justify-center gap-4 mb-10">
      <button
        @click="activeTab = 'videos'"
        class="px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm border"
        :class="activeTab === 'videos'
          ? 'bg-navy-900 text-white border-transparent dark:bg-gold-500 dark:text-navy-950 shadow-lg dark:shadow-gold-500/20'
          : 'bg-white dark:bg-navy-900/40 text-navy-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 border-gray-200 dark:border-navy-700'"
      >
        <i class="fas fa-video mr-2"></i>Videos
      </button>
      <button
        @click="activeTab = 'photos'"
        class="px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm border"
        :class="activeTab === 'photos'
          ? 'bg-navy-900 text-white border-transparent dark:bg-gold-500 dark:text-navy-950 shadow-lg dark:shadow-gold-500/20'
          : 'bg-white dark:bg-navy-900/40 text-navy-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 border-gray-200 dark:border-navy-700'"
      >
        <i class="fas fa-camera mr-2"></i>Photos
      </button>
    </div>

    <!-- Videos Tab -->
    <Transition name="fade" mode="out-in">
      <div v-if="activeTab === 'videos'" key="videos">
        <div v-if="teacher.videos.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="video in teacher.videos"
            :key="video.id"
            @click="openVideoModal(video)"
            class="group relative rounded-3xl bg-white dark:bg-navy-900/40 border border-gray-200 dark:border-navy-700/80 backdrop-blur-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-md dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(212,168,38,0.2)]"
          >
            <div class="relative h-48 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-navy-800 dark:to-navy-900">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-16 h-16 bg-white/90 dark:bg-gold-500/90 rounded-full flex items-center justify-center shadow-xl">
                  <i class="fas fa-play text-indigo-600 dark:text-navy-950 text-2xl ml-1"></i>
                </div>
              </div>
              <div class="w-full h-full flex items-center justify-center">
                <i class="fas fa-video text-5xl text-indigo-200 dark:text-gold-500/20 group-hover:scale-110 transition-transform duration-500"></i>
              </div>
            </div>
            <div class="p-5 bg-white dark:bg-transparent">
              <h4 class="font-display font-semibold text-lg text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-gold-400 transition-colors">{{ video.title }}</h4>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-16 text-gray-400 dark:text-gray-500">
          <i class="fas fa-video-slash text-5xl mb-4 text-gray-300 dark:text-navy-700"></i>
          <p>No videos available yet</p>
        </div>
      </div>
    </Transition>

    <!-- Photos Tab -->
    <Transition name="fade" mode="out-in">
      <div v-if="activeTab === 'photos'" key="photos">
        <div v-if="teacher.albums.length">
          <!-- Albums Grid -->
          <div v-if="!selectedAlbum" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="album in teacher.albums"
              :key="album.id"
              @click="selectedAlbum = album"
              class="group relative rounded-3xl bg-white dark:bg-navy-900/40 border border-gray-200 dark:border-navy-700/80 backdrop-blur-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-md dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(212,168,38,0.2)]"
            >
              <div class="h-48 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-navy-800 dark:to-navy-900
                          flex items-center justify-center">
                <i class="fas fa-images text-5xl text-indigo-200 dark:text-gold-500/20 group-hover:scale-110 transition-transform duration-500"></i>
              </div>
              <div class="p-5 bg-white dark:bg-transparent">
                <h4 class="font-display font-semibold text-lg text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-gold-400 transition-colors">{{ album.title }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-medium">{{ album.photos.length }} photos • {{ album.year }}</p>
              </div>
            </div>
          </div>

          <!-- Album Photos -->
          <div v-else class="animate-fade-up">
            <button @click="selectedAlbum = null"
                    class="mb-6 text-indigo-600 dark:text-gold-500 hover:text-navy-900 dark:hover:text-gold-400 font-medium
                           flex items-center gap-2 bg-white dark:bg-navy-900/50 px-5 py-2.5 rounded-full border border-gray-200 dark:border-navy-700 shadow-sm w-fit transition-all hover:-translate-x-1">
              <i class="fas fa-arrow-left"></i>
              Back to Albums
            </button>
            <h3 class="font-display text-3xl font-bold text-navy-900 dark:text-white mb-8">{{ selectedAlbum.title }}</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="(photo, index) in selectedAlbum.photos"
                :key="photo.id"
                @click="openLightbox(index)"
                class="aspect-square bg-gray-100 dark:bg-navy-900 rounded-2xl overflow-hidden cursor-pointer
                       hover:opacity-80 transition-opacity border border-gray-200 dark:border-navy-700/50 shadow-sm"
              >
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br
                            from-indigo-50 to-indigo-100 dark:from-navy-800 dark:to-navy-900">
                  <i class="fas fa-image text-4xl text-indigo-200 dark:text-gold-500/20"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-16 text-gray-400 dark:text-gray-500">
          <i class="fas fa-image text-5xl mb-4 text-gray-300 dark:text-navy-700"></i>
          <p>No photo albums available yet</p>
        </div>
      </div>
    </Transition>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showVideoModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/80" @click="showVideoModal = false"></div>
          <div class="relative w-full max-w-4xl animate-scale-up">
            <button @click="showVideoModal = false"
                    class="absolute -top-12 right-0 text-white text-2xl hover:text-accent-500">
              <i class="fas fa-times"></i>
            </button>
            <div class="aspect-video bg-black rounded-2xl overflow-hidden">
              <iframe
                v-if="currentVideo"
                :src="currentVideo.url"
                class="w-full h-full"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLightbox" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/90" @click="showLightbox = false"></div>
          <div class="relative w-full max-w-5xl">
            <button @click="showLightbox = false"
                    class="absolute -top-12 right-0 text-white text-2xl hover:text-accent-500 z-10">
              <i class="fas fa-times"></i>
            </button>

            <!-- Navigation -->
            <button @click="prevPhoto"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20
                           rounded-full flex items-center justify-center text-white
                           hover:bg-white/40 transition-colors z-10">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button @click="nextPhoto"
                    class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20
                           rounded-full flex items-center justify-center text-white
                           hover:bg-white/40 transition-colors z-10">
              <i class="fas fa-chevron-right"></i>
            </button>

            <!-- Photo -->
            <div class="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center">
              <div class="text-center text-white">
                <i class="fas fa-image text-6xl text-gray-600 mb-4"></i>
                <p class="text-gray-400">
                  {{ selectedAlbum?.photos[lightboxIndex]?.caption || 'Photo' }}
                </p>
                <p class="text-gray-600 text-sm mt-2">
                  {{ lightboxIndex + 1 }} / {{ selectedAlbum?.photos.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Teacher, Video, Album } from '~/types'

const props = defineProps<{
  teacher: Teacher
}>()

const activeTab = ref<'videos' | 'photos'>('videos')
const selectedAlbum = ref<Album | null>(null)

// Video Modal
const showVideoModal = ref(false)
const currentVideo = ref<Video | null>(null)

const openVideoModal = (video: Video) => {
  currentVideo.value = video
  showVideoModal.value = true
}

// Lightbox
const showLightbox = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  showLightbox.value = true
}

const nextPhoto = () => {
  if (selectedAlbum.value) {
    lightboxIndex.value = (lightboxIndex.value + 1) % selectedAlbum.value.photos.length
  }
}

const prevPhoto = () => {
  if (selectedAlbum.value) {
    lightboxIndex.value = lightboxIndex.value === 0
      ? selectedAlbum.value.photos.length - 1
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
