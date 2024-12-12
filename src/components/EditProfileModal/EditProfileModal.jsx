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
  const [avatar, setAvatarUrl] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

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

  const resetForm = () => {
    setName("");

    setAvatarUrl("");

    setErrors({ name: "", avatarUrl: "" });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
  }

  const handleNameChange = (e) => setName(e.target.value || "");
  const handleAvatarChange = (e) => setAvatarUrl(e.target.value || "");

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
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      buttonClass={`modal__submit ${isButtonActive ? "modal__submit" : ""}`}
      isOpen={isOpen}
      onClose={closeActiveModal}
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
      </label>
      <button type="submit" className="modal__submit">
        Save Changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
