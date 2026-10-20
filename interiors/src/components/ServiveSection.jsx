import ServiceCard from "./ServiceCard";
import { services } from "../data/business";

export default function ServicesSection({ onSelectService }) {
  return (
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
            Explore interior design services for homes and businesses.
            Project scope and pricing are confirmed with the designer.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.number}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}