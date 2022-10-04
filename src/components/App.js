import React, { useState, useEffect } from 'react';
import '../blocks/App.css';
import Header from './Header';
import Main from './Main';
import WeatherCard from './WeatherCard';
import ItemCard from './ItemCard';
import ModalWithForm from './ModalWithForm';
import NewGarmentForm from './NewGarmentForm';
import Footer from './Footer';
import { defaultClothingItems, currentDate } from '../utils/constants';
import ItemModal from './ItemModal';
import WeatherApi, { weatherTemp } from '../utils/WeatherApi';

function App() {
  const [temp, setTemperature] = useState();
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState("Kingston");
  const [isDay, setIsDay] = useState(1);

  const api = new WeatherApi();


  useEffect(() => {
    api
      .getCurrentWeather("18.0, -76.8")
      .then((currentWeather) => {
        console.log(weather);
        console.log(currentWeather.current.condition.text);
        setWeather(currentWeather.current.condition.text);
        setLocation(`${currentWeather.location.name}`);
        setIsDay(currentWeather.current.is_day);
        setTemperature(Math.round(currentWeather.current.temp_f));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Open Popup
  function handlePopupOpen(name) {
    const popup = document.querySelector(`.popup_type_${name}`);
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscClose);

  }

  // Close popup on Esc
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      document.querySelector(".popup_opened").classList.remove("popup_opened");
      document.removeEventListener("keydown", handleEscClose);
    }
  }

  // Close Popup
  function handlePopupClose(evt) {
    const popup = evt.target.closest(".popup");
    console.dir(popup);
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscClose);
  }

  // Handle ItemPopup open
  function handleItemPopupOpen(name, data) {
    const itemPopup = document.querySelector(`.popup_type_${name}`);
    itemPopup.classList.add("popup_opened");
    itemPopup.querySelector(".popup__item-image").src = data.link;
    itemPopup.querySelector(".popup__item-title").textContent = data.title;
    itemPopup.querySelector(".popup__item-description").textContent = `Weather: ${data.description}`;
    itemPopup.addEventListener("mousedown", handlePopupClose);
    document.addEventListener("keydown", handleEscClose);
  }

  return (
    <div className='App'>
      <Header
        username="Norman Wright"
        openPopup={handlePopupOpen}
        popupName="add"
        currentDate={currentDate}
        currentLocation={location}
      />
      <Main 
        temp={temp} 
      >
        <WeatherCard
          id="weather"
          key="weatherCard"
          temp={temp}
          weather={weather}
          isDay={isDay}
        />
        <ItemCard
          key="itemCard"
          clothingList={defaultClothingItems}
          currentWeather={weatherTemp(temp)}
          openPopup={handleItemPopupOpen}
        />
      </Main>
      <ModalWithForm
        title="New garment"
        id="addGarment"
        name="add"
        buttonText="Add garment"
        onClose={handlePopupClose}
      >
        <NewGarmentForm />
      </ModalWithForm>
      <ItemModal
        name="item"
        onClose={handlePopupClose}
      />
      <Footer />
    </div>
  );
}

export default App;
