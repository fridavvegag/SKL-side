"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./ScrollReveal.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for related items (e.g. cards). */
  delay?: number;
  /** Root margin for earlier/later trigger. */
  rootMargin?: string;
};

/**
 * One-shot editorial scroll reveal: opacity 0→1 + translateY ~20px→0.
 * Respects prefers-reduced-motion (content visible immediately, no motion).
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  rootMargin = "0px 0px -8% 0px",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, rootMargin]);

  const style =
    delay > 0 && !reduced
      ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${
        className ?? ""
      }`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
