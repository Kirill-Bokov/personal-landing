import styles from "./LandingPage.module.scss"
import { HeroSection } from "../components/landingPage/HeroSection/HeroSection"
import { AboutSection } from "../components/landingPage/AboutSection/AboutSection"
import { HowIWorkSection } from "../components/landingPage/HowIWorkSection/HowIWorkSection"
import { ProjectsSection } from "../components/landingPage/ProjectsSection/ProjectsSection"
import { ContactSection } from "../components/landingPage/ContactSection/ContactSection"
import { ContactForm } from "../components/landingPage/ContactSection/ContactForm"

export const LandingPage = () => {
  return (
    <div className={styles.page}>
      <HeroSection />
      <AboutSection />
      <HowIWorkSection />
      <ProjectsSection />
      <ContactSection />
      <ContactForm/>
    </div>
  )
}
