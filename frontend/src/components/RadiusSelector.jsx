const radiusOptions = [2, 5, 10];

function RadiusSelector({ radius, setRadius }) {
  return (
    <div className="radius-selector">
      <label htmlFor="radius">Search radius</label>
      <select
        id="radius"
        value={radius}
        onChange={(event) => setRadius(Number(event.target.value))}
      >
        {radiusOptions.map((option) => (
          <option key={option} value={option}>
            {option} km
          </option>
        ))}
      </select>
    </div>
  );
}

export default RadiusSelector;
