import { useState } from "react";
import { business, services } from "../data/business";

export default function EnquiryForm() {
  const [message, setMessage] = useState("");

  const email = business.email.trim();
  const whatsapp = business.whatsapp.replace(/\D/g, "");

  const emailConfigured = Boolean(email);
  const whatsappConfigured = /^[1-9]\d{7,14}$/.test(whatsapp);

  function handleSubmit(event) {
    event.preventDefault();

    if (!emailConfigured) {
      setMessage(
        "This demonstration has no receiving email configured. No enquiry has been sent."
      );
      return;
    }

    const data = new FormData(event.currentTarget);

    const name = data.get("name").trim();
    const contact = data.get("contact").trim();
    const location = data.get("location").trim();
    const description = data.get("description").trim();

    if (!name || !contact || !location || !description) {
      setMessage("Please complete all required fields using valid text.");
      return;
    }

    const subject = `Interior design enquiry: ${data.get("service")}`;

    const body = [
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Location: ${location}`,
      `Service: ${data.get("service")}`,
      `Budget: ${data.get("budget") || "Not specified"}`,
      "",
      "Project description:",
      description,
    ].join("\n");

    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setMessage(
      "Your email app has been requested. Review the draft and press Send there. This website has not confirmed delivery."
    );
  }

  function openWhatsApp(event) {
    const form = event.currentTarget.form;
    const service = new FormData(form).get("service");

    const text = `Hello Makao Interiors, I would like to discuss ${service.toLowerCase()} for my space.`;

    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>Tell us about your space</h3>
        <p>A few details are a good place to begin.</p>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Full name"
            maxLength="100"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="contact">Email or phone *</label>
          <input
            id="contact"
            name="contact"
            placeholder="How can we reach you?"
            maxLength="150"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="location">Project location *</label>
          <input
            id="location"
            name="location"
            placeholder="Town or area"
            maxLength="150"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="service">Service needed *</label>
          <select id="service" name="service" required>
            {services.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="budget">Estimated budget — optional</label>
        <select id="budget" name="budget" defaultValue="">
          <option value="">Select a range in KES</option>
          <option>Below KES 100,000</option>
          <option>KES 100,000–300,000</option>
          <option>KES 300,000–1,000,000</option>
          <option>Above KES 1,000,000</option>
          <option>I would like guidance</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="description">Your project *</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="What would you like to change about your space?"
          maxLength="3000"
          required
        />
      </div>

      <p className="form-note">
        This requests a conversation and does not confirm a booking.
        Your details are used to respond to your enquiry. This demo does
        not store form entries.
      </p>

      <button className="button" type="submit">
        Prepare email enquiry <span aria-hidden="true">↗</span>
      </button>

      {whatsappConfigured && (
        <button
          className="button button-outline whatsapp-form-button"
          type="button"
          onClick={openWhatsApp}
        >
          Enquire on WhatsApp
        </button>
      )}

      {!emailConfigured && (
        <p className="notice">
          Demo mode: add the designer’s email in business.js to enable
          email enquiries. Direct form delivery is not connected.
        </p>
      )}

      <p className="form-status" role="status">
        {message}
      </p>
    </form>
  );
}