# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.



# Makao Interiors

A responsive interior design demonstration website built with
React, Vite, and plain CSS.

## Features

- Responsive navigation and mobile menu.
- About and services sections.
- Project gallery with category filters.
- Project details displayed in an accessible dialog.
- Frequently asked questions.
- Enquiry form that prepares an email.
- Optional WhatsApp enquiry links.
- Mobile layouts and reduced-motion support.

## Install

npm install

## Run locally

npm run dev

Open the address printed in the terminal.

## Production build

npm run build

Vite generates the production website in the dist folder.

## Preview the production build

npm run preview

## Edit business information

Update src/data/business.js to change:

- Business name and tagline.
- Email and phone.
- WhatsApp number.
- Service areas.
- Services.
- Projects.
- FAQ answers.

The WhatsApp number must include the country code and contain
digits only.

Some visible branding text also appears in Navbar.jsx,
Footer.jsx, App.jsx, and index.html.

## Enquiries

The form currently prepares an email using the visitor's email app.

It does not send messages directly or confirm delivery.
The visitor must press Send in their email app.

Add the designer's email in src/data/business.js to enable it.

WhatsApp links appear after a valid number is configured.
The WhatsApp form button includes the selected service only;
it does not send all form fields.

## Demo content

Project descriptions are illustrative concepts.
Photographs are stock images, not completed client work.
FAQ answers and business content require designer approval.

The demo includes a noindex directive in index.html.
Remove it only when the production website is approved.

## Photography

Images are hosted on Unsplash:

https://images.unsplash.com/photo-1600210492486-724fe5c67fb0

https://images.unsplash.com/photo-1600607687920-4e2a09cf159d

https://images.unsplash.com/photo-1497366811353-6870744d04b2

Review the applicable image licence and any additional permissions
before commercial launch:

https://unsplash.com/license

## Before launch

- Replace sample content with approved business information.
- Replace stock concepts with approved project photographs.
- Confirm image permissions.
- Add and test real contact details.
- Confirm services, consultation policies, and service areas.
- Connect direct form delivery if included in the agreed scope.
- Review the privacy notice for the final enquiry service.
- Test mobile navigation, project filters, and dialog controls.
- Check keyboard navigation.
- Run the production build.
- Agree on domain, hosting, ownership, and maintenance.