import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const itemCardLike = `item__heart ${isOwn ? "" : "item__heart_hidden"} ${
    isLiked ? "item__heart_liked" : ""
  } `;

  return (
    <li className="item__card">
      <h2 className="item__card_name">{item.name}</h2>
      <button className={itemCardLike} type="button" onClick={handleLike} />
      <img
        onClick={handleCardClick}
        className="item__card_image"
        src={item.imageUrl}
        alt={item.name}
        onCardLike={onCardLike}
      />
    </li>
  );
}

export default ItemCard;
