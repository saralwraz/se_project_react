import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="main__cards">
        <p className="main__weather_text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="item__cards_list">
          {defaultClothingItems.map((item) => {
            return (
              <div key={item._id}>
                <h2 className="item__card_name">{item.name}</h2>
                <img
                  className="item__card_image"
                  src={item.link}
                  alt={item.name}
                />
              </div>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
