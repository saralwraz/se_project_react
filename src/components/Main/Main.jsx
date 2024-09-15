import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="main__cards">
        <p className="main__weather_text">
          Today is 75 &deg;F / You may want to wear:
        </p>
        <ul className="item__cards_list">
          {defaultClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
