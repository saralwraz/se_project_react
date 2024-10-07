import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherData = {} }) {
  const { isDay = true, condition = "Unknown", temp = {} } = weatherData;
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const weatherOption =
    weatherOptions.find(
      (option) => option.day === isDay && option.condition === condition
    ) || defaultWeatherOptions[isDay ? "day" : "night"];

  const displayTemp = currentTempUnit === "F" ? temp.F : temp.C;

  return (
    <section className="weather__card">
      {displayTemp && (
        <p className="weather__temp">
          {displayTemp} &deg; {currentTempUnit}
        </p>
      )}
      <img
        src={weatherOption.url}
        alt={`Card showing ${isDay ? "day" : "night"} time ${
          weatherOption.condition
        } weather`}
        className="weather__card_image"
      />
    </section>
  );
}

export default WeatherCard;
