import { projects } from "@/content/home";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

export function Projects() {
  const col1 = projects.filter((p) => p.column === 1);
  const col2 = projects.filter((p) => p.column === 2);
  const col3 = projects.filter((p) => p.column === 3);

  return (
    <section className={styles.section} id="projects" aria-label="Projects">
      <div className={styles.grid}>
        <div className={styles.column}>
          {col1.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className={`${styles.column} ${styles.desktopOnly}`}>
          {col2.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className={`${styles.column} ${styles.desktopOnly}`}>
          {col3.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Mobile: single column with all projects in visual order */}
        <div className={`${styles.column} ${styles.mobileOnly}`}>
          {[...col2, ...col3].map((project) => (
            <ProjectCard key={`m-${project.id}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
