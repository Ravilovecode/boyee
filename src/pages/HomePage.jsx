import Hero from '../components/Hero'
import ProductCarousel from '../components/ProductCarousel'
import { HeroSection } from '../components/landing/hero-section'
import { FeaturesSection } from '../components/landing/features-section'

import { Footer } from '../components/landing/footer'

function HomePage() {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <div className="landing-section" style={{ background: '#0a0f0a' }}>
        <HeroSection />
        <FeaturesSection />

        <Footer />
      </div>
    </>
  )
}

export default HomePage
