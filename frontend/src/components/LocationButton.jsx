function LocationButton({ onClick, loading, disabled, success, error }) {
  return (
    <div className="location-control">
      <button type="button" onClick={onClick} disabled={loading || disabled}>
        {loading ? "Getting Location..." : "Use My Location"}
      </button>
      {success && <p className="status-message success-message">Location received successfully.</p>}
      {error && <p className="status-message error-message">{error}</p>}
    </div>
  );
}

export default LocationButton;
