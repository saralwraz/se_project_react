import React, { useContext } from "react";
import "./main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { clothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTempUnitContext from "../../utils/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const displayTemp =
    currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="main__cards">
        <p className="main__weather_text">
          Today is {displayTemp} &deg; {currentTempUnit} / You may want to wear:
        </p>
        <ul className="item__cards_list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
