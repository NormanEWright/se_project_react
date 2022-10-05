import React from 'react';
import '../blocks/card.css';

function ItemCard(props) {
  return (
    <>
      <ul className='card__list'>
        {props.clothingList.map((card) => {
          if (card.weather === props.currentWeather) {
            return (
              <li
                key={card._id}
                className="card"
                style={{ backgroundImage: `url(${card.link})` }}
                onClick={() => {
                  props.openPopup("item", {
                    link: card.link,
                    title: card.name,
                    description: card.weather,
                  })
                }}
              >
                <div>
                  <h3 className='card__title'>{card.name}</h3>
                </div>
              </li>
            );
          }
          return '';
        })}
      </ul>
    </>
  )
}

export default ItemCard;