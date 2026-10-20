export default function BackToTop() {
  function goToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Move keyboard focus back to the start of the website.
    document.querySelector(".brand")?.focus({
      preventScroll: true,
    });

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  return (
    <button
      className="back-to-top"
      type="button"
      onClick={goToTop}
      aria-label="Back to top"
      title="Back to top"
      data-testid="back-to-top"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}