import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServiveSection";
import ProjectGallery from "./components/projectGallery";
import EnquiryForm from "./components/EnquiryForm";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import WhatsAppButton from "./components/WhatsappButton";

import { business, services } from "./data/business";
const heroImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85";

const aboutImage =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80";

const steps = [
  {
    title: "Start a conversation",
    description:
      "Share your space, your ideas, and what you would like to achieve.",
  },
  {
    title: "Shape the direction",
    description:
      "Discuss the layout, visual direction, priorities, and proposed scope.",
  },
  {
    title: "Agree on the details",
    description:
      "Review the proposal, quotation, and responsibilities before work begins.",
  },
];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="demo-banner">
        Demonstration website · Sample concepts and stock photography
      </div>

      <Navbar />

      <main id="main">
        {/* HOME */}
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

        {/* INTRODUCTION STRIP */}
        <div className="intro-strip">
          <div className="container intro-strip-content">
            <span>Designed with intention.</span>
            <span>Made for everyday living.</span>
            <span>Inspired by you.</span>
          </div>
        </div>

        {/* ABOUT */}
        <section
          className="section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="container about-layout">
            <div className="about-visual">
              <img
                src={aboutImage}
                alt="Warm contemporary interior used as design inspiration"
                loading="lazy"
                width="1000"
                height="1100"
              />

              <div className="image-note">
                <span>THE MAKAO APPROACH</span>
                <strong>Beauty with purpose.</strong>
              </div>
            </div>

            <div className="about-copy">
              <span className="eyebrow">
                A LITTLE ABOUT MAKAO
              </span>

              <h2 id="about-heading">
                Good design begins
                <br />
                with <em>listening.</em>
              </h2>

              <p>
                A beautiful space should also work for the people
                who use it. Our demo introduces an approach rooted
                in thoughtful layouts, natural textures, and the
                details that make a room feel personal.
              </p>

              <p>
                From a single room refresh to a broader interior
                concept, the starting point is understanding your
                routines, priorities, and vision.
              </p>

              <div className="values">
                <div>
                  <strong>Personal</strong>
                  <span>Shaped around your needs</span>
                </div>

                <div>
                  <strong>Practical</strong>
                  <span>Created for daily life</span>
                </div>

                <div>
                  <strong>Considered</strong>
                  <span>Thoughtful in every detail</span>
                </div>
              </div>

              <p className="small-muted">
                Demo brand story. The buyer’s introduction, team,
                experience, and service areas will replace this content.
              </p>

              <a className="text-link" href="#contact">
                Tell us your story
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          className="section services-section"
          id="services"
          aria-labelledby="services-heading"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  WHAT WE CAN EXPLORE
                </span>

                <h2 id="services-heading">
                  Your space.
                  <br />
                  <em>New possibilities.</em>
                </h2>
              </div>

              <p>
                Explore our sample service offering. Final services
                and quotations will be confirmed by the designer.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article
                  className="service-card"
                  key={service.number}
                >
                  <div className="service-card-top">
                    <span
                      className="service-icon"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </span>

                    <span className="service-number">
                      {service.number}
                    </span>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <a className="text-link" href="#contact">
                    Request a quotation
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="section"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  THE CONCEPT COLLECTION
                </span>

                <h2 id="projects-heading">
                  A little inspiration
                  <br />
                  for <em>your next chapter.</em>
                </h2>
              </div>

              <p>
                Illustrative concepts using stock photography.
                These images do not represent completed client work.
              </p>
            </div>

            <ProjectGallery />
          </div>
        </section>

        {/* DESIGN PROCESS */}
        <section
          className="section process-section"
          id="process"
          aria-labelledby="process-heading"
        >
          <div className="container">
            <div className="center-heading">
              <span className="eyebrow">
                FROM FIRST IDEA TO A CLEAR PLAN
              </span>

              <h2 id="process-heading">
                A thoughtful process.
                <br />
                <em>One step at a time.</em>
              </h2>

              <p>
                Proposed process — subject to the designer’s confirmation.
              </p>
            </div>

            <div className="process-grid">
              {steps.map((step, index) => (
                <article
                  className="process-card"
                  key={step.title}
                >
                  <span className="step-number">
                    0{index + 1}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <FAQ />

        {/* CONTACT */}
        <section
          className="section contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">
                LET’S MAKE ROOM FOR YOUR IDEAS
              </span>

              <h2 id="contact-heading">
                Every beautiful space
                <br />
                starts with
                <br />
                <em>a conversation.</em>
              </h2>

              <p>
                A room to refresh? A business to bring to life?
                Tell us what you have in mind.
              </p>

              <div className="contact-details">
                <div>
                  <span>SERVICE AREAS</span>
                  <p>{business.serviceArea}</p>
                </div>

                <div>
                  <span>EMAIL</span>

                  {business.email ? (
                    <a href={`mailto:${business.email}`}>
                      {business.email}
                    </a>
                  ) : (
                    <p>Designer’s email to be added</p>
                  )}
                </div>

                <div>
                  <span>PHONE</span>

                  {business.phone ? (
                    <a
                      href={`tel:${business.phone.replace(
                        /\s/g,
                        ""
                      )}`}
                    >
                      {business.phone}
                    </a>
                  ) : (
                    <p>Designer’s phone to be added</p>
                  )}
                </div>
              </div>
            </div>

            <EnquiryForm />
          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}