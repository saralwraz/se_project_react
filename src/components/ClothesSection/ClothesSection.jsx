import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section_header">
        <p>Your Items</p>
        <button className="clothes__section_button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="item__cards_list">
        {clothingItems && clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p>No clothing items found.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
