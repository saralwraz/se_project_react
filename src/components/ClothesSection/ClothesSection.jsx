import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
}) {
  return (
    <div className="clothes__section">
      <div className="clothes__section_header">
        <p>Your Items</p>
        <button className="clothes__section_button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
