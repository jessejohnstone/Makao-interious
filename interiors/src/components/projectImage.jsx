import { useState } from "react";

export default function ProjectImage({
  src,
  alt,
  width = 1200,
  height = 900,
  loading = "lazy",
}) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  function retryImage() {
    setLoaded(false);
    setFailed(false);
    setAttempt((previous) => previous + 1);
  }

  return (
    <div
      className={`image-loader ${loaded ? "is-loaded" : ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!failed && (
        <img
          key={`${src}-${attempt}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={() => {
            setLoaded(true);
            setFailed(false);
          }}
          onError={() => {
            setLoaded(false);
            setFailed(true);
          }}
        />
      )}

      {!loaded && !failed && (
        <span className="image-loading-label" aria-hidden="true">
          Loading image…
        </span>
      )}

      {failed && (
        <div className="image-error" role="status">
          <p>We couldn’t load this image.</p>

          <button type="button" onClick={retryImage}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}