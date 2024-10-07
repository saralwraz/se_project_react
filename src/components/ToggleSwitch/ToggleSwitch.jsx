import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );
  return (
    <label className="toggle__switch">
      <input
        className="toggle__switch_box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider_F"
            : "switch__slider switch__slider_C"
        }
      ></span>
      <p
        className={`switch__temp_F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp_C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
