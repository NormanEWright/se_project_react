import React from 'react';
import "../blocks/WeatherCard.css";
import '../blocks/card.css';
import { day, night } from "../utils/constants";

function WeatherCard(props) {

  let background;
  let timeOfDay;
  let weatherCondition = String(props.weather).toLowerCase();

  if (props.isDay === 1) {
    timeOfDay = day;
  } else {
    timeOfDay = night;
  }

  // Set the background image based on weather condition
  if (weatherCondition.includes("cloud")) {
    background = timeOfDay.cloudy;
  } else if (weatherCondition.includes("fog")) {
    background = timeOfDay.fog;
  } else if ((weatherCondition.includes("rain")) || (weatherCondition.includes("sleet"))) {
    background = timeOfDay.rain;
  } else if (weatherCondition.includes("snow")) {
    background = timeOfDay.snow;
  } else if (weatherCondition.includes("storm")) {
    background = timeOfDay.storm;
  } else if (weatherCondition.includes("sun")) {
    background = timeOfDay.sunny;
  }

  return (
    <section 
      className='weather__card'
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <h2 className='weather__temp'>{props.temp} °F</h2>
    </section>
  )
}

export default WeatherCard;