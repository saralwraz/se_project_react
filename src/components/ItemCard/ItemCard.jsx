import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div key={item._id} className="item__card">
      <h2 className="item__card_name">{item.name}</h2>
      <img className="item__card_image" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
