import { business } from "../data/business";

const heroImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85";

export default function Hero() {
  return (
    <section
      className="hero"
      id="home"
      aria-labelledby="hero-title"
    >
      <img
        className="hero-image"
        src={heroImage}
        alt="Light-filled living room with comfortable neutral seating"
        width="1800"
        height="1200"
        fetchPriority="high"
      />

      <div className="hero-shade" aria-hidden="true" />

      <div className="container hero-content">
        <span className="eyebrow light">
          {business.name.toUpperCase()} · KENYA
        </span>

        <h1 id="hero-title">
          A space that
          <br />
          feels like <em>you.</em>
        </h1>

        <p>
          Thoughtful interiors for the way you live and work.
          Discover a warmer, more considered approach to your space.
        </p>

        <div className="hero-actions">
          <a
            className="button button-cream"
            href="#projects"
          >
            Explore our concepts
            <span aria-hidden="true">↗</span>
          </a>

          <a className="hero-link" href="#contact">
            Let’s discuss your space
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>

      <div className="hero-caption">
        <span>COMFORT. CHARACTER. CONNECTION.</span>

        <a href="#about">
          Scroll to discover
          <span aria-hidden="true"> ↓</span>
        </a>
      </div>
    </section>
  );
}