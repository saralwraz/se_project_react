import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";

function WeatherCard() {
  return (
    <section className="weather__card">
      <p className="weather__temp">75 &deg;</p>
      <image src={sunny} alt="sunny" className="weather__card_image" />
    </section>
  );
}

export default WeatherCard;
