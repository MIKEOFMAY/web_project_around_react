import React, { useState, useEffect, useContext } from "react";

// import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <form onSubmit={handleSubmit} name="edit-profile">
      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        name="name"
        placeholder="Name"
      />
      <input
        value={description}
        onChange={handleDescriptionChange}
        type="text"
        name="about"
        placeholder="About"
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfilePopup;
