import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="main__cards">
        <p className="main__weather_text">
          Today is {weatherData.temp.F} / You may want to wear:
        </p>
        <ul className="item__cards_list">
          {defaultClothingItems
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
