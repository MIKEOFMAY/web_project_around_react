import React from 'react';

function ImagePopup(props) {
  console.log(props);
  return (
    <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button onClick={props.onClose} className="popup__close-icon hover-button" aria-label="Close"></button>
        <img src={`${props.isOpen ? props.isOpen.link : '#'}`} alt={`${props.isOpen ? props.isOpen.name : ''}`} className="popup__image" />
        <p className="popup__image-title">{`${props.isOpen ? props.isOpen.name : ''}`}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
