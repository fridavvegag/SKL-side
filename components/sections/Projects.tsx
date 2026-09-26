"use client";

import { projects } from "@/content/home";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

const STAGGER_MS = 70;

export function Projects() {
  const col1 = projects.filter((p) => p.column === 1);
  const col2 = projects.filter((p) => p.column === 2);
  const col3 = projects.filter((p) => p.column === 3);

  let staggerIndex = 0;
  const revealCard = (project: (typeof projects)[number]) => {
    const delay = (staggerIndex % 3) * STAGGER_MS;
    staggerIndex += 1;
    return (
      <ScrollReveal key={project.id} delay={delay}>
        <ProjectCard project={project} />
      </ScrollReveal>
    );
  };

  return (
    <section className={styles.section} id="projects" aria-label="Projects">
      <div className={styles.grid}>
        <div className={styles.column}>{col1.map(revealCard)}</div>
        <div className={styles.column}>{col2.map(revealCard)}</div>
        <div className={styles.column}>{col3.map(revealCard)}</div>
      </div>
    </section>
  );
}

export default Projects;
