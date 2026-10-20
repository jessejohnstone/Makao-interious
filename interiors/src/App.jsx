
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServiveSection";
import ProjectGallery from "./components/projectGallery";
import EnquiryForm from "./components/EnquiryForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsappButton";

import { business } from "./data/business";
import BackToTop from "./components/BackToTop";
import { useState } from "react";

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
  const [serviceRequest, setServiceRequest] = useState(null);

  function handleSelectService(service) {
    setServiceRequest({ service });
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="disclosure-banner">
        Interior design inspiration · Stock photography
      </div>

      <Navbar />

      <main id="main">
        {/* HOME */}
        <Hero />

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
                who use it. We bring together thoughtful layouts,
                natural textures, and personal details to create
                spaces that feel considered and comfortable.
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
                Every project begins with an understanding of the
                people, routines, and priorities that shape a space.
              </p>

              <a className="text-link" href="#contact">
                Tell us your story
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <ServicesSection onSelectService={handleSelectService} />

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
                Explore interior design inspiration. The photographs are
                stock images and do not show completed client projects.
              </p>
            </div>

            
            <ProjectGallery onSelectService={handleSelectService} />
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
                Each project is planned around your space, priorities, and agreed scope.
              </p>
            </div>

            <div className="process-grid">
              {steps.map((step, index) => (
                <article
                  className="process-card"
                  key={step.title}
                >
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
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
                    <p>Email details are currently unavailable.</p>
                  )}
                </div>

                <div>
                  <span>PHONE</span>

                  {business.phone ? (
                    <a
                      href={`tel:${business.phone.replace(/\s/g, "")}`}
                    >
                      {business.phone}
                    </a>
                  ) : (
                    <p>Phone details are currently unavailable.</p>
                  )}
                </div>
              </div>
            </div>

            <EnquiryForm serviceRequest={serviceRequest} />
          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppButton />

     <BackToTop />

    </>
  );
}