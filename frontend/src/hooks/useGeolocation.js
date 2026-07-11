import { useState } from "react";

function useGeolocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by this browser.");
      return;
    }

    setCoordinates(null);
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (locationError) => {
        const messages = {
          1: "Location permission was denied.",
          2: "Your location is currently unavailable.",
          3: "The location request timed out.",
        };

        setCoordinates(null);
        setError(messages[locationError.code] || "Unable to get your location.");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  return { coordinates, loading, error, requestLocation };
}

export default useGeolocation;
