import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  const isOwn = item.owner === currentUser?._id;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };

  const itemCardLike = `item__heart ${
    isOwn ? "item__heart_visible" : "item__heart_hidden"
  } ${isLiked ? "item__heart_liked" : ""}`;

  return (
    <li className="item__card">
      <h2 className="item__card_name">{item.name}</h2>
      <button className={itemCardLike} type="button" onClick={handleLike} />
      <img
        onClick={handleCardClick}
        className="item__card_image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
