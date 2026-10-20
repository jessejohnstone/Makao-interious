import { useEffect, useRef, useState } from "react";
import ProjectImage from "./ProjectImage";
import { projects } from "../data/business";

const filters = [
  "All",
  "Residential",
  "Commercial",
  "Styling",
];

const categoryServices = {
  Residential: "Residential interiors",
  Commercial: "Commercial spaces",
  Styling: "Styling & decoration",
};

export default function ProjectGallery({ onSelectService }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const moveToContactRef = useRef(false);

  const query = search.trim().toLowerCase();

  const visibleProjects = projects.filter((project) => {
    const matchesCategory =
      filter === "All" || project.category === filter;

    const searchableText = [
      project.title,
      project.category,
      project.subtitle,
      project.brief,
      project.solution,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });

  const selectedIndex = visibleProjects.findIndex(
    (project) => project.id === selectedId
  );

  const selected = visibleProjects[selectedIndex];
  const isOpen = selectedId !== null;
  const canNavigate = visibleProjects.length > 1;

  // Open the viewer and prevent the background from scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;

    if (!dialog.open) {
      dialog.showModal();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function openProject(project, event) {
    triggerRef.current = event.currentTarget;
    moveToContactRef.current = false;
    setSelectedId(project.id);
  }

  function closeProject() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setSelectedId(null);

    if (moveToContactRef.current) {
      moveToContactRef.current = false;

      requestAnimationFrame(() => {
        window.location.hash = "contact";

        document.getElementById("name")?.focus({
          preventScroll: true,
        });
      });

      return;
    }

    triggerRef.current?.focus({
      preventScroll: true,
    });
  }

  function navigateProject(direction) {
    if (!canNavigate || selectedIndex < 0) return;

    const nextIndex =
      (selectedIndex + direction + visibleProjects.length) %
      visibleProjects.length;

    setSelectedId(visibleProjects[nextIndex].id);

    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  }

  function handleViewerKeyDown(event) {
    // Preserve normal keyboard behaviour within controls.
    if (
      event.target.closest(
        "button, a, input, textarea, select"
      )
    ) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigateProject(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigateProject(-1);
    }
  }

  function discussProject() {
    if (!selected) return;

    const service = categoryServices[selected.category];

    if (service) {
      onSelectService?.(service);
    }

    moveToContactRef.current = true;
    closeProject();
  }

  function clearSearch() {
    setSearch("");
    document.getElementById("project-search")?.focus();
  }

  function resetFilters() {
    setSearch("");
    setFilter("All");
    document.getElementById("project-search")?.focus();
  }

  return (
    <>
      {/* PROJECT SEARCH */}
      <div className="project-search">
        <label htmlFor="project-search">
          Find inspiration
        </label>

        <div className="project-search-controls">
          <input
            id="project-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search living rooms, offices, textures…"
            aria-controls="project-results"
            maxLength={100}
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects by category"
      >
        {filters.map((item) => (
          <button
            key={item}
            className={
              filter === item ? "filter active" : "filter"
            }
            type="button"
            aria-pressed={filter === item}
            aria-controls="project-results"
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* RESULTS COUNT */}
      <p className="small-muted" role="status" aria-atomic="true">
        Showing {visibleProjects.length}{" "}
        {visibleProjects.length === 1 ? "concept" : "concepts"}
      </p>

      <div id="project-results">
        {/* EMPTY RESULTS */}
        {visibleProjects.length === 0 && (
          <div className="project-empty">
            <h3>No matching concepts</h3>

            <p>
              Try another search or reset the filters to explore
              all concepts.
            </p>

            <button
              className="button button-outline"
              type="button"
              onClick={resetFilters}
            >
              Show all concepts
            </button>
          </div>
        )}

        {/* PROJECT CARDS */}
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <button
              key={project.id}
              className="project-card"
              type="button"
              aria-haspopup="dialog"
              aria-label={`View ${project.title}`}
              onClick={(event) => openProject(project, event)}
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  width="1200"
                  height="900"
                />

                <span className="project-badge">
                  Stock image
                </span>

                <span
                  className="project-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <div className="project-information">
                <span className="eyebrow">
                  {project.category}
                </span>

                <h3>{project.title}</h3>

                <p>{project.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* PROJECT VIEWER */}
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={handleDialogClose}
        onKeyDown={handleViewerKeyDown}
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

            <ProjectImage
              key={selected.id}
              src={selected.image}
              alt={selected.alt}
              loading="eager"
            />

            <div className="dialog-content">
              {/* PREVIOUS AND NEXT CONTROLS */}
              <div className="viewer-navigation">
                <button
                  className="viewer-nav-button"
                  type="button"
                  disabled={!canNavigate}
                  onClick={() => navigateProject(-1)}
                  aria-label="View previous concept"
                >
                  ← Previous
                </button>

                <span
                  className="viewer-counter"
                  role="status"
                  aria-atomic="true"
                >
                  {selectedIndex + 1} of{" "}
                  {visibleProjects.length}

                  <span className="sr-only">
                    {`: ${selected.title}`}
                  </span>
                </span>

                <button
                  className="viewer-nav-button"
                  type="button"
                  disabled={!canNavigate}
                  onClick={() => navigateProject(1)}
                  aria-label="View next concept"
                >
                  Next →
                </button>
              </div>

              {/* PROJECT DETAILS */}
              <span className="eyebrow">
                {selected.category}
              </span>

              <h2 id="project-dialog-title">
                {selected.title}
              </h2>

              <h3>The brief</h3>
              <p>{selected.brief}</p>

              <h3>The approach</h3>
              <p>{selected.solution}</p>

              <p className="notice">
                Stock photograph used for inspiration.
                This is not a completed Makao Interiors
                client project.
              </p>

              <button
                className="button"
                type="button"
                onClick={discussProject}
              >
                Discuss a similar project
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}