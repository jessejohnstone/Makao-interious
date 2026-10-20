import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  function closeMenu() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event) {
      if (!headerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 761px)");

    function handleLayoutChange(event) {
      if (event.matches) {
        setOpen(false);
      }
    }

    desktopQuery.addEventListener("change", handleLayoutChange);

    return () => {
      desktopQuery.removeEventListener("change", handleLayoutChange);
    };
  }, []);

  useEffect(() => {
    let frameId = null;

    function updateActiveSection() {
      frameId = null;

      const marker =
        (headerRef.current?.getBoundingClientRect().height || 88) + 40;

      let currentSection = "home";

      for (const link of links) {
        const section = document.getElementById(link.id);

        if (
          section &&
          section.getBoundingClientRect().top <= marker
        ) {
          currentSection = link.id;
        }
      }

      // Keep Contact active when the visitor reaches the page bottom.
      const reachedBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;

      if (reachedBottom) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    }

    function scheduleUpdate() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    }

    updateActiveSection();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-layout">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Makao Interiors home"
        >
          <span className="brand-symbol" aria-hidden="true">
            M
          </span>

          <span>
            <strong>MAKAO</strong>
            <small>INTERIORS</small>
          </span>
        </a>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((previous) => !previous)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>

        <nav
          id="main-navigation"
          className={`navigation ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
          onBlur={(event) => {
            if (!headerRef.current?.contains(event.relatedTarget)) {
              closeMenu();
            }
          }}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={
                activeSection === link.id
                  ? "nav-link is-active"
                  : "nav-link"
              }
              aria-current={
                activeSection === link.id ? "location" : undefined
              }
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          <a
            className="button button-small"
            href="#contact"
            onClick={closeMenu}
          >
            Let’s talk
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}