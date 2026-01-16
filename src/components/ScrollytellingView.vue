<template>
  <div class="scrollytelling-container">
    <!-- Fixed video background -->
    <div class="video-container">
      <video 
        ref="videoElement"
        class="background-video"
        muted
        playsinline
        preload="auto"
      >
        <source src="/assets/video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
      <div class="video-overlay"></div>
    </div>

    <!-- Scrollable content sections -->
    <div class="content-sections" ref="contentContainer">
      <section 
        v-for="(section, index) in sections" 
        :key="index"
        class="content-section"
        :class="{ 'is-visible': visibleSections[index] }"
        :data-index="index"
      >
        <div class="section-content">
          <h2 class="section-title" v-if="section.title">{{ section.title }}</h2>
          <p class="section-text" v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- Final CTA section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2 class="cta-title">Contactez-nous</h2>
          <p class="cta-text">Découvrez comment nos moucharabiehs peuvent transformer votre espace</p>
          <a href="#contact" class="cta-button">Demander un devis</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const videoElement = ref(null)
const contentContainer = ref(null)
const visibleSections = reactive({})

// Content sections in French
const sections = [
  {
    title: "L'Art du Moucharabieh",
    paragraphs: [
      "Depuis des siècles, le moucharabieh incarne l'excellence de l'artisanat traditionnel.",
      "Un savoir-faire ancestral qui allie beauté, intimité et fonctionnalité."
    ]
  },
  {
    title: "Tradition & Modernité",
    paragraphs: [
      "Nos artisans perpétuent des techniques millénaires tout en s'adaptant aux exigences contemporaines.",
      "Chaque pièce est unique, créée sur mesure pour votre projet."
    ]
  },
  {
    title: "L'Excellence du Détail",
    paragraphs: [
      "Des motifs géométriques complexes sculptés avec précision.",
      "Une attention méticuleuse portée à chaque élément de conception."
    ]
  },
  {
    title: "Lumière & Ombre",
    paragraphs: [
      "Le moucharabieh joue avec la lumière naturelle pour créer des ambiances uniques.",
      "Un jeu subtil d'ombres et de clarté qui évolue au fil de la journée."
    ]
  },
  {
    title: "Votre Vision, Notre Expertise",
    paragraphs: [
      "Nous transformons vos idées en œuvres d'art fonctionnelles.",
      "De la conception à l'installation, nous vous accompagnons à chaque étape."
    ]
  }
]

// Initialize visibility tracking
sections.forEach((_, index) => {
  visibleSections[index] = false
})

// Handle scroll event
const handleScroll = () => {
  if (!videoElement.value || !contentContainer.value) return

  const container = contentContainer.value
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = container.scrollHeight - window.innerHeight
  const scrollProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)

  // Update video playback based on scroll
  const video = videoElement.value
  if (video.duration) {
    const targetTime = video.duration * scrollProgress
    // Only update if the difference is significant to avoid jank
    if (Math.abs(video.currentTime - targetTime) > 0.1) {
      video.currentTime = targetTime
    }
  }

  // Update section visibility based on viewport position
  const sectionElements = container.querySelectorAll('.content-section')
  const viewportCenter = scrollTop + window.innerHeight / 2

  sectionElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect()
    const elementTop = rect.top + scrollTop
    const elementBottom = elementTop + rect.height
    const elementCenter = elementTop + rect.height / 2

    // Section is visible when its center is near viewport center
    const distanceFromCenter = Math.abs(viewportCenter - elementCenter)
    const threshold = window.innerHeight * 0.4

    visibleSections[index] = distanceFromCenter < threshold
  })
}

// Throttle scroll event for performance
let ticking = false
const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  handleScroll() // Initial call
  
  // Ensure video is loaded
  if (videoElement.value) {
    videoElement.value.load()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.scrollytelling-container {
  position: relative;
  width: 100%;
}

/* Fixed video background */
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
}

/* Content sections */
.content-sections {
  position: relative;
  width: 100%;
  min-height: 500vh; /* Total scroll height */
  z-index: 1;
}

.content-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.8s var(--transition-easing),
              transform 0.8s var(--transition-easing);
}

.content-section.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.section-content {
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  padding: var(--spacing-lg);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.section-title {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
  font-size: var(--font-size-xl);
}

.section-text {
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-md);
  line-height: 1.8;
  text-align: center;
}

.section-text:last-child {
  margin-bottom: 0;
}

/* CTA Section */
.cta-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.cta-content {
  max-width: 600px;
  background: rgba(139, 69, 19, 0.95);
  padding: var(--spacing-xl);
  border-radius: 16px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  text-align: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.cta-title {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xxl);
}

.cta-text {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-lg);
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-text-light);
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 50px;
  font-size: var(--font-size-md);
  font-weight: 600;
  transition: all var(--transition-speed) var(--transition-easing);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  background: var(--color-accent);
  color: var(--color-text-light);
}

/* Mobile optimizations */
@media (max-width: 767px) {
  .section-content {
    padding: var(--spacing-md);
  }

  .section-title {
    font-size: var(--font-size-lg);
  }

  .section-text {
    font-size: var(--font-size-sm);
  }

  .cta-content {
    padding: var(--spacing-md);
  }

  .cta-title {
    font-size: var(--font-size-xl);
  }

  .cta-text {
    font-size: var(--font-size-md);
  }
}

/* Tablet optimizations */
@media (min-width: 768px) and (max-width: 1023px) {
  .section-content {
    padding: var(--spacing-lg);
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .content-section {
    transition: opacity 0.3s ease;
    transform: none;
  }
  
  .content-section.is-visible {
    transform: none;
  }
  
  .cta-button:hover {
    transform: none;
  }
}
</style>
