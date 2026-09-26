import type { Project } from "@/content/home";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <article className={`${styles.card} ${styles[project.size]}`}>
      <div className={styles.media}>
        {project.kind === "video" ? (
          <video
            src={project.media}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.media} alt="" />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={`${styles.name} text-editorial`}>{project.name}</h3>
        <p className={`${styles.description} text-editorial`}>
          {project.description}
        </p>
      </div>
    </article>
  );
}

export default ProjectCard;
