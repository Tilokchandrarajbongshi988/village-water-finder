function LocationButton({ onClick, loading, success, error }) {
  return (
    <div className="location-control">
      <button type="button" onClick={onClick} disabled={loading}>
        {loading ? "Getting Location..." : "Use My Location"}
      </button>

      {success && (
        <p className="status-message success-message" role="status">
          Location received successfully.
        </p>
      )}

      {error && (
        <p className="status-message error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default LocationButton;
