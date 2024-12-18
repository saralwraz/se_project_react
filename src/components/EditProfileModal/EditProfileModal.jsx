import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../ModalWithForm/ModalWithForm.css";

const EditProfileModal = ({
  closeActiveModal,
  isOpen,
  onEditProfileSubmit,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setavatar] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errors, setErrors] = useState({ name: "", avatar: "" });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: "",
      avatar: "",
    };

    if (!name) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!avatar) {
      errors.avatar = "Image URL is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(avatar)) {
      errors.avatar = "Invalid URL format.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      onEditProfileSubmit({ name, avatar });
    }
  }

  const handleNameChange = (e) => setName(e.target.value || "");
  const handleAvatarChange = (e) => setavatar(e.target.value || "");

  useEffect(() => {
    if (name.trim() && avatar.trim()) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [name, avatar]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setavatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_active" : ""
      }`}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      name={"editprofile"}
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder={name}
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder={avatar}
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      <button
        type="submit"
        className={`modal__submit ${
          isButtonActive ? "modal__submit_active" : ""
        }`}
      >
        Save Changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
