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
        <div className={styles.column}>
          {col2.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className={styles.column}>
          {col3.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
