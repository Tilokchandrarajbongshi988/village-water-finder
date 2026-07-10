function HomePage() {
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
          <p>Your location will be shown here.</p>
        </div>

        <div className="form-section">
          <h3>Radius</h3>
          <p>Choose how far you want to search.</p>
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
