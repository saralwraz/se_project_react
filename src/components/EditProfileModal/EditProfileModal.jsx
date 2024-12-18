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
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errors, setErrors] = useState({ name: "", avatarUrl: "" });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: "",
      avatarUrl: "",
    };

    if (!name) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!avatarUrl) {
      errors.avatarUrl = "Image URL is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(avatarUrl)) {
      errors.avatarUrl = "Invalid URL format.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      onEditProfileSubmit({ name, avatarUrl });
    }
  }

  const handleNameChange = (e) => setName(e.target.value || "");
  const handleAvatarChange = (e) => setAvatarUrl(e.target.value || "");

  useEffect(() => {
    if (name.trim() && avatarUrl.trim()) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [name, avatarUrl]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
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
          placeholder={avatarUrl}
          value={avatarUrl}
          onChange={handleAvatarChange}
          required
        />
        {errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
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
