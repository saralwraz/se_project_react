import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="main__cards">
        <p className="main__weather_text">
          Today is 75 &deg; F / You may want to wear:
        </p>
      </section>
    </main>
  );
}

export default Main;
