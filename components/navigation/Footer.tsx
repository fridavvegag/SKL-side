import { footer } from "@/content/home";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="session">
      <div className={styles.headlineWrap}>
        <p className={`${styles.headline} text-editorial`}>{footer.headline}</p>
      </div>

      <div className={styles.bar}>
        {footer.columns.map((col) => {
          const value = col.href ? (
            <a className={styles.value} href={col.href}>
              {col.value}
              {"icon" in col && col.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.icon}
                  src="/assets/icons/icon-arrow-up-right-sm.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
              ) : null}
            </a>
          ) : (
            <span className={styles.value}>{col.value}</span>
          );

          return (
            <div key={col.id} className={styles.column}>
              <p className={styles.label}>{col.label}</p>
              {value}
            </div>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
