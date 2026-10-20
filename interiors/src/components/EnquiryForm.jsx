import { useEffect, useState } from "react";
import { business, services } from "../data/business";

const initialForm = {
  name: "",
  contact: "",
  location: "",
  service: "",
  budget: "",
  description: "",
};

export default function EnquiryForm({ serviceRequest }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const email = business.email.trim();
  const whatsapp = business.whatsapp.replace(/\D/g, "");

  const emailConfigured =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const whatsappConfigured =
    /^[1-9]\d{7,14}$/.test(whatsapp);

  // Select the service clicked in the services section.
  // Preserve the visitor's other form entries.
  useEffect(() => {
    if (!serviceRequest) return;

    setForm((previous) => ({
      ...previous,
      service: serviceRequest.service,
    }));

    setErrors((previous) => ({
      ...previous,
      service: "",
    }));

    setStatus(
      `${serviceRequest.service} selected. Complete your project details below.`
    );
  }, [serviceRequest]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setStatus("");
  }

  function validateForm() {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name =
        "Enter your name using at least two characters.";
    }

    const contact = form.contact.trim();

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

    const phoneDigits = contact.replace(/\D/g, "");

    const validPhone =
      /^[+\d\s()-]+$/.test(contact) &&
      phoneDigits.length >= 9 &&
      phoneDigits.length <= 15;

    if (!validEmail && !validPhone) {
      nextErrors.contact =
        "Enter a valid email address or phone number.";
    }

    if (form.location.trim().length < 2) {
      nextErrors.location =
        "Enter the town or area of your project.";
    }

    if (!form.service) {
      nextErrors.service =
        "Choose a service or select “Not sure yet”.";
    }

    if (form.description.trim().length < 20) {
      nextErrors.description =
        "Describe your project using at least 20 characters.";
    }

    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0];

    if (firstInvalidField) {
      setStatus("Please correct the highlighted fields.");

      document.getElementById(firstInvalidField)?.focus();

      return false;
    }

    return true;
  }

  function buildMessage() {
    return [
      `Hello ${business.name},`,
      "",
      "I would like to discuss an interior design project.",
      "",
      `Name: ${form.name.trim()}`,
      `Email or phone: ${form.contact.trim()}`,
      `Project location: ${form.location.trim()}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget || "Not specified"}`,
      "",
      "Project description:",
      form.description.trim(),
    ].join("\n");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const defaultChannel = emailConfigured
      ? "email"
      : "whatsapp";

    const channel =
      event.nativeEvent.submitter?.value || defaultChannel;

    const message = buildMessage();

    if (channel === "whatsapp") {
      if (!whatsappConfigured) {
        setStatus(
          "WhatsApp is not configured yet. No message has been sent."
        );
        return;
      }

      const url =
        `https://wa.me/${whatsapp}` +
        `?text=${encodeURIComponent(message)}`;

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

      setStatus(
        "WhatsApp has been requested in a new tab. Review your message and press Send there. If no tab opens, check your browser’s pop-up settings."
      );

      return;
    }

    if (!emailConfigured) {
      setStatus(
        "A receiving email is not configured yet. No enquiry has been sent."
      );
      return;
    }

    const subject = encodeURIComponent(
      `Interior design enquiry — ${form.service}`
    );

    window.location.href =
      `mailto:${email}?subject=${subject}` +
      `&body=${encodeURIComponent(message)}`;

    setStatus(
      "Your email app should open with a prepared message. Review it and send it to complete your enquiry. This website cannot confirm delivery."
    );
  }

  function fieldAccessibility(name) {
    return {
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name]
        ? `${name}-error`
        : undefined,
    };
  }

  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-heading">
        <h3>Tell us about your space</h3>

        <p>
          Share your ideas and choose how you would like
          to get in touch.
        </p>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name *</label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Full name"
            maxLength={100}
            required
            {...fieldAccessibility("name")}
          />

          {errors.name && (
            <p className="field-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="contact">
            Email or phone *
          </label>

          <input
            id="contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Email address or phone"
            maxLength={150}
            required
            {...fieldAccessibility("contact")}
          />

          {errors.contact && (
            <p className="field-error" id="contact-error">
              {errors.contact}
            </p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="location">
            Project location *
          </label>

          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="For example, Meru or Nairobi"
            maxLength={150}
            required
            {...fieldAccessibility("location")}
          />

          {errors.location && (
            <p className="field-error" id="location-error">
              {errors.location}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="service">
            Service needed *
          </label>

          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            {...fieldAccessibility("service")}
          >
            <option value="">Select a service</option>

            {services.map((service) => (
              <option
                key={service.number}
                value={service.title}
              >
                {service.title}
              </option>
            ))}

            <option value="Not sure yet">
              Not sure yet
            </option>
          </select>

          {errors.service && (
            <p className="field-error" id="service-error">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="budget">
          Estimated budget in KES — optional
        </label>

        <select
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
        >
          <option value="">Select a range</option>
          <option>Below KES 100,000</option>
          <option>KES 100,000–300,000</option>
          <option>KES 300,000–1,000,000</option>
          <option>Above KES 1,000,000</option>
          <option>I would like guidance</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="description">
          Your project *
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your space, what you want to change, and your preferred timeline."
          maxLength={1500}
          required
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description
              ? "description-hint description-error"
              : "description-hint"
          }
        />

        <div className="textarea-meta">
          <span id="description-hint">
            At least 20 characters
          </span>

          <span>
            {form.description.length}/1500
          </span>
        </div>

        {errors.description && (
          <p
            className="field-error"
            id="description-error"
          >
            {errors.description}
          </p>
        )}
      </div>

      <p className="form-note">
        This is a consultation enquiry, not a confirmed
        booking. This website does not store your entries.
        When you send, your details are shared through your
        chosen email or WhatsApp service so the designer
        can respond.
      </p>

      <div className="enquiry-actions">
        {emailConfigured && (
          <button
            className="button"
            type="submit"
            name="channel"
            value="email"
          >
            Prepare email
            <span aria-hidden="true">↗</span>
          </button>
        )}

        {whatsappConfigured && (
          <button
            className="button button-outline"
            type="submit"
            name="channel"
            value="whatsapp"
          >
            Continue to WhatsApp
            <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>

      {!emailConfigured && !whatsappConfigured && (
        <p className="notice">
          Enquiry options are currently unavailable. Please contact the
          studio directly for assistance.
        </p>
      )}

      <p
        className="form-status"
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}