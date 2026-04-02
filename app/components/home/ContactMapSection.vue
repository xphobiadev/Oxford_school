<template>
  <section class="relative py-24 bg-gray-50 overflow-hidden" id="contact">
    <!-- Background -->
    <div class="absolute inset-0 bg-pattern-dots opacity-30"></div>
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

    <div class="relative container mx-auto px-6">
      <div class="text-center mb-16">
        <div class="badge-gold mx-auto mb-6">
          <i class="fas fa-map-marker-alt"></i>
          Find Us
        </div>
        <h2 class="section-title">Visit Our Campus</h2>
        <div class="gold-line"></div>
        <p class="section-subtitle">
          Come visit us or reach out through any of the channels below
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Map -->
        <div class="card-elegant overflow-hidden h-[450px] lg:h-full min-h-[450px]">
          <iframe
            src="https://maps.google.com/maps?q=Rue+Des+Haddadas+N%C2%B095,+Oued+Zem+25350&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full h-full"
          ></iframe>
        </div>

        <!-- Contact Info -->
        <div class="card-elegant p-10 md:p-12 flex flex-col justify-center">
          <div class="flex items-center gap-4 mb-10">
            <img
              :src="'/images/logo.png'"
              alt="Logo"
              class="w-16 h-16 object-contain rounded-full ring-2 ring-gold-500/20"
            />
            <div>
              <h3 class="font-display text-2xl font-bold text-navy-800">
                Contact Information
              </h3>
              <p class="text-gold-600 text-sm font-semibold">
                Universal Oxford Groupe
              </p>
            </div>
          </div>

          <div class="space-y-5">
            <!-- Phone -->
            <a
              href="tel:+2125XXXXXXXX"
              class="flex items-center gap-5 group p-4 -mx-4 rounded-2xl
                     hover:bg-navy-50 transition-all duration-300"
            >
              <div
                class="w-14 h-14 rounded-2xl bg-navy-100 flex items-center justify-center
                       group-hover:bg-navy-800 transition-all duration-300 flex-shrink-0
                       group-hover:shadow-navy"
              >
                <i class="fas fa-phone text-navy-600 group-hover:text-gold-500
                          transition-colors text-lg"></i>
              </div>
              <div>
                <p class="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">Phone</p>
                <p class="font-bold text-navy-800 text-lg">+212 5XX-XXXXXX</p>
              </div>
            </a>

            <!-- WhatsApp -->
            <a
              href="https://wa.me/2126XXXXXXXX"
              target="_blank"
              class="flex items-center gap-5 group p-4 -mx-4 rounded-2xl
                     hover:bg-green-50 transition-all duration-300"
            >
              <div
                class="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center
                       group-hover:bg-green-500 transition-all duration-300 flex-shrink-0
                       group-hover:shadow-lg"
              >
                <i class="fab fa-whatsapp text-green-600 group-hover:text-white
                          transition-colors text-2xl"></i>
              </div>
              <div>
                <p class="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">WhatsApp</p>
                <p class="font-bold text-navy-800 text-lg">+212 6XX-XXXXXX</p>
              </div>
            </a>

            <!-- Email -->
            <a
              href="mailto:contact@universaloxford.com"
              class="flex items-center gap-5 group p-4 -mx-4 rounded-2xl
                     hover:bg-blue-50 transition-all duration-300"
            >
              <div
                class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center
                       group-hover:bg-blue-500 transition-all duration-300 flex-shrink-0
                       group-hover:shadow-lg"
              >
                <i class="fas fa-envelope text-blue-600 group-hover:text-white
                          transition-colors text-lg"></i>
              </div>
              <div>
                <p class="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">Email</p>
                <p class="font-bold text-navy-800">contact@universaloxford.com</p>
              </div>
            </a>

            <!-- Address -->
            <div class="flex items-center gap-5 group p-4 -mx-4 rounded-2xl">
              <div
                class="w-14 h-14 rounded-2xl bg-gold-100 flex items-center justify-center
                       flex-shrink-0"
              >
                <i class="fas fa-location-dot text-gold-600 text-lg"></i>
              </div>
              <div>
                <p class="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">Address</p>
                <p class="font-bold text-navy-800">Rue Des Haddadas N°95, Oued Zem 25350</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
