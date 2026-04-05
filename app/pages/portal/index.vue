<template>
  <div class="bg-white dark:bg-navy-950 min-h-screen transition-colors duration-500 flex flex-col">
    <AppHeader />
    <div class="pt-24 pb-16 bg-gray-50 dark:bg-navy-950 transition-colors duration-300 flex-grow">
    <!-- Header Section -->
    <div class="container mx-auto px-4 mt-8 mb-12 relative z-10 text-center">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium text-sm mb-6 border border-gold-500/20"
      >
        <i class="ph-fill ph-student text-lg"></i>
        <span>Student Area</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white mb-6">
        Student <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">Portal</span>
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Enter your Student ID to access your profile, timetable, and exam results.
      </p>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      <!-- Search Form -->
      <div class="bg-white dark:bg-navy-800 rounded-2xl shadow-xl border border-gray-100 dark:border-navy-700 p-6 md:p-8 mb-8 backdrop-blur-sm max-w-3xl mx-auto">
        <form @submit.prevent="fetchPortal" class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="ph ph-identification-card text-gray-400 dark:text-gray-500 text-xl"></i>
            </div>
            <input
              v-model="searchCode"
              type="text"
              placeholder="Enter Student ID (e.g. STU-101)"
              class="w-full bg-gray-50 dark:bg-navy-900/50 border border-gray-200 dark:border-navy-600 text-navy-900 dark:text-white rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all font-medium"
              required
            />
          </div>
          <button
            type="submit"
            class="btn-gold py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shrink-0"
            :disabled="isLoading"
          >
            <i class="ph-bold ph-sign-in" v-if="!isLoading"></i>
            <i class="ph-bold ph-spinner animate-spin" v-else></i>
            {{ isLoading ? 'Authenticating...' : 'Access Portal' }}
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
              <h4 class="text-sm font-semibold text-red-800 dark:text-red-400">Access Denied</h4>
              <p class="text-sm text-red-600 dark:text-red-300/80 mt-1">{{ errorMsg }}</p>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Portal Dashboard -->
      <Transition
        enter-active-class="transition duration-500 ease-out delay-100"
        enter-from-class="transform translate-y-8 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-8 opacity-0"
      >
        <div v-if="portalData" class="bg-white dark:bg-navy-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-navy-700 overflow-hidden relative">
          
          <!-- Portal Header -->
          <div class="px-8 py-6 border-b border-gray-200 dark:border-navy-700 bg-gradient-to-r from-gray-50 to-white dark:from-navy-900/80 dark:to-navy-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg border-2 border-white dark:border-navy-900 border-opacity-50">
                <span class="text-white text-3xl font-display font-black">{{ portalData.meta.firstName.charAt(0) }}</span>
              </div>
              <div>
                <h3 class="font-display font-bold text-2xl text-navy-900 dark:text-white">{{ portalData.meta.firstName }} {{ portalData.meta.lastName }}</h3>
                <p class="text-gold-600 dark:text-gold-400 text-sm font-bold tracking-wider uppercase mt-1">{{ portalData.meta.studentId }}</p>
              </div>
            </div>
            
            <!-- Actions & Tabs -->
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <NuxtLink to="/proficiency-test" class="btn-gold hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-shadow">
                <i class="ph-fill ph-translate"></i>
                Proficiency Test
              </NuxtLink>
              <div class="flex p-1 bg-gray-100 dark:bg-navy-950 rounded-xl space-x-1 w-full sm:w-auto">
                <button
                  v-for="tab in ['meta', 'schedules', 'exams']" :key="tab"
                  @click="activeTab = tab as any"
                  class="px-4 md:px-5 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-300 flex-1 sm:flex-none text-center"
                  :class="activeTab === tab ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white'"
                >
                  {{ tab }}
                </button>
              </div>
              <NuxtLink to="/proficiency-test" class="btn-gold md:hidden w-full flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md">
                <i class="ph-fill ph-translate"></i>
                Take Proficiency Test
              </NuxtLink>
            </div>
          </div>

          <div class="p-8">
            <!-- TAB: Meta -->
            <Transition name="fade" mode="out-in">
              <div v-if="activeTab === 'meta'" key="meta" class="space-y-8">
                <h4 class="text-xl font-bold font-display text-navy-900 dark:text-white mb-6 flex items-center gap-3">
                  <i class="ph-fill ph-user text-gold-500"></i> Personal Information
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="p-5 rounded-2xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-700/50">
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Email</p>
                    <p class="text-navy-900 dark:text-white font-medium">{{ portalData.meta.email }}</p>
                  </div>
                  <div class="p-5 rounded-2xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-700/50">
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Phone</p>
                    <p class="text-navy-900 dark:text-white font-medium">{{ portalData.meta.phone }}</p>
                  </div>
                  <div class="p-5 rounded-2xl bg-gray-50 dark:bg-navy-900/50 border border-gray-100 dark:border-navy-700/50">
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Join Date</p>
                    <p class="text-navy-900 dark:text-white font-medium">{{ portalData.meta.joinDate }}</p>
                  </div>
                </div>

                <div class="mt-8">
                  <h4 class="text-xl font-bold font-display text-navy-900 dark:text-white mb-6 flex items-center gap-3">
                    <i class="ph-fill ph-books text-gold-500"></i> Enrolled Courses
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="course in portalData.meta.courses" :key="course.id" class="flex items-center justify-between p-4 rounded-xl border border-gold-500/20 bg-gold-500/5">
                      <div>
                        <h5 class="font-bold text-navy-900 dark:text-white">{{ course.name }}</h5>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ course.level }}</p>
                      </div>
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase rounded-lg">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TAB: Schedules -->
              <div v-else-if="activeTab === 'schedules'" key="schedules">
                <div class="flex justify-between items-center mb-6">
                  <h4 class="text-xl font-bold font-display text-navy-900 dark:text-white flex items-center gap-3">
                    <i class="ph-fill ph-calendar text-gold-500"></i> Weekly Timetable
                  </h4>
                  <div class="hidden sm:flex gap-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-500/20">
                      <div class="w-2 h-2 rounded-full bg-blue-500"></div> Lecture
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-200 dark:border-green-500/20">
                      <div class="w-2 h-2 rounded-full bg-green-500"></div> Lab/Practice
                    </span>
                  </div>
                </div>

                <!-- Desktop Calendar Grid Container -->
                <div class="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-navy-700">
                  <div class="min-w-[1200px]">
                    <!-- Grid Header (Days) -->
                    <div class="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-900/50">
                      <div class="py-3 px-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200 dark:border-navy-700">Time</div>
                      <div v-for="(day, i) in days" :key="day" class="py-3 px-1 text-center text-xs font-bold text-navy-900 dark:text-gray-200 uppercase tracking-wide border-r border-gray-200 dark:border-navy-700 last:border-0">
                        {{ dayAbbrevs[i] }}
                      </div>
                    </div>

                    <!-- Grid Body -->
                    <div class="relative bg-white dark:bg-navy-800 w-full" :style="{ height: (timeSlots.length * 60) + 'px' }">
                      <!-- Background Grid Lines & Times -->
                      <div class="absolute inset-0 grid grid-cols-[80px_1fr] pointer-events-none">
                        <div class="border-r border-gray-200 dark:border-navy-700 bg-gray-50/50 dark:bg-navy-900/20 h-full">
                          <div v-for="time in timeSlots" :key="time" class="h-[60px] border-b border-gray-100 dark:border-navy-700/50 flex justify-center py-2">
                             <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400">{{ formatTime(time) }}</span>
                          </div>
                        </div>
                        <div class="grid grid-cols-7 h-full">
                          <div v-for="day in days" :key="'col-' + day" class="border-r border-gray-100 dark:border-navy-700/50 last:border-0 h-full relative">
                             <div v-for="time in timeSlots" :key="time + day" class="h-[60px] border-b border-gray-50 dark:border-navy-700/30"></div>
                          </div>
                        </div>
                      </div>

                      <!-- Events Layer -->
                      <div class="absolute inset-0 grid grid-cols-[80px_repeat(7,1fr)] pointer-events-none">
                        <div></div>
                        <div v-for="(day, dayIndex) in days" :key="'events-' + day" class="relative">
                          <template v-for="event in getEventsForDay(dayIndex)" :key="event.id">
                            <div 
                              class="absolute inset-x-0.5 rounded-md p-1.5 shadow-sm border pointer-events-auto cursor-pointer z-10 overflow-hidden"
                              :class="getEventColorClasses(event.type)"
                              :style="{ top: getEventTopLimit(event.startTime) + 'px', height: getEventHeight(event.startTime, event.endTime) + 'px' }"
                            >
                               <h4 class="font-bold text-[10px] leading-tight mb-0.5 text-slate-800 dark:text-white line-clamp-2">{{ event.title }}</h4>
                               <div class="flex items-center gap-1 text-[9px] opacity-80 mb-0.5 truncate">
                                 <i class="ph-fill ph-map-pin shrink-0"></i> <span class="truncate">{{ event.room }}</span>
                               </div>
                               <div class="flex items-center gap-1 text-[9px] opacity-80 truncate">
                                 <i class="ph-fill ph-clock shrink-0"></i> {{ formatTime(event.startTime) }}-{{ formatTime(event.endTime) }}
                               </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Mobile Agenda View (< md) -->
                <div class="md:hidden space-y-6">
                  <div v-for="(day, dayIndex) in days" :key="'mob-' + day">
                    <!-- Only show days that have events -->
                    <template v-if="getEventsForDay(dayIndex).length > 0">
                      <h5 class="font-bold text-navy-900 dark:text-white mb-3 flex items-center gap-2">
                        <div class="w-8 h-px bg-gold-500/50"></div>
                        {{ day }}
                        <div class="flex-1 h-px bg-gray-200 dark:bg-navy-700"></div>
                      </h5>
                      <div class="space-y-3 pl-2 border-l-2 border-gold-500/20">
                        <div 
                          v-for="event in getEventsForDay(dayIndex).sort((a,b) => a.startTime - b.startTime)" 
                          :key="'mob-ev-' + event.id"
                          class="p-4 rounded-xl border relative overflow-hidden"
                          :class="event.type === 'lecture' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800' : 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800'"
                        >
                          <!-- Color edge strip for type -->
                          <div class="absolute left-0 top-0 bottom-0 w-1" :class="event.type === 'lecture' ? 'bg-blue-500' : 'bg-green-500'"></div>
                          
                          <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-navy-900 dark:text-white pr-2 text-sm leading-snug">{{ event.title }}</h4>
                            <span class="text-xs font-bold px-2 py-1 rounded bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-600 shadow-sm shrink-0 whitespace-nowrap text-navy-900 dark:text-gray-300">
                              {{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}
                            </span>
                          </div>
                          
                          <div class="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span class="flex items-center gap-1.5"><i class="ph-fill ph-map-pin text-gold-500"></i> {{ event.room }}</span>
                            <span class="flex items-center gap-1.5"><i class="ph-fill ph-user text-gold-500"></i> {{ event.teacher }}</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <!-- TAB: Exams -->
              <div v-else-if="activeTab === 'exams'" key="exams">
                <h4 class="text-xl font-bold font-display text-navy-900 dark:text-white mb-6 flex items-center gap-3">
                  <i class="ph-fill ph-exam text-gold-500"></i> Examination Results
                </h4>
                
                <!-- Desktop Table View -->
                <div class="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-navy-700">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="bg-gray-50 dark:bg-navy-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold">
                        <th class="p-4 border-b border-gray-200 dark:border-navy-700">Subject</th>
                        <th class="p-4 border-b border-gray-200 dark:border-navy-700">Date</th>
                        <th class="p-4 border-b border-gray-200 dark:border-navy-700">Score</th>
                        <th class="p-4 border-b border-gray-200 dark:border-navy-700">Status</th>
                        <th class="p-4 border-b border-gray-200 dark:border-navy-700">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="exam in portalData.exams" :key="exam.id" class="border-b border-gray-100 dark:border-navy-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-navy-800/50 transition-colors">
                        <td class="p-4 font-semibold text-navy-900 dark:text-white">{{ exam.subject }}</td>
                        <td class="p-4 text-sm text-gray-500 dark:text-gray-400"><i class="ph ph-calendar text-gold-500 mr-2"></i>{{ exam.date }}</td>
                        <td class="p-4 font-bold font-display text-navy-900 dark:text-white">{{ exam.score }}/100</td>
                        <td class="p-4">
                          <span v-if="exam.score >= 50" class="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase rounded-lg">Passed</span>
                          <span v-else class="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-bold uppercase rounded-lg">Failed</span>
                        </td>
                        <td class="p-4 text-sm text-gray-500 dark:text-gray-400">{{ exam.feedback }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Mobile Card View (< md) -->
                <div class="md:hidden space-y-4">
                  <div v-for="exam in portalData.exams" :key="'mob-exam-' + exam.id" class="bg-gray-50 dark:bg-navy-900/50 rounded-2xl p-5 border border-gray-200 dark:border-navy-700 relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1" :class="exam.score >= 50 ? 'bg-green-500' : 'bg-red-500'"></div>
                    <div class="flex justify-between items-start mb-3">
                      <div class="pr-3">
                        <h4 class="font-bold text-navy-900 dark:text-white leading-tight">{{ exam.subject }}</h4>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 flex items-center gap-1.5 font-medium">
                          <i class="ph ph-calendar text-gold-500"></i> {{ exam.date }}
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="font-bold font-display text-xl text-navy-900 dark:text-white">{{ exam.score }}/100</div>
                        <span v-if="exam.score >= 50" class="inline-block mt-1 px-2.5 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded-md">Passed</span>
                        <span v-else class="inline-block mt-1 px-2.5 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase rounded-md">Failed</span>
                      </div>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-navy-700/50">
                      <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Feedback</div>
                      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ exam.feedback }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({ title: 'Student Portal - Universal Oxford Groupe' })

const route = useRoute()
const router = useRouter()

const searchCode = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const activeTab = ref<'meta'|'schedules'|'exams'>('meta')

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const dayAbbrevs = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const formatTime = (time: number) => {
  const hours = Math.floor(time)
  const minutes = (time - hours) * 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

interface Event {
  id: number;
  dayIndex: number;
  startTime: number;
  endTime: number;
  title: string;
  room: string;
  teacher: string;
  type: 'lecture' | 'lab';
}

interface Exam {
  id: number;
  subject: string;
  date: string;
  score: number;
  feedback: string;
}

interface StudentPortalData {
  meta: {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    joinDate: string;
    courses: { id: number, name: string, level: string }[];
  };
  schedules: Event[];
  exams: Exam[];
}

const portalData = ref<StudentPortalData | null>(null)

// Calculate CSS positions for the calendar
const getEventTopLimit = (startTime: number) => (startTime - 8) * 60;
const getEventHeight = (startTime: number, endTime: number) => (endTime - startTime) * 60;

const getEventsForDay = (dayIndex: number) => {
  if (!portalData.value) return [];
  return portalData.value.schedules.filter(e => e.dayIndex === dayIndex);
}

const getEventColorClasses = (type: string) => {
  if (type === 'lecture') {
    return 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700/50';
  } else {
    return 'bg-green-100 dark:bg-green-900/40 border-green-200 dark:border-green-700/50';
  }
}

// Full Mock Student Database
const mockData: Record<string, StudentPortalData> = {
  'STU-101': {
    meta: {
      studentId: 'STU-101',
      firstName: 'Ahmed',
      lastName: 'Mohammed',
      email: 'ahmed@student.oxford.ma',
      phone: '+212 600-000000',
      joinDate: 'Sept 01, 2023',
      courses: [
        { id: 1, name: 'General English Level 3', level: 'Intermediate B1' },
        { id: 2, name: 'IT Fundamentals', level: 'Beginner' }
      ]
    },
    schedules: [
      { id: 1, dayIndex: 0, startTime: 9, endTime: 11, title: 'Grammar & Writing', room: 'Room 304', teacher: 'Sarah Jenkins', type: 'lecture' },
      { id: 2, dayIndex: 0, startTime: 11.5, endTime: 13, title: 'Speaking Practice', room: 'Language Lab A', teacher: 'Mark Dubois', type: 'lab' },
      { id: 6, dayIndex: 1, startTime: 9, endTime: 10.5, title: 'Advanced Grammar', room: 'Room 305', teacher: 'Sarah Jenkins', type: 'lecture' },
      { id: 7, dayIndex: 1, startTime: 14, endTime: 15.5, title: 'Coding Workshop', room: 'Computer Lab 2', teacher: 'Ali Karim', type: 'lab' },
      { id: 3, dayIndex: 2, startTime: 10, endTime: 12, title: 'Reading Comprehension', room: 'Room 304', teacher: 'Sarah Jenkins', type: 'lecture' },
      { id: 8, dayIndex: 2, startTime: 12.5, endTime: 14, title: 'English Conversation', room: 'Cafeteria Lounge', teacher: 'Mark Dubois', type: 'lab' },
      { id: 9, dayIndex: 3, startTime: 10, endTime: 12, title: 'Database Basics', room: 'Computer Lab 1', teacher: 'Ali Karim', type: 'lecture' },
      { id: 4, dayIndex: 3, startTime: 14, endTime: 16, title: 'IT Fundamentals', room: 'Computer Lab 1', teacher: 'Ali Karim', type: 'lab' },
      { id: 5, dayIndex: 4, startTime: 9, endTime: 10.5, title: 'Listening Exercises', room: 'Language Lab B', teacher: 'Emily Chen', type: 'lab' },
      { id: 10, dayIndex: 4, startTime: 11, endTime: 12.5, title: 'Pronunciation Clinic', room: 'Room 205', teacher: 'Emily Chen', type: 'lecture' },
      { id: 11, dayIndex: 5, startTime: 10, endTime: 12, title: 'Weekend Writing Lab', room: 'Room 201', teacher: 'Sarah Jenkins', type: 'lab' },
      { id: 12, dayIndex: 5, startTime: 12.5, endTime: 14, title: 'TOEFL Preparation', room: 'Room 202', teacher: 'Mark Dubois', type: 'lecture' },
      { id: 13, dayIndex: 6, startTime: 9, endTime: 11, title: 'Open IT Lab Time', room: 'Computer Lab 1', teacher: 'Lab Assistant', type: 'lab' },
    ],
    exams: [
      { id: 1, subject: 'English B1 - Midterm', date: 'Oct 15, 2023', score: 85, feedback: 'Excellent writing skills.' },
      { id: 2, subject: 'IT Fundamentals - Quiz 1', date: 'Oct 20, 2023', score: 92, feedback: 'Great understanding of OS concepts.' },
      { id: 3, subject: 'English Speaking Assessment', date: 'Nov 02, 2023', score: 78, feedback: 'Good fluency, needs minor pronunciation work.' }
    ]
  }
}

const fetchPortal = () => {
  if (!searchCode.value.trim()) return

  // Store in URL
  const code = searchCode.value.trim().toUpperCase()
  router.push({ query: { ...route.query, code } })

  isLoading.value = true
  errorMsg.value = ''
  portalData.value = null

  // Simulate API delay
  setTimeout(() => {
    isLoading.value = false
    const code = searchCode.value.trim().toUpperCase()
    
    if (mockData[code]) {
      portalData.value = mockData[code]
      activeTab.value = 'meta'
    } else {
      errorMsg.value = `No records found for Student ID "${code}". Please try "STU-101".`
    }
  }, 1000)
}

onMounted(() => {
  if (route.query.code) {
    searchCode.value = route.query.code as string
    fetchPortal()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
