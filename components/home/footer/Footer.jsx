import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.image_footer}>
          <img
            className={styles.logo_footer}
            src="./images/logo.png"
            alt="img-logo"
          ></img>
        </div>

        <div className={styles.links_columns}>
          <div className={styles.links}>
            <h3 className={styles.title_link}>Acesso Rápido</h3>

            <div>
              <a className={styles.link} href="/">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Home</p>
              </a>
              <a className={styles.link} href="/services">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Services</p>
              </a>
              <a className={styles.link} href="/">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Profissionais</p>
              </a>
              <a className={styles.link} href="/blog">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Blog</p>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title_link}>Nossos Serviços</h3>

            <div>
              <a className={styles.link} href="/">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Clinico Geral</p>
              </a>
              <a className={styles.link} href="/">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Fisioterapia</p>
              </a>
              <a className={styles.link} href="/">
                <i className="fa-solid fa-chevron-right"></i>
                <p>Nutricionista</p>
              </a>
              <a className={styles.link} href="/">
                <i class="fa-solid fa-chevron-right"></i>
                <p>Obstetra</p>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title_link}>Entre em contato</h3>

            <div>
              <a className={styles.link} href="/">
                <i class="fa-solid fa-phone-flip"></i>
                <p>+123-456-789</p>
              </a>
              <a className={styles.link} href="/">
                <i class="fa-solid fa-envelope"></i>
                <p> bebevindo@gmail.com</p>
              </a>
              <a className={styles.link} href="/">
                <i class="fa-solid fa-location-dot"></i>
                <p> São paulo, Brasil - 123</p>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h3 className={styles.title_link}>Redes Sociais</h3>

            <div>
              <a className={styles.link} href="/">
                <i class="fa-brands fa-facebook-f"></i>
                <p>Facebook</p>
              </a>
              <a className={styles.link} href="/">
                <i class="fa-brands fa-twitter"></i>
                <p>Twitter</p>
              </a>
              <a className={styles.link} href="/">
                <i class="fa-brands fa-instagram"></i>
                <p>Instagram</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
