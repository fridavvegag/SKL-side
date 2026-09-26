"use client";

import { whatWeDo } from "@/content/home";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import styles from "./WhatWeDo.module.css";

const STAGGER_MS = 80;

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
      <ScrollReveal>
        <div className={styles.header}>
          <h2 className="text-display">{whatWeDo.title}</h2>
        </div>
      </ScrollReveal>

      <div className={styles.services}>
        {whatWeDo.services.map((service, index) => {
          const isLast = index === whatWeDo.services.length - 1;
          return (
            <ScrollReveal key={service.number} delay={index * STAGGER_MS}>
              <div
                className={`${styles.service} ${isLast ? styles.serviceLast : ""}`}
              >
                <p className={styles.number}>{service.number}</p>
                <h3 className={`${styles.name} text-editorial`}>
                  {service.name}
                </h3>
                <p className={styles.phrases}>
                  {formatPhrases(service.phrases)}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

export default WhatWeDo;
