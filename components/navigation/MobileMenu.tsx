"use client";

import styles from "./MobileMenu.module.css";

type Link = {
  label: string;
  href: string;
};

type Props = {
  open: boolean;
  links: readonly Link[];
  onClose: () => void;
};

/**
 * Overlay de menú mobile.
 * La maqueta `Navigation / Mobile Menu` no vino en los frames provistos
 * (solo el disparador hamburguesa), así que se implementa un overlay
 * full-screen alineado al DS: tipografía display/title, links texto, accent hover.
 */
export function MobileMenu({ open, links, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className={styles.top}>
        <a className={styles.logo} href="/" aria-label="SKL" onClick={onClose}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/logo-skl.svg" alt="" width={47} height={15} />
        </a>
        <button
          type="button"
          className={styles.close}
          aria-label="Close menu"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <nav className={styles.nav}>
        {links.map((link) => (
          <a
            key={link.href}
            className={styles.link}
            href={link.href}
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default MobileMenu;
