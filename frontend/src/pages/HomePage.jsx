import { useState } from "react";
import LocationButton from "../components/LocationButton.jsx";
import LocationSearchForm from "../components/LocationSearchForm.jsx";
import RadiusSelector from "../components/RadiusSelector.jsx";
import WaterSourceList from "../components/WaterSourceList.jsx";
import useGeolocation from "../hooks/useGeolocation.js";
import {
  getNearbyWaterSources,
  searchWaterSources,
} from "../services/waterSourceApi.js";

function HomePage() {
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [radius, setRadius] = useState(5);
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchMethod, setSearchMethod] = useState("manual");
  const {
    coordinates,
    loading: locationLoading,
    error: locationError,
    requestLocation,
  } = useGeolocation();

  const handleUseLocation = () => {
    setSearchMethod("location");
    requestLocation();
  };

  const handleVillageChange = (value) => {
    setSearchMethod("manual");
    setVillage(value);
  };

  const handlePincodeChange = (value) => {
    setSearchMethod("manual");
    setPincode(value);
  };

  const handleFindWater = async () => {
    const cleanVillage = village.trim();
    const cleanPincode = pincode.trim();

    if (searchMethod === "location" && !coordinates) {
      setSearchError("Please use your location first.");
      return;
    }

    if (searchMethod === "manual" && !cleanVillage) {
      setSearchError("Please enter a village name.");
      return;
    }

    if (searchMethod === "manual" && !/^\d{6}$/.test(cleanPincode)) {
      setSearchError("Pincode must contain 6 digits.");
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError("");

      const data =
        searchMethod === "location"
          ? await getNearbyWaterSources(
              coordinates.lat,
              coordinates.lng,
              radius
            )
          : await searchWaterSources(cleanVillage, cleanPincode, radius);

      setResults(data.waterSources);
      setSearchedLocation(data.searchedLocation);
      setHasSearched(true);
    } catch (error) {
      setResults([]);
      setSearchedLocation("");
      setHasSearched(true);
      setSearchError(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

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
          <p>Use your current location or enter a village and pincode.</p>
          <LocationButton
            onClick={handleUseLocation}
            loading={locationLoading}
            disabled={searchLoading}
            success={searchMethod === "location" && Boolean(coordinates)}
            error={locationError}
          />
          <p className="location-divider">or search manually</p>
          <LocationSearchForm
            village={village}
            setVillage={handleVillageChange}
            pincode={pincode}
            setPincode={handlePincodeChange}
            disabled={searchLoading || locationLoading}
          />
        </div>

        <div className="form-section">
          <h3>Radius</h3>
          <RadiusSelector radius={radius} setRadius={setRadius} />
        </div>

        <div className="button-section">
          <button
            type="button"
            onClick={handleFindWater}
            disabled={searchLoading}
          >
            {searchLoading ? "Finding Water..." : "Find Water"}
          </button>
          {searchError && (
            <p className="status-message error-message" role="alert">
              {searchError}
            </p>
          )}
        </div>
      </section>

      <section className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading">Results</h2>
        {!hasSearched && <p>Nearby water sources will appear here.</p>}

        {searchedLocation && (
          <p className="searched-location">Showing results near {searchedLocation}</p>
        )}

        {hasSearched && !searchLoading && results.length === 0 && !searchError && (
          <p>No water sources found within this radius.</p>
        )}

        {results.length > 0 && <WaterSourceList waterSources={results} />}

        {hasSearched && (
          <p className="attribution">© OpenStreetMap contributors</p>
        )}
      </section>
    </main>
  );
}

export default HomePage;
