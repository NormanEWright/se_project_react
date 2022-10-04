import React from 'react';
import '../blocks/card.css';

class ItemCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ul className='card__list'>
          {this.props.clothingList.map((card) => {

            if (card.weather === this.props.currentWeather) {
              return (
                <li
                  key={card._id}
                  className="card"
                  style={{ backgroundImage: `url(${card.link})` }}
                  onClick={() => {
                    this.props.openPopup("item", {
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
            return;
          })}
        </ul>
      </>
    )
  }
}

export default ItemCard;