import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ closeActiveModal, isOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <ModalWithForm
      buttonText="Login"
      title="Login"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isDisabled={!(email && password)}
    >
      <div className="modal__field">
        <label htmlFor="modal__email-input" className="modal__label">
          Email
        </label>
        <input
          required
          id="modal__email-input"
          className="modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="modal__field">
        <label htmlFor="modal__password-input" className="modal__label">
          Password
        </label>
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
    </ModalWithForm>
  );
};

export default LoginModal;
