import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData = {} }) {
  const { isDay = true, condition = "Unknown", temp = {} } = weatherData;

  const weatherOption =
    weatherOptions.find(
      (option) => option.day === isDay && option.condition === condition
    ) || defaultWeatherOptions[isDay ? "day" : "night"];

  return (
    <section className="weather__card">
      {temp.F && <p className="weather__temp">{temp.F} &deg; F</p>}
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
