import React, { useState } from "react";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Call the onAddPlaceSubmit function from props
    props.onAddPlaceSubmit({
      name: placeName,
      link: placeLink,
      // Add other form values as needed
    });
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="form"
          name={props.name}
          onSubmit={handleSubmit} // Attach handleSubmit to the form's onSubmit event
        >
          <fieldset className="form__fieldset">
            <input
              type="text"
              className="form__input"
              placeholder="Place Name"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              required
            />
            <input
              type="url"
              className="form__input"
              placeholder="Image Link"
              value={placeLink}
              onChange={(e) => setPlaceLink(e.target.value)}
              required 
            />
            {/* Add other input fields as needed */}
          </fieldset>
          <button type="submit" className="form__submit-button">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div> 
  );
}

export default AddPlacePopup;
