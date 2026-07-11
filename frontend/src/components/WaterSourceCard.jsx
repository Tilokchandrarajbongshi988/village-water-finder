const formatLabel = (value) => {
  if (!value) return "Not available";

  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function WaterSourceCard({ waterSource }) {
  const coordinates = waterSource?.location?.coordinates;
  const hasCoordinates =
    Array.isArray(coordinates) &&
    coordinates.length === 2 &&
    coordinates.every((coordinate) => Number.isFinite(coordinate));

  const directionsUrl = hasCoordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`
    : null;

  const distance = Number.isFinite(waterSource?.distanceKm)
    ? `${waterSource.distanceKm.toFixed(2)} km away`
    : "Distance not available";

  return (
    <article className="water-source-card">
      <div className="card-heading">
        <div>
          <h3>{waterSource?.name || "Unnamed water source"}</h3>
          <p className="source-type">{formatLabel(waterSource?.type)}</p>
        </div>
        <span className={`status-label status-${waterSource?.status || "unknown"}`}>
          {formatLabel(waterSource?.status)}
        </span>
      </div>

      <dl className="source-details">
        {waterSource?.village && (
          <div>
            <dt>Village</dt>
            <dd>{waterSource.village}</dd>
          </div>
        )}
        {waterSource?.pincode && (
          <div>
            <dt>Pincode</dt>
            <dd>{waterSource.pincode}</dd>
          </div>
        )}
      </dl>

      <div className="card-footer">
        <p className="distance">{distance}</p>
        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Directions
          </a>
        )}
      </div>
    </article>
  );
}

export default WaterSourceCard;
