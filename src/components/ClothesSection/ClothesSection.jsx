import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { Cursor } from "mongoose";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
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
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
            />
          ))
        ) : (
          <p>No clothing items found.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
