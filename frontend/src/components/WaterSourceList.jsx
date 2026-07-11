import WaterSourceCard from "./WaterSourceCard.jsx";

function WaterSourceList({ waterSources }) {
  return (
    <div className="water-source-list">
      {waterSources.map((waterSource, index) => (
        <WaterSourceCard
          key={waterSource._id || `${waterSource.name}-${index}`}
          waterSource={waterSource}
        />
      ))}
    </div>
  );
}

export default WaterSourceList;
