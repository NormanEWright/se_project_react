import React from "react";
import "../blocks/popup.css";
import closeIcon from "../images/ItemModal/close-button.svg";
import "../blocks/item-modal.css";

function ItemModal(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__item-wrapper">
        <img className="popup__item-image" src={props.link} alt={props.title} />
        <p className="popup__item-title" >{props.title}</p>
        <p className="popup__item-description" >Weather: {props.description}</p>
        <button type="button" className="popup__close-button" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="Close popup button" />
        </button>
      </div>
    </div>
  )
}

export default ItemModal;