import { useState } from "react";
import LocationButton from "../components/LocationButton.jsx";
import RadiusSelector from "../components/RadiusSelector.jsx";
import useGeolocation from "../hooks/useGeolocation.js";

function HomePage() {
  const [radius, setRadius] = useState(5);
  const { coordinates, loading, error, requestLocation } = useGeolocation();

  return (
    <main className="home-page">
      <header className="hero-section">
        <p className="eyebrow">Nearby drinking water</p>
        <h1>Water Finder</h1>
        <p className="description">
          Find available water sources near your current location.
        </p>
      </header>

      <section className="finder-card" aria-labelledby="finder-heading">
        <h2 id="finder-heading">Find water near you</h2>

        <div className="form-section">
          <h3>Location</h3>
          <p>Allow location access to search near you.</p>
          <LocationButton
            onClick={requestLocation}
            loading={loading}
            success={Boolean(coordinates)}
            error={error}
          />
        </div>

        <div className="form-section">
          <h3>Radius</h3>
          <RadiusSelector radius={radius} setRadius={setRadius} />
        </div>

        <div className="button-section">
          <button type="button">Find Water</button>
        </div>
      </section>

      <section className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading">Results</h2>
        <p>Nearby water sources will appear here.</p>
      </section>
    </main>
  );
}

export default HomePage;
