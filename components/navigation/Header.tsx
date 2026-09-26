"use client";

import { useEffect, useState } from "react";
import { mobileMenuLinks, nav } from "@/content/home";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <a className={`${styles.link} ${styles.desktopOnly}`} href={nav.projects.href}>
          {nav.projects.label}
        </a>

        <a className={styles.logo} href="/" aria-label={nav.logoAlt}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/logo-skl.svg" alt="" width={47} height={15} />
        </a>

        <a className={`${styles.link} ${styles.desktopOnly}`} href={nav.about.href}>
          {nav.about.label}
        </a>

        <button
          type="button"
          className={`${styles.menuButton} ${styles.mobileOnly}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/icon-menu.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </header>

      <MobileMenu
        open={menuOpen}
        links={mobileMenuLinks}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

export default Header;
