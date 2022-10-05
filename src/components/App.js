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
import WeatherApi, { getWeatherTemperature } from '../utils/WeatherApi';

const api = new WeatherApi();

function App() {
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("Kingston");
  const [isDay, setIsDay] = useState(1);
  const [isNewGarmentModalOpen, setIsNewGarmentModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    api
      .getCurrentWeather("18.0, -76.8")
      .then((currentWeather) => {
        setWeather(currentWeather.current.condition.text);
        setLocation(`${currentWeather.location.name}`);
        setIsDay(currentWeather.current.is_day);
        setTemperature(Math.round(currentWeather.current.temp_f));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const useGlobalKeydownListener = (key, callback) => {
    useEffect(() => {
      const handleKeyDown = (evt) => {
        if (evt.key === key) {
          callback();
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      }
    }, []);
  }

  useGlobalKeydownListener('Escape', closeModals);

  const useOutsideClickListener = (tag, callback) => {
    useEffect(() => {
      const handleClick = (evt) => {
        if (evt.target.classList.contains(`${tag}`)) {
          callback();
        }
      }

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      }
    }, []);
  }

  useOutsideClickListener('popup', closeModals);
  
  function openNewGarmentModal() {
    setIsNewGarmentModalOpen(true);
  }

  function openPreviewModal() {
    setIsPreviewModalOpen(true);
  }

  // Handle ItemPopup open
  function handleItemPopupOpen(name, data) {
    console.log(data);
    const itemPopup = document.querySelector(`.popup_type_${name}`);
    const image = itemPopup.querySelector(".popup__item-image");
    const title = itemPopup.querySelector(".popup__item-title");
    const description = itemPopup.querySelector(".popup__item-description");
    image.src = data.link;
    title.textContent = data.title;
    description.textContent = `Weather: ${data.description}`;
    openPreviewModal();
  }

  function closeModals() {
    setIsNewGarmentModalOpen(false);
    setIsPreviewModalOpen(false);
  }

  return (
    <div className='App'>
      <Header
        username="Norman Wright"
        name="add"
        currentDate={currentDate}
        currentLocation={location}
        openPopup={openNewGarmentModal}
        onClose={closeModals}
      />
      <Main 
        temp={temperature} 
      >
        <WeatherCard
          id="weather"
          key="weatherCard"
          temp={temperature}
          weather={weather}
          isDay={isDay}
        />
        <ItemCard
          clothingList={defaultClothingItems}
          currentWeather={getWeatherTemperature(temperature)}
          openPopup={handleItemPopupOpen}
        />
      </Main>
      <ModalWithForm
        title="New garment"
        id="addGarment"
        name="add"
        buttonText="Add garment"
        isOpen={isNewGarmentModalOpen}
        onClose={closeModals}
      >
        <NewGarmentForm />
      </ModalWithForm>
      <ItemModal
        name="item"
        isOpen={isPreviewModalOpen}
        onClose={closeModals}
      />
      <Footer />
    </div>
  );
}

export default App;