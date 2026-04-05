<template>
  <div class="bg-white dark:bg-navy-950 min-h-screen transition-colors duration-500">
    <AppHeader />
    <section class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-28 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots dark:opacity-30 opacity-10"></div>
      <div class="container mx-auto px-4 text-center text-navy-900 dark:text-white relative z-10">
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">
          <i class="ph-fill ph-info text-gold-500 mr-3"></i>
          {{ t(pageData.title) }}
        </h1>
        <div class="gold-line mt-6"></div>
      </div>
    </section>
    <section class="py-20 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-6 max-w-4xl">
        <div
          class="prose prose-lg max-w-none dark:prose-invert
                 prose-headings:font-display prose-headings:text-navy-900 dark:prose-headings:text-white
                 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                 prose-a:text-gold-600 dark:prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline
                 prose-strong:text-navy-800 dark:prose-strong:text-white
                 prose-ul:text-gray-600 dark:prose-ul:text-gray-300
                 prose-ol:text-gray-600 dark:prose-ol:text-gray-300
                 prose-li:text-gray-600 dark:prose-li:text-gray-300
                 prose-img:rounded-2xl prose-img:shadow-lg"
          v-html="t(pageData.content)"
        ></div>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { LocalizedField } from '~/types'

const { t } = useLocale()

const l = (en: string, fr?: string, ar?: string): LocalizedField => ({ en, fr: fr || null, ar: ar || null })

// This data will come from the API — mock for now
const pageData = reactive({
  title: l('About Us', 'À Propos', 'من نحن'),
  content: l(
    `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 3rem;">
      <div>
        <h2>Universal Oxford Formations</h2>
        <p><strong>Universal Oxford Formations</strong> is a premier educational institution dedicated to cultivating global communicators and tech-savvy professionals. We offer world-class language courses and comprehensive IT training designed to bridge educational paths with modern career demands.</p>
        <p>Our expansive language center provides expert-led programs in English, French, Spanish, German, and Italian. Whether you are aiming to study abroad, integrate into a new cultural environment, or boost your corporate profile, our tailored linguistic approaches ensure rapid and profound mastery.</p>
      </div>
      <div style="text-align: center;">
        <img src="/images/logo.png" alt="Universal Oxford Formations Logo" style="max-width: 300px; margin: 0 auto;" />
      </div>
    </div>
    <h2>Our Vision &amp; Mission</h2>
    <p>We envision a world interconnected through seamless communication and digital literacy. Our mission is to dismantle language and technological barriers by providing high-quality, engaging, and dynamic education. We view ourselves not just as a school, but as a catalyst for profound professional and personal growth.</p>
    <h2>Why Choose Us?</h2>
    <ul>
      <li><strong>Expert Instructors</strong> — Learn from highly qualified, passionate professionals with years of industry and academic experience.</li>
      <li><strong>Modern Curriculum</strong> — Engage in interactive learning combining theoretical foundations with robust, active practice.</li>
      <li><strong>Holistic Development</strong> — Beyond languages, we prepare you with vital software and essential IT competencies for the modern world.</li>
    </ul>`,
    `<h2>Universal Oxford Formations</h2>
    <p><strong>Universal Oxford Formations</strong> est une institution éducative de premier plan dédiée à la formation de communicateurs internationaux et de professionnels technologiques.</p>
    <h2>Notre Vision et Mission</h2>
    <p>Nous envisageons un monde interconnecté grâce à une communication fluide et à la maîtrise numérique.</p>`,
    `<h2>Universal Oxford Formations</h2>
    <p><strong>Universal Oxford Formations</strong> هي مؤسسة تعليمية رائدة مكرسة لتكوين متواصلين عالميين ومتخصصين في التكنولوجيا.</p>
    <h2>رؤيتنا ومهمتنا</h2>
    <p>نتصور عالماً مترابطاً من خلال التواصل السلس ومحو الأمية الرقمية.</p>`
  )
})

useHead({
  title: 'About Us - Universal Oxford Formations'
})
</script>
