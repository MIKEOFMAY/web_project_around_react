import React, { useState, useEffect, useContext } from "react";
import api from "../utils/Api";
import Card from "./Card";

import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialcards()
      .then((cardList) => setCards(cardList))
      .catch((error) => console.error("Error fetching card list:", error));
  }, []);

  useEffect(() => {
    api
      .getInitialcards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, [props.refetchCard]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .cardLike(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((error) =>
        console.error("Error changing card like status:", error)
      );
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((error) => console.error("Error deleting card:", error));
  }

  function handleCardClick(card) {
    props.onCardClick(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="content">
        <section className="profile">
          <div
            className="profile__image-overlay"
            onClick={props.onEditAvatarClick}
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="User's Profile Pic"
            />
          </div>
          <div className="profile__info">
            <div className="profile__person">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="open-edit-profile-modal"
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="open-new-card-modal"
            onClick={props.onAddPlaceClick}
          ></button>
        </section>

        <section className="postcards">
          <ul className="postcards__list">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={handleCardClick}
                onRemoveCardClick={handleCardDelete}
                onCardClickLike={handleCardLike}
              />
            ))}
          </ul>
        </section>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default Main;
