import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImageExhibitOpen, setIsImageExhibitOpen] = useState(false);
  const [isRemoveCardOpen, setIsRemoveCardOpen] = useState(false);
  const [willDeleteCardId, setWillDeleteCard] = useState("");
  const [refetchCard, setRefetchCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: ""
  });

  const onUpdateUser = async ({ name, about }) => {
    try {
      await api.setUserInfo(name, about);
      // Update the local currentUser state
      setCurrentUser({ ...currentUser, name, about });
      closeAllPopups();
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((error) => console.error("error fetching user info:", error));
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (props) => {
    setIsImageExhibitOpen(true);
    setSelectedCard({
      name: props.name,
      link: props.link
    });
  };

  const handleRemoveCardClick = (card) => {
    setWillDeleteCard(card._id);
    setIsRemoveCardOpen(true);
    return card;
  };

  const confirmCardRemoval = async (e) => {
    e.preventDefault();
    await api
      .removeCard(willDeleteCardId)
      .then(() => {
        setIsRemoveCardOpen(false);
        setRefetchCard(!refetchCard); //change the remove card .
      })
      .catch((err) => {
        setIsRemoveCardOpen(false);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageExhibitOpen(false);
    setIsRemoveCardOpen(false);
  };

  const addNewPlace = async (e) => {
    e.preventDefault();
    const name = e.target.querySelector("#input-title").value;
    const link = e.target.querySelector("#input-url").value;
    api
      .addCard({ name, link })
      .then(() => {
        setRefetchCard(!refetchCard);
        closeAllPopups();
      })
      .catch((err) => {
        closeAllPopups();
      });
  };

  const editNewProfile = async (e) => {
    e.preventDefault();
    const name = e.target.querySelector("#input-name").value;
    const about = e.target.querySelector("#input-about").value;
    api
      .setUserInfo(name, about)
      .then(() => {
        setRefetchCard(!refetchCard);
        closeAllPopups();
      })
      .catch((err) => {
        closeAllPopups();
      });
  };

  const editAvatar = async (e) => {
    e.preventDefault();
    const link = e.target.querySelector("#input-avatar").value;

    await api.setUserAvatar(link);
    setRefetchCard(!refetchCard);

    closeAllPopups();
  };

  const onUpdateAvatar = async (avatarInfo) => {
    try {
      setIsAvatarLoading(true); // Set loading to true
      await api.setUserAvatar(avatarInfo.avatar);
      setCurrentUser({ ...currentUser, avatar: avatarInfo.avatar });
      closeAllPopups();
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsAvatarLoading(false); // Set loading back to false
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onRemoveCardClick={handleRemoveCardClick}
        refetchCard={refetchCard}
      />
      <Footer />

      <EditProfilePopup onUpdateUser={onUpdateUser} />

      <PopupWithForm
        title="Edit Profile"
        name="edit-profile"
        onSubmit={editNewProfile}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Save"
      >
        <fieldset className="form__fieldset">
          <input
            className="form__input form__input_type_profile-name"
            type="text"
            name="username"
            id="input-name"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            required
          />

          <span className="form__input-error input-name-error"></span>

          <input
            className="form__input form__input_type_profile-title"
            type="text"
            name="userjob"
            placeholder="About Me"
            id="input-about"
            minLength="2"
            maxLength="200"
            required
          />

          <span className="form__input-error input-about-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="New Place"
        name="add-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Create"
        onSubmit={addNewPlace}
      >
        <fieldset className="form__fieldset">
          <input
            className="form__input form__input_type_postcard-name"
            type="text"
            name="name"
            id="input-title"
            placeholder="Title"
            minLength="1"
            maxLength="30"
            required
          />

          <span className="form__input-error input-title-error"></span>

          <input
            className="form__input form__input_type_postcard-url "
            type="url"
            name="link"
            id="input-url"
            placeholder="Image Link"
            required
          />

          <span className="form__input-error input-url-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Update Profile Picture"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Save"
        onSubmit={editAvatar}
      >
        <fieldset className="form__fieldset">
          <input
            className="form__input form__input_type_avatar-url"
            type="url"
            name="link"
            id="input-avatar"
            placeholder="User Image Url"
            required
          />
          <span className="form__input-error input-avatar-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Are You Sure?"
        name="remove-card"
        buttonText="Yes"
        isOpen={isRemoveCardOpen}
        onClose={closeAllPopups}
        onSubmit={confirmCardRemoval}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImageExhibitOpen}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
        isRenderLoading={isAvatarLoading}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
