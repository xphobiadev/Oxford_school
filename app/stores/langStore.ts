import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Lang = 'ar'

export const useLangStore = defineStore('lang', () => {
    const lang = ref<Lang>('ar')
    const dir = computed(() => 'rtl')

    // ─── UI Translations (Arabic only) ──────────────────────────────────────────
    const t = computed(() => ({
        // Language selection
        selectLangTitle: 'اختر لغة الاختبار',
        selectLangSubtitle: 'اختر اللغة التي تود اختبار مستواك فيها',
        startNow: 'ابدأ الآن 🚀',
        comingSoon: 'قريباً',

        // Quiz screen
        quizTitle: 'تقييم مستوى اللغة الفرنسية',
        quizSubtitle: 'أجب على جميع الأسئلة في كل مستوى للتقدم',
        answered: 'تمت الإجابة',
        complete: 'مكتمل',
        nextLevel: 'المستوى التالي',
        submitQuiz: 'إرسال الاختبار 🏁',
        answerHint: (n: number) => `أجب على جميع الـ ${n} أسئلة للمتابعة`,
        questionOf: (i: number, t: number) => `السؤال ${i} من ${t}`,

        // Level names
        levelNames: {
            A1: 'مبتدئ',
            A2: 'أساسي',
            B1: 'متوسط',
            B2: 'فوق المتوسط',
            C1: 'متقدم',
            C2: 'احترافي',
        } as Record<string, string>,

        // Calculating screen
        calculating: 'جاري حساب النتائج…',
        calculatingSub: 'تحليل إجاباتك عبر جميع المستويات الستة',

        // Results screen
        assessmentComplete: 'اكتمل التقييم',
        quizComplete: '🎉 اكتمل الاختبار!',
        resultsSub: 'هنا نتائج تقييم مستوى الفرنسية الشاملة لك',
        totalScore: 'النقاط الكلية',
        scoreLabel: 'النتيجة',
        estimatedLevel: 'مستواك التقديري في الإطار الأوروبي المشترك',
        didNotPass: (passed: string, failed: string) =>
            `لقد اجتزت حتى مستوى ${passed}، لكنك لم تصل إلى العتبة المطلوبة (60%) لمستوى ${failed}.`,
        noLevel: 'لم تجتز أي مستوى',
        outstanding: '🏆 أداء ممتاز! لقد حققت المستوى الأعلى C2!',
        breakdown: 'التفصيل حسب المستوى',
        pass: 'نجح ✓',
        fail: 'رسوب ✗',
        retake: '↩ إعادة الاختبار',
    }))

    return { lang, dir, t }
})
