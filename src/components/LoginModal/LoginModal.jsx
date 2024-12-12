import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({
  closeActiveModal,
  isOpen,
  onLogIn,
  openRegisterModal,
  buttonClass = "modal__submit",
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(data.email.trim() !== "" && data.password.trim() !== "");
  }, [data.email, data.password]);

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(data);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_complete" : ""
      }`}
    >
      <button
        className="modal__close"
        type="button"
        onClick={closeActiveModal}
      />

      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_complete" : ""
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          className="modal__signup-button"
          onClick={openRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
