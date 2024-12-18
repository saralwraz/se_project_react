import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ activeModal, closeActiveModal, card, handleDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser && currentUser?._id === card?.owner;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__form modal__content_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwner && (
            <button className="modal__delete" onClick={handleDelete}>
              Delete item
            </button>
          )}
          {!isOwner && (
            <p className="modal__error">You Cannot Delete This Item</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
