import { business } from "../data/business";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a
              href="#home"
              className="footer-brand"
              aria-label={`${business.name} home`}
            >
              MAKAO <span>INTERIORS</span>
            </a>

            <p>{business.tagline}</p>
          </div>

          <nav aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {business.name}. Demo website.
          </p>

          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
          >
            Demo photography: Unsplash
          </a>
        </div>
      </div>
    </footer>
  );
}