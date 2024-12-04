import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import { register } from "../../utils/auth.js";
const RegisterModal = ({ isOpen, closeActiveModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password, name, avatar);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      onClose={closeActiveModal}
      isDisabled={!(name && avatar && email && password)}
    >
      <div className="modal__email">
        <label htmlFor="modal__label">Email</label>
        <input
          required
          id="modal__email-input"
          className="modal__input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="modal__password">
        <label htmlFor="modal__label">Password</label>
        <input
          required
          id="modal__password-input"
          className="modal__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="modal__name">
        <label htmlFor="modal__label">Name</label>
        <input
          required
          id="modal__name-input"
          className="modal__input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="modal__avatar">
        <label htmlFor="modal__label">Avatar</label>
        <input
          required
          id="modal__avatar-input"
          className="modal__avatar"
          type="url"
          placeholder="Avatar"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
