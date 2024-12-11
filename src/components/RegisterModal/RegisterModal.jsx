import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";
import "./RegisterModal.css";

const RegisterModal = ({
  isOpen,
  closeActiveModal,
  openLoginModal,
  onSignUp,
  buttonClass = "modal__submit",
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(
      data.email.trim() !== "" &&
        data.password.trim() !== "" &&
        data.name.trim() !== "" &&
        data.avatar.trim() !== ""
    );
  }, [data]);

  // Reset input fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      buttonClass={`${buttonClass} ${
        isButtonActive ? "modal__submit_complete" : ""
      }`}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleInputChange}
          required
        />
      </label>
      <div className="modal__buttons-container">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_complete" : ""
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__login-button"
          onClick={openLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
