import { useState } from "react";

const links = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container nav-layout">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-symbol" aria-hidden="true">
            M
          </span>

          <span>
            <strong>MAKAO</strong>
            <small>INTERIORS</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav
          id="main-navigation"
          className={`navigation ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMenu();
              document.querySelector(".menu-toggle")?.focus();
            }
          }}
        >
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}

          <a
            className="button button-small"
            href="#contact"
            onClick={closeMenu}
          >
            Let's talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}