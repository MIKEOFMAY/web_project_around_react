import React from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const { likesCounter } = props;
  console.log(props.card);
  console.log("islike,  ", isLiked, currentUser._id);

  function handleLikeClick() {
    props.onCardClickLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleRemoveClick() {
    props.onRemoveCardClick(props.card);
  }
  return (
    <li className="postcard">
      <button
        className="postcard__remove-button"
        aria-label="remove postcard"
        type="button"
        onClick={handleRemoveClick}
      ></button>
      <img
        className="postcard__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="postcard__title-area">
        <h2 className="postcard__title">{props.card.name}</h2>
        <div className="postcard__like-container">
          <button
            className={`postcard__like-button ${
              isLiked && "postcard__like-button_active"
            }`}
            aria-label="like-or-unlike-postcard"
            type="button"
            onClick={handleLikeClick}
          />
          <span className="postcard__like-counter">{likesCounter}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
