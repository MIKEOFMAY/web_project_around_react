import React from 'react';
import Card from './Card';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';


function App(props) {
  //popup
  const [popupState, setPopupState] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    selectedCard: 0,
  });

  //currentUser
  const [currentUser, setCurrentUser] = React.useState({});

  //card
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then(result => {
      setCurrentUser(result);
    });

    api.getInitialCards().then(result => {
      setCards(result);
    });
  }, []);

  //popup handlers
  function handleEditAvatarClick() {
    setPopupState({
      isEditAvatarPopupOpen: true,
    });
  }

  function handleEditProfileClick() {
    setPopupState({
      isEditProfilePopupOpen: true,
    });
  }

  function handleAddPlaceClick() {
    setPopupState({
      isAddPlacePopupOpen: true,
    });
  }

  function closeAllPopups() {
    setPopupState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: undefined,
    });
  }

  //card handlers
  function handleCardClick(card) {
    setPopupState({
      selectedCard: card,
    });
  }

  function handleCardLike(cardProps) {
    const isLiked = cardProps.card.likes.some(i => i._id === currentUser._id);
    api.changeLikeStatus(isLiked, cardProps.card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === cardProps.card._id ? newCard : c);
        setCards(newCards);
    });
  }

  function handleCardDelete(cardProps) {
    api.deleteCard(cardProps.card._id).then(() => {
      const newCards = cards.filter((c) => {
        return c._id !== cardProps.card._id
      });
      setCards(newCards);
    });
  }

  //edit user handler
  function handleUpdateUser(info) {
    api.sendUserInfo(info).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }

  //add place handler
  function handleAddPlaceSubmit(cardProps) {
    api.sendCardData(cardProps).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  //avatar handler
  function handleUpdateAvatar(avatar) {
    api.sendUserAvatar(avatar).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: 0,
    };
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true,
    });
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true,
    });
  }

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true,
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: undefined,
    });
    console.log("hello");
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="page">
          < Header />
          < Main
            onEditProfile={this.handleEditAvatarClick}
            onAddPlace={this.handleAddPlaceClick}
            onEditAvatar={this.handleEditProfileClick}
            onCardClick={this.handleCardClick}
          />
          < Footer />
          {/* Edit name & occupation */}
          < PopupWithForm name="edit" title="Edit profile" value="Save"
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            firstInput={
              <>
                <input type="text" id="name-input" className="form__input popup__item popup__name" name="userName" placeholder="Name" minLength="2" maxLength="40" pattern="[A-Za-z -]{1,}" required />
                <span id="name-input-error" className="form__input-error"></span>
              </>
            }
            secondInput={
              <>
                <input type="text" id="about-input" className="form__input popup__item popup__about" name="userJob" placeholder="About me" minLength="2" maxLength="200" required />
                <span id="about-input-error" className="form__input-error"></span>
              </>
            }
          />
          {/* Adding new place */}
          < PopupWithForm name="add" title="New Place" value="Create"
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            firstInput={
              <>
                <input type="text" id="title-input" className="form__input popup__item popup__place-title" name="name" placeholder="Title" minLength="1" maxLength="30" required />
                <span id="title-input-error" className="form__input-error"></span>
              </>
            }
            secondInput={
              <>
                <input type="url" id="link-input" className="form__input popup__item popup__image-link" name="link" placeholder="Link" required />
                <span id="link-input-error" className="form__input-error"></span>
              </>
            }
          />
          {/* Open image */}
          < ImagePopup
            isOpen={this.state.selectedCard}
            onClose={this.closeAllPopups}
          />
          {/* Delete card? */}
          < PopupWithForm name="delete" title="Are you sure?" value="Yes" />
          {/* Changing profile picture */}
          < PopupWithForm name="picture" title="Change profile picture" value="Create"
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            firstInput={
              <>
                <input type="url" id="link-input" className="form__input popup__item popup__image-link" name="link" placeholder="Link" required />
                <span id="link-input-error" className="form__input-error"></span>
              </>
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
