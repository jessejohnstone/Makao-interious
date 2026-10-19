import { useEffect, useRef, useState } from "react";
import { projects } from "../data/business";

const filters = ["All", "Residential", "Commercial", "Styling"];

export default function ProjectGallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    if (!selected) return;

    const dialog = dialogRef.current;

    if (!dialog.open) {
      dialog.showModal();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  function openProject(project, event) {
    triggerRef.current = event.currentTarget;
    setSelected(project);
  }

  function closeProject() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="project-filters" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "filter active" : "filter"}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visibleProjects.map((project) => (
          <button
            key={project.id}
            className="project-card"
            type="button"
            onClick={(event) => openProject(project, event)}
            aria-label={`View ${project.title}, demonstration concept`}
          >
            <div className="project-image">
              <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                width="1200"
                height="900"
              />

              <span className="project-badge">Demo concept</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="project-information">
              <span className="eyebrow">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={() => {
          setSelected(null);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeProject();
          }
        }}
      >
        {selected && (
          <article>
            <button
              className="dialog-close"
              type="button"
              autoFocus
              onClick={closeProject}
              aria-label="Close project"
            >
              ✕
            </button>

            <img src={selected.image} alt={selected.alt} />

            <div className="dialog-content">
              <span className="eyebrow">
                {selected.category} · Demonstration concept
              </span>

              <h2 id="project-dialog-title">{selected.title}</h2>

              <h3>The brief</h3>
              <p>{selected.brief}</p>

              <h3>The approach</h3>
              <p>{selected.solution}</p>

              <p className="notice">
                Stock photograph used for inspiration. This is not a completed
                Makao Interiors client project.
              </p>

              <a
                className="button"
                href="#contact"
                onClick={closeProject}
              >
                Discuss your space <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}