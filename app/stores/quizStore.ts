import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import rawQuestions from '~/assets/questions.json'

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

interface Question {
    id: string
    question: string
    options: string[]
    correctAnswerIndex: number
}

type LangQuestions = Record<Level, Question[]>
type QuizDatabase = Record<string, LangQuestions>

// All questions come from ~/assets/questions.json
const questionsDb = rawQuestions as QuizDatabase
export interface TestLanguage {
    id: string
    flag: string
    name: string
}

export const TEST_LANGUAGES: TestLanguage[] = [
    { id: 'french', flag: 'https://flagcdn.com/w80/fr.png', name: 'الفرنسية' },
    { id: 'english', flag: 'https://flagcdn.com/w80/gb.png', name: 'الإنجليزية' },
    { id: 'spanish', flag: 'https://flagcdn.com/w80/es.png', name: 'الإسبانية' },
    { id: 'german', flag: 'https://flagcdn.com/w80/de.png', name: 'الألمانية' },
    { id: 'italian', flag: 'https://flagcdn.com/w80/it.png', name: 'الإيطالية' },
    { id: 'arabic', flag: 'https://flagcdn.com/w80/sa.png', name: 'العربية' },
]

export const useQuizStore = defineStore('quiz', () => {
    // Pre-quiz state
    const isStarted = ref(false)
    const selectedTestLang = ref<string | null>(null)

    const currentLevelIndex = ref(0)
    const isSubmitted = ref(false)
    const userAnswers = ref<Record<string, number>>({})

    const currentLevel = computed(() => LEVELS[currentLevelIndex.value] as Level)

    // Dynamically fetch all questions for the currently selected language
    const allQuestions = computed<LangQuestions>(() => {
        if (!selectedTestLang.value) return {} as LangQuestions
        return questionsDb[selectedTestLang.value] ?? {} as LangQuestions
    })

    const currentQuestions = computed<Question[]>(() => allQuestions.value[currentLevel.value] ?? [])
    const isLastLevel = computed(() => currentLevelIndex.value === LEVELS.length - 1)

    const canProceed = computed(() =>
        currentQuestions.value.length > 0 &&
        currentQuestions.value.every(q => userAnswers.value[q.id] !== undefined)
    )

    // Real-time check: did the user pass the current level (>50%)?
    const currentLevelPassed = computed(() => {
        if (!canProceed.value) return true // Don't show failure state until all answered
        const qList = currentQuestions.value
        let correct = 0
        qList.forEach(q => {
            if (userAnswers.value[q.id] === q.correctAnswerIndex) correct++
        })
        return qList.length > 0 ? (correct / qList.length) >= 0.6 : false
    })

    const totalQuestionsCount = computed(() =>
        Object.values(allQuestions.value as Record<string, Question[]>).reduce((acc, qs) => acc + qs.length, 0)
    )
    const answeredQuestionsCount = computed(() => Object.keys(userAnswers.value).length)
    const globalProgressPercentage = computed(() =>
        totalQuestionsCount.value === 0 ? 0 : Math.round((answeredQuestionsCount.value / totalQuestionsCount.value) * 100)
    )

    const selectTestLang = (langId: string) => {
        selectedTestLang.value = langId
    }

    const startQuiz = () => {
        if (selectedTestLang.value) {
            isStarted.value = true
        }
    }

    const setAnswer = (questionId: string, optionIndex: number) => {
        userAnswers.value[questionId] = optionIndex
    }

    const nextStep = () => {
        // Calculate score for current level
        const qList = currentQuestions.value
        let correct = 0
        qList.forEach(q => {
            if (userAnswers.value[q.id] === q.correctAnswerIndex) correct++
        })
        const passRate = qList.length > 0 ? correct / qList.length : 0

        // If user scored >= 60%, advance to next level (or submit if last)
        if (passRate >= 0.6) {
            if (isLastLevel.value) {
                isSubmitted.value = true
            } else {
                currentLevelIndex.value++
                if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } else {
            // Failed this level — auto-submit to results
            isSubmitted.value = true
        }
    }

    const resetQuiz = () => {
        userAnswers.value = {}
        currentLevelIndex.value = 0
        isSubmitted.value = false
        isStarted.value = false
        selectedTestLang.value = null
    }

    const calculateResults = computed(() => {
        let totalScore = 0
        let achievedLevel = 'مبتدئ'
        const levelResults: Record<string, { total: number; correct: number; passed: boolean }> = {}

        for (const level of LEVELS) {
            const qList: Question[] = allQuestions.value[level] ?? []
            let correctForLevel = 0
            qList.forEach(q => {
                if (userAnswers.value[q.id] === q.correctAnswerIndex) {
                    correctForLevel++
                    totalScore++
                }
            })
            const passed = qList.length > 0 ? (correctForLevel / qList.length) >= 0.6 : false
            levelResults[level] = { total: qList.length, correct: correctForLevel, passed }
        }

        for (const level of LEVELS) {
            if (levelResults[level]?.passed) achievedLevel = level
            else break
        }

        return {
            totalScore,
            percentage: totalQuestionsCount.value === 0 ? 0 : Math.round((totalScore / totalQuestionsCount.value) * 100),
            achievedLevel,
            levelResults,
        }
    })

    return {
        LEVELS, currentLevelIndex, currentLevel, currentQuestions,
        isLastLevel, isSubmitted, isStarted, selectedTestLang,
        userAnswers, canProceed, currentLevelPassed,
        totalQuestionsCount, answeredQuestionsCount, globalProgressPercentage,
        selectTestLang, startQuiz, setAnswer, nextStep, resetQuiz, calculateResults,
    }
})
