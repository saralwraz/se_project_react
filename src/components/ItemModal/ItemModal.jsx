import "./ItemModal.css";

function ItemModal({ activeModal, closeActiveModal, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__form modal__content_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete">Delete item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
