import React from 'react';

function NewGarmentForm() {

  const radioButtons = document.querySelectorAll(".popup__form-radio");

  function checked() {
    radioButtons.forEach((item) => {
      if (item.checked) {
        item.closest(".popup__form-radio-label").style.opacity = 1;
      } else {
        item.closest(".popup__form-radio-label").style.opacity = 0.5;
      }
    })
  }

  return (
    <>
      <label for="name" className="popup__form-label">Name<br />
        <input type="text" id="name" className="popup__form-input" placeholder="Name" required />
      </label>
      <label for="link" className="popup__form-label">Image<br />
        <input type="url" id="link" className="popup__form-input" placeholder="Image URL" required />
      </label>
      <div className="popup__form-radio-section">
        <h4 className="popup__form-radio-heading">Select the weather type:</h4>
        <ul className="popup__form-radio-list">
          <li className="popup__form-radio-element">
            <label for="hot" className="popup__form-radio-label">
              <input type="radio" id="hot" name="weather" value="hot" className="popup__form-radio" 
              onChange={checked} />
              <span>Hot</span>
            </label>
          </li>
          <li className="popup__form-radio-element">
            <label for="" className="popup__form-radio-label">
              <input type="radio" id="warm" name="weather" value="warm" className="popup__form-radio" onChange={checked} />
              <span>Warm</span>
            </label>
          </li>
          <li className="popup__form-radio-element">
            <label for="" className="popup__form-radio-label">
              <input type="radio" id="cold" name="weather" value="cold" className="popup__form-radio" onChange={checked} />
              <span>Cold</span>
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NewGarmentForm;