function LocationSearchForm({
  village,
  setVillage,
  pincode,
  setPincode,
  disabled,
}) {
  return (
    <div className="location-fields">
      <div className="input-group">
        <label htmlFor="village">Village name</label>
        <input
          id="village"
          type="text"
          value={village}
          onChange={(event) => setVillage(event.target.value)}
          placeholder="For example, Ulsoor"
          disabled={disabled}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="pincode">Pincode</label>
        <input
          id="pincode"
          type="text"
          value={pincode}
          onChange={(event) => setPincode(event.target.value)}
          placeholder="For example, 560008"
          inputMode="numeric"
          maxLength="6"
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
}

export default LocationSearchForm;
