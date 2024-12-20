import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems = [],
  onCardClick,
  handleAddClick,
  handleCardLike,
}) {
  const currentUserId = useContext(CurrentUserContext)?._id;
  console.log("Current user ID:", currentUserId);
  console.log("All clothing items:", clothingItems);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUserId
  );
  console.log("Filtered user items:", userItems);

  return (
    <div className="clothes__section">
      <div className="clothes__section_header">
        <p>Your Items</p>
        <button className="clothes__section_button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="item__cards_list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              handleCardLike={handleCardLike}
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
