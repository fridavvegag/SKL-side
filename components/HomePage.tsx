import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { SklCircle } from "@/components/sections/SklCircle";
import { LoadingExperience } from "@/components/loading/LoadingExperience";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <>
      <main className={styles.main} aria-label="Home">
        <Header />
        <Hero />
        <div className={styles.afterHero}>
          <Projects />
        </div>
        <div className={styles.afterProjects}>
          <WhatWeDo />
        </div>
        <div className={styles.afterWhatWeDo}>
          <SklCircle />
        </div>
        <div className={styles.afterCircle}>
          <Footer />
        </div>
      </main>
      <LoadingExperience />
    </>
  );
}

export default HomePage;
