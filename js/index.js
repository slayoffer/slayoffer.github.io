(function () {
  "use strict";

  const profileName = document.querySelector("#heading");
  const profileSpec = document.querySelector("#subheading");
  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");
  const profilePopup = document.querySelector("#form-edit-profile");
  const cardPopup = document.querySelector("#form-add-card");
  const pictureName = document.querySelector("#pic-name");
  const pictureLink = document.querySelector("#pic-link");
  const imagePopup = document.querySelector("#foto-card");
  const gridCard = document.querySelector(".grid-foto");

  
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];


  function closePopup(popup) {
	popup.classList.remove('popup_opened');
  }
	
  function openPopup(popup) {
	popup.classList.add('popup_opened');
  }

  //вызов попапа профиля
  function editFormSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.innerText = profileName.value;
    profileSubtitle.innerText = profileSpec.value;
    closePopup(profilePopup);
  }




  //функция для добавления карточек
  function createCard(item) {
    const templateCard = document.querySelector("#template-card");
    const cardElement = templateCard.content.cloneNode(true).querySelector(".card");
    cardElement.querySelector(".card__para").innerText = item["name"];
    cardElement.querySelector(".card__image").src = item["link"];
    cardElement.querySelector(".card__image").alt = item["name"];
    
    
    cardElement.querySelector(".card__like").addEventListener("click", () => {
	  cardElement.querySelector(".card__like").classList.toggle("card__like_active");
	});
	
	cardElement.querySelector('.card__image').addEventListener("click", () => {
      imagePopup.querySelector(".popup__foto").src = item["link"];
      imagePopup.querySelector(".popup__foto").alt = item["name"];
      imagePopup.querySelector(".popup__caption").innerText = item["name"];
      openPopup(imagePopup);
    });
    
    cardElement.querySelector(".card__trash").addEventListener("click", () => {
      cardElement.querySelector(".card__trash").closest(".card").remove();
    });

    return cardElement;
  }
  
  
  //функция добавления новых карточек
  function addFormSubmitCard(event) {
    event.preventDefault();
    const arrNewFile = [{
	    name: pictureName.value,
	    link: pictureLink.value,
    }];
    const card = createCard(arrNewFile[0]);
    gridCard.prepend(card);
    closePopup(document.querySelector("#form-add-card"));
    event.target.reset();
  }
  
  
  
  //редактирование попапа профиля
  const buttonEditProfile = document.querySelector(".profile__button-pencil");
  if (buttonEditProfile != null) {
    buttonEditProfile.addEventListener("click", function () {
      openPopup(profilePopup);
      profileName.value = profileTitle.innerText;
      profileSpec.value = profileSubtitle.innerText;
    });
  }
  

  //сабмит для профиля
  const formProfile = document.querySelector("#popup-profile-form");
  formProfile.addEventListener("submit", editFormSubmitProfile);


  //закрытие попапов
  const closeButtons = document.querySelectorAll('.popup__toggle');
  closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
  });


  //попап для картинок
  const buttonEditPic = document.querySelector(".profile__button-plus");
  if (buttonEditPic != null) {
    buttonEditPic.addEventListener("click", function () {
      openPopup(cardPopup);
    });
  }

  //6 готовых карточек
  initialCards.forEach((elementFoto) => {
    const card = createCard(elementFoto);
    gridCard.prepend(card);
  });


  //сабмит для карточки
  const formCard = document.querySelector("#form-add-card");
  formCard.addEventListener("submit", addFormSubmitCard);
  


  //удаление карточки
  const removeCard = document.querySelectorAll(".card__trash");
  removeCard.forEach((bin) => {
    bin.addEventListener("click", () => {
      bin.closest(".card").remove();
    });
  });

})();
