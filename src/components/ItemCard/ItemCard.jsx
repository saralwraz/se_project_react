import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="item__card">
      <h2 className="item__card_name">{item.name}</h2>
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
