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
            
            <!-- Tabs -->
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
                        <h5 class="font-bold text-navy-900 dark:text-white">{{ course.groupName }}</h5>
                        <div class="flex items-center gap-3 mt-1.5">
                          <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <i class="ph-fill ph-translate text-gold-500"></i>
                            {{ course.languageName }}
                          </span>
                          <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <i class="ph-fill ph-user text-gold-500"></i>
                            {{ course.teacherName }}
                          </span>
                        </div>
                      </div>
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase rounded-lg">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TAB: Schedules -->
              <div v-else-if="activeTab === 'schedules'" key="schedules" class="animate-fade-in">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h4 class="text-2xl font-bold font-display text-navy-900 dark:text-white flex items-center gap-3">
                      <i class="ph-fill ph-calendar text-gold-500"></i> Weekly Timetable
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Your current course schedule and room assignments</p>
                  </div>
                </div>

                <!-- Desktop Calendar Grid Container -->
                <div class="hidden md:block overflow-x-auto rounded-3xl border border-gray-200 dark:border-navy-700/80 shadow-inner bg-gray-50/30 dark:bg-navy-900/10">
                  <div class="min-w-[1000px] p-6">
                    <div class="bg-white dark:bg-navy-800 rounded-2xl border border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm">
                      <!-- Grid Header (Days) -->
                      <div class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-900/50">
                        <div class="py-4 px-2 text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200 dark:border-navy-700">Time</div>
                        <div v-for="(day, i) in days" :key="day" class="py-4 px-1 text-center text-xs font-bold text-navy-900 dark:text-gray-200 uppercase tracking-widest border-r border-gray-200 dark:border-navy-700 last:border-0">
                          {{ dayAbbrevs[i] }}
                        </div>
                      </div>

                      <!-- Grid Body -->
                      <div class="relative bg-white dark:bg-navy-800 w-full" :style="{ height: (timeSlots.length * 70) + 'px' }">
                        <!-- Background Grid Lines & Times -->
                        <div class="absolute inset-0 grid grid-cols-[100px_1fr] pointer-events-none">
                          <div class="border-r border-gray-200 dark:border-navy-700 bg-gray-50/30 dark:bg-navy-900/20 h-full">
                            <div v-for="time in timeSlots" :key="time" class="h-[70px] border-b border-gray-100 dark:border-navy-700/30 flex justify-center py-3">
                               <span class="text-[11px] font-bold text-gray-400 dark:text-gray-500">{{ formatTime(time) }}</span>
                            </div>
                          </div>
                          <div class="grid grid-cols-7 h-full">
                            <div v-for="day in days" :key="'col-' + day" class="border-r border-gray-100 dark:border-navy-700/30 last:border-0 h-full relative">
                               <div v-for="time in timeSlots" :key="time + day" class="h-[70px] border-b border-gray-50 dark:border-navy-700/20"></div>
                            </div>
                          </div>
                        </div>

                        <!-- Events Layer -->
                        <div class="absolute inset-0 grid grid-cols-[100px_repeat(7,1fr)] pointer-events-none">
                          <div></div>
                          <div v-for="(day, dayIndex) in days" :key="'events-' + day" class="relative">
                            <template v-for="event in getEventsForDay(dayIndex)" :key="event.id">
                              <div 
                                class="absolute inset-x-1 rounded-xl p-3 shadow-md border pointer-events-auto cursor-pointer z-10 overflow-hidden 
                                       bg-white dark:bg-navy-900 border-gold-400/30 dark:border-gold-500/30 
                                       hover:border-gold-500 dark:hover:border-gold-500 transition-all group/event"
                                :style="{ top: getEventTopLimitAdjusted(event.startTime) + 'px', height: getEventHeightAdjusted(event.startTime, event.endTime) + 'px' }"
                              >
                                 <div class="absolute left-0 top-0 bottom-0 w-1 bg-gold-500 rounded-full"></div>
                                 <h4 class="font-bold text-xs leading-tight mb-2 text-navy-900 dark:text-white group-hover/event:text-gold-600 dark:group-hover/event:text-gold-400 transition-colors">{{ event.groupName }}</h4>
                                 <div class="space-y-1.5 font-medium">
                                   <div class="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                                     <i class="ph-fill ph-map-pin text-gold-500"></i> <span>{{ event.room }}</span>
                                   </div>
                                   <div class="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                                     <i class="ph-fill ph-clock text-gold-500"></i> {{ formatTime(event.startTime) }}-{{ formatTime(event.endTime) }}
                                   </div>
                                 </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Mobile Agenda View (< md) -->
                <div class="md:hidden space-y-8 animate-fade-up">
                  <div v-for="(day, dayIndex) in days" :key="'mob-' + day" class="space-y-4">
                    <!-- Only show days that have events -->
                    <template v-if="getEventsForDay(dayIndex).length > 0">
                      <div class="flex items-center gap-4">
                        <span class="text-sm font-black text-gold-600 dark:text-gold-400 uppercase tracking-widest">{{ day }}</span>
                        <div class="flex-1 h-px bg-gradient-to-r from-gold-500/50 to-transparent"></div>
                      </div>
                      <div class="space-y-4">
                        <div 
                          v-for="event in getEventsForDay(dayIndex).sort((a,b) => a.startTime - b.startTime)" 
                          :key="'mob-ev-' + event.id"
                          class="p-5 rounded-2xl border-l-4 bg-white dark:bg-navy-900 shadow-sm border-gray-100 dark:border-navy-700 border-l-gold-500 relative overflow-hidden"
                        >
                          <div class="flex justify-between items-start mb-4">
                            <h4 class="font-bold text-navy-900 dark:text-white text-base">{{ event.groupName }}</h4>
                            <span class="text-[10px] font-black px-2 py-1 rounded-lg bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-navy-600 uppercase">
                              {{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}
                            </span>
                          </div>
                          
                          <div class="flex items-center gap-4 text-xs font-semibold">
                            <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400"><i class="ph-fill ph-map-pin text-gold-500"></i> {{ event.room }}</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <!-- TAB: Exams -->
              <div v-else-if="activeTab === 'exams'" key="exams" class="animate-fade-in">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h4 class="text-2xl font-bold font-display text-navy-900 dark:text-white flex items-center gap-3">
                      <i class="ph-fill ph-exam text-gold-500"></i> Examination Results
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your academic progress and download exam files</p>
                  </div>
                </div>
                
                <!-- Desktop Table View -->
                <div class="hidden md:block overflow-hidden rounded-3xl border border-gray-200 dark:border-navy-700 shadow-sm bg-white dark:bg-navy-800">
                  <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50 dark:bg-navy-900/50">
                      <tr class="text-xs uppercase tracking-widest font-black text-gray-400">
                        <th class="p-5 border-b border-gray-100 dark:border-navy-700">Subject</th>
                        <th class="p-5 border-b border-gray-100 dark:border-navy-700">Exam Date</th>
                        <th class="p-5 border-b border-gray-100 dark:border-navy-700">Result</th>
                        <th class="p-5 border-b border-gray-100 dark:border-navy-700">Status</th>
                        <th class="p-5 border-b border-gray-100 dark:border-navy-700 text-right">Documents</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 dark:divide-navy-700/50">
                      <tr v-for="exam in portalData.exams" :key="exam.id" 
                          class="group hover:bg-gold-500/[0.02] transition-all cursor-pointer"
                          @click="openExam(exam.examFile)">
                        <td class="p-5">
                          <div class="font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{{ exam.subject }}</div>
                        </td>
                        <td class="p-5">
                          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                            <i class="ph ph-calendar text-gold-500"></i>
                            {{ exam.date }}
                          </div>
                        </td>
                        <td class="p-5">
                          <div class="font-black font-display text-lg text-navy-900 dark:text-white">{{ exam.score }}<span class="text-xs text-gray-400 ml-0.5">/100</span></div>
                        </td>
                        <td class="p-5">
                          <span v-if="exam.score >= 50" 
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-wider">
                            <i class="ph-fill ph-check-circle"></i>
                            Passed
                          </span>
                          <span v-else 
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-wider">
                            <i class="ph-fill ph-warning-circle"></i>
                            Failed
                          </span>
                        </td>
                        <td class="p-5 text-right">
                          <a
                            v-if="exam.examFile"
                            :href="exam.examFile"
                            target="_blank"
                            @click.stop
                            class="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 dark:bg-navy-700 text-white dark:text-gray-100 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gold-500 dark:hover:bg-gold-500 transition-all shadow-sm"
                          >
                            <i class="ph-fill ph-file-pdf text-lg"></i>
                            View Exam
                          </a>
                          <span v-else class="text-[10px] font-bold text-gray-300 dark:text-navy-600 tracking-widest uppercase italic">No file available</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Mobile Card View (< md) -->
                <div class="md:hidden space-y-4 animate-fade-up">
                  <div
                    v-for="exam in portalData.exams"
                    :key="'mob-exam-' + exam.id"
                    @click="openExam(exam.examFile)"
                    class="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-gray-100 dark:border-navy-700 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform"
                  >
                    <div class="absolute left-0 top-0 bottom-0 w-1.5" :class="exam.score >= 50 ? 'bg-green-500' : 'bg-red-500'"></div>
                    <div class="flex justify-between items-start mb-6">
                      <div class="pr-3">
                        <h4 class="font-bold text-navy-900 dark:text-white text-lg leading-tight">{{ exam.subject }}</h4>
                        <div class="text-[10px] text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2 font-black uppercase tracking-wider">
                          <i class="ph ph-calendar text-gold-500"></i> {{ exam.date }}
                        </div>
                      </div>
                      <div class="text-right shrink-0">
                        <div class="font-black font-display text-2xl text-navy-900 dark:text-white">{{ exam.score }}<span class="text-xs text-gray-400 ml-0.5">/100</span></div>
                        <span v-if="exam.score >= 50" class="inline-block mt-2 px-2.5 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[9px] font-black uppercase tracking-wider rounded-lg">Passed</span>
                        <span v-else class="inline-block mt-2 px-2.5 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-[9px] font-black uppercase tracking-wider rounded-lg">Failed</span>
                      </div>
                    </div>
                    <div v-if="exam.examFile" class="pt-4 border-t border-gray-50 dark:border-navy-800 flex items-center justify-between group">
                      <span class="text-gold-600 dark:text-gold-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <i class="ph-fill ph-file-pdf text-lg"></i>
                        View Exam File
                      </span>
                      <i class="ph ph-arrow-right text-gray-300 group-hover:translate-x-1 transition-transform"></i>
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

interface ScheduleEvent {
  id: number;
  dayIndex: number;
  startTime: number;
  endTime: number;
  groupName: string;
  room: string;
}

interface ExamResult {
  id: number;
  subject: string;
  date: string;
  score: number;
  examFile: string | null;
}

interface StudentPortalData {
  meta: {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    joinDate: string;
    courses: { id: number, groupName: string, languageName: string, teacherName: string }[];
  };
  schedules: ScheduleEvent[];
  exams: ExamResult[];
}

const portalData = ref<StudentPortalData | null>(null)

// Calculate CSS positions for the calendar (70px per hour)
const getEventTopLimitAdjusted = (startTime: number) => (startTime - 8) * 70;
const getEventHeightAdjusted = (startTime: number, endTime: number) => (endTime - startTime) * 70;

const getEventsForDay = (dayIndex: number) => {
  if (!portalData.value) return [];
  return portalData.value.schedules.filter(e => e.dayIndex === dayIndex);
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
        { id: 1, groupName: 'English B1', languageName: 'English', teacherName: 'Ahmed Benali' },
        { id: 2, groupName: 'French A2', languageName: 'French', teacherName: 'Jean Dupont' }
      ]
    },
    schedules: [
      { id: 1, dayIndex: 0, startTime: 9, endTime: 11, groupName: 'English B1', room: 'Room 304' },
      { id: 2, dayIndex: 0, startTime: 11.5, endTime: 13, groupName: 'French A2', room: 'Room 201' },
      { id: 6, dayIndex: 1, startTime: 9, endTime: 10.5, groupName: 'English B1', room: 'Room 305' },
      { id: 7, dayIndex: 1, startTime: 14, endTime: 15.5, groupName: 'French A2', room: 'Room 201' },
      { id: 3, dayIndex: 2, startTime: 10, endTime: 12, groupName: 'English B1', room: 'Room 304' },
      { id: 9, dayIndex: 3, startTime: 10, endTime: 12, groupName: 'French A2', room: 'Room 201' },
      { id: 4, dayIndex: 3, startTime: 14, endTime: 16, groupName: 'English B1', room: 'Room 304' },
      { id: 5, dayIndex: 4, startTime: 9, endTime: 10.5, groupName: 'English B1', room: 'Language Lab B' },
      { id: 11, dayIndex: 5, startTime: 10, endTime: 12, groupName: 'French A2', room: 'Room 201' },
    ],
    exams: [
      { id: 1, subject: 'English B1 - Midterm', date: 'Oct 15, 2023', score: 85, examFile: '/exams/english-b1-midterm.pdf' },
      { id: 2, subject: 'French A2 - Quiz 1', date: 'Oct 20, 2023', score: 92, examFile: '/exams/french-a2-quiz1.pdf' },
      { id: 3, subject: 'English B1 - Speaking', date: 'Nov 02, 2023', score: 78, examFile: null }
    ]
  }
}

const openExam = (file: string | null) => {
  if (file) {
    window.open(file, '_blank')
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
