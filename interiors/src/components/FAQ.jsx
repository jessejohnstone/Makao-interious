import { faqs } from "../data/business";

export default function FAQ() {
  return (
    <section
      className="section faq-section"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container faq-layout">
        <div>
          <span className="eyebrow">A FEW HELPFUL ANSWERS</span>

          <h2 id="faq-heading">
            Before
            <br />
            <em>we begin.</em>
          </h2>

          <p className="small-muted">
            Draft answers for demonstration purposes.
          </p>

          <a className="text-link" href="#contact">
            Have another question?
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}