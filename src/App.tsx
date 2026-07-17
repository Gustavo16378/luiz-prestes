import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { Tratamentos } from './components/Tratamentos'
import { Reac } from './components/Reac'
import { Sobre } from './components/Sobre'
import { Instituto } from './components/Instituto'
import { ComoChegar } from './components/ComoChegar'
import { Faq } from './components/Faq'
import { CtaFinal } from './components/CtaFinal'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'

export default function App() {
  useReveal()
  useParallax()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Tratamentos />
        <Reac />
        <Sobre />
        <Instituto />
        <ComoChegar />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
