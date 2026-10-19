import { business } from "../data/business";

export default function WhatsAppButton() {
  const number = business.whatsapp.replace(/\D/g, "");

  const isConfigured = /^[1-9]\d{7,14}$/.test(number);

  if (!isConfigured) {
    return null;
  }

  const message = encodeURIComponent(
    `Hello ${business.name}, I would like to discuss an interior design project.`
  );

  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact ${business.name} on WhatsApp, opens in a new tab`}
    >
      WhatsApp <span aria-hidden="true">↗</span>
    </a>
  );
}