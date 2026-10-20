export default function ServiceCard({ service, onSelectService }) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon" aria-hidden="true">
          {service.icon}
        </span>

        <span className="service-number">
          {service.number}
        </span>
      </div>

      <h3>{service.title}</h3>

      <p>{service.description}</p>

      <a
        className="text-link"
        href="#contact"
        onClick={() => onSelectService(service.title)}
        aria-label={`Request a quotation for ${service.title}`}
      >
        Request a quotation
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}