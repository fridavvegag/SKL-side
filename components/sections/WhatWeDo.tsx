import { whatWeDo } from "@/content/home";
import styles from "./WhatWeDo.module.css";

function formatPhrases(
  phrases: readonly { text: string; muted?: boolean }[],
) {
  return phrases.map((phrase, i) => (
    <span key={`${phrase.text}-${i}`}>
      {i > 0 ? " - " : null}
      <span className={phrase.muted ? styles.muted : undefined}>
        {phrase.text}
      </span>
    </span>
  ));
}

export function WhatWeDo() {
  return (
    <section className={styles.section} aria-label="What We Do">
      <div className={styles.header}>
        <h2 className="text-display">{whatWeDo.title}</h2>
      </div>

      <div className={styles.services}>
        {whatWeDo.services.map((service, index) => {
          const isLast = index === whatWeDo.services.length - 1;
          return (
            <div
              key={service.number}
              className={`${styles.service} ${isLast ? styles.serviceLast : ""}`}
            >
              <p className={styles.number}>{service.number}</p>
              <h3 className={`${styles.name} text-editorial`}>{service.name}</h3>
              <p className={styles.phrases}>{formatPhrases(service.phrases)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhatWeDo;
