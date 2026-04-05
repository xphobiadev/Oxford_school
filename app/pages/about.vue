<template>
  <div class="bg-white dark:bg-navy-950 min-h-screen transition-colors duration-500">
    <AppHeader />
    <section class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-navy-950 dark:via-navy-900 dark:to-black pt-24 md:pt-28 pb-12 md:pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern-dots dark:opacity-30 opacity-10"></div>
      <div class="container mx-auto px-4 md:px-6 text-center text-navy-900 dark:text-white relative z-10">
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <i class="ph-fill ph-info text-gold-500 mr-2 md:mr-3"></i>
          {{ t(pageData.title) }}
        </h1>
        <div class="gold-line mt-4 md:mt-6"></div>
      </div>
    </section>
    <section class="py-12 md:py-20 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div class="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div
          class="prose prose-base md:prose-lg max-w-none dark:prose-invert
                 prose-headings:font-display prose-headings:text-navy-900 dark:prose-headings:text-white
                 prose-h2:text-2xl md:prose-h2:text-3xl
                 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed text-sm sm:text-base md:text-lg
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
    `<div class="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12">
      <div>
        <h2>Universal Oxford Formations</h2>
        <p><strong>Universal Oxford Formations</strong> is a premier educational institution dedicated to cultivating global communicators and tech-savvy professionals. We offer world-class language courses and comprehensive IT training designed to bridge educational paths with modern career demands.</p>
        <p>Our expansive language center provides expert-led programs in English, French, Spanish, German, and Italian. Whether you are aiming to study abroad, integrate into a new cultural environment, or boost your corporate profile, our tailored linguistic approaches ensure rapid and profound mastery.</p>
      </div>
      <div style="text-align: center;" class="mb-4 md:mb-0">
        <img src="/images/logo.png" alt="Universal Oxford Formations Logo" class="max-w-[200px] md:max-w-[300px] mx-auto w-full h-auto" />
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
    `<div class="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12">
      <div>
        <h2>Universal Oxford Formations</h2>
        <p><strong>Universal Oxford Formations</strong> est une institution éducative de premier plan dédiée à la formation de communicateurs internationaux et de professionnels technologiques. Nous offrons des cours de langue de classe mondiale et une formation informatique complète.</p>
        <p>Notre vaste centre de langues propose des programmes dirigés par des experts en anglais, français, espagnol, allemand et italien. Que vous souhaitiez étudier à l'étranger, vous intégrer ou stimuler votre profil professionnel, nos approches linguistiques garantissent une maîtrise rapide.</p>
      </div>
      <div style="text-align: center;" class="mb-4 md:mb-0">
        <img src="/images/logo.png" alt="Logo Universal Oxford Formations" class="max-w-[200px] md:max-w-[300px] mx-auto w-full h-auto" />
      </div>
    </div>
    <h2>Notre Vision et Mission</h2>
    <p>Nous envisageons un monde interconnecté grâce à une communication fluide et à la maîtrise numérique. Notre mission est de démanteler les barrières linguistiques et technologiques en offrant une éducation dynamique et de haute qualité.</p>
    <h2>Pourquoi Nous Choisir ?</h2>
    <ul>
      <li><strong>Instructeurs Experts</strong> — Apprenez de professionnels hautement qualifiés.</li>
      <li><strong>Programme Moderne</strong> — Participez à un apprentissage interactif alliant théorie et pratique.</li>
      <li><strong>Développement Global</strong> — Au-delà des langues, nous vous préparons avec des compétences informatiques essentielles.</li>
    </ul>`,
    `<div class="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12">
      <div>
        <h2>يونيفرسال أكسفورد للتكوين</h2>
        <p><strong>يونيفرسال أكسفورد للتكوين</strong> هي مؤسسة تعليمية رائدة مكرسة لتكوين متواصلين عالميين ومتخصصين في التكنولوجيا. نحن نقدم دورات لغة عالمية المستوى وتدريب شامل في مجال تكنولوجيا المعلومات.</p>
        <p>يوفر مركز اللغات الواسع لدينا برامج بقيادة خبراء في الإنجليزية، الفرنسية، الإسبانية، الألمانية، والإيطالية. سواء كنت تهدف للدراسة في الخارج أو تعزيز ملفك المهني، فإن مناهجنا تضمن لك إتقانًا سريعًا.</p>
      </div>
      <div style="text-align: center;" class="mb-4 md:mb-0">
        <img src="/images/logo.png" alt="شعار يونيفرسال أكسفورد للتكوين" class="max-w-[200px] md:max-w-[300px] mx-auto w-full h-auto" />
      </div>
    </div>
    <h2>رؤيتنا ومهمتنا</h2>
    <p>نتصور عالماً مترابطاً من خلال التواصل السلس ومحو الأمية الرقمية. مهمتنا هي تفكيك الحواجز اللغوية والتكنولوجية من خلال توفير تعليم عالي الجودة وديناميكي.</p>
    <h2>لماذا تختارنا؟</h2>
    <ul>
      <li><strong>مدربون خبراء</strong> — تعلم من محترفين مؤهلين تأهيلاً عالياً.</li>
      <li><strong>مناهج حديثة</strong> — انخرط في تعليم تفاعلي يجمع بين الأسس النظرية والممارسة.</li>
      <li><strong>تطوير شامل</strong> — إلى جانب اللغات، نعدك بالبرامج الحيوية والكفاءات الأساسية في تكنولوجيا المعلومات.</li>
    </ul>`
  )
})

useHead({
  title: 'About Us - Universal Oxford Formations'
})
</script>
