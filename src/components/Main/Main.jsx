// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import "./main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const displayTemp =
    currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="main__cards">
        <p className="main__weather_text">
          Today is {displayTemp} &deg; {currentTempUnit} / You may want to wear:
        </p>
        <ul className="item__cards_list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
