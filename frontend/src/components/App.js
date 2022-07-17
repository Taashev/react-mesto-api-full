import React, { useEffect, useState } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import PopupCardDelete from './PopupCardDelete';
import InfoTooltip from './InfoTooltip';
import NotFound from './NoutFound';

function App() {
  const history = useHistory();

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
  const [ isDeleteCardPopupOpen, setIsDeleteCardPopupOpen ] = useState(false);
  const [ isInfoTooltip, setIsInfoTooltips ] = useState({});

  const [ selectedCard, setSelectedCard ] = useState({});
  const [ currentUser, setCurrentUser ] = useState({});
  const [ cards, setCards ] = useState([]);
  const [ selectCardDelete, setSelectCardDelete ] = useState({});
  const [ email, setEmail ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ stateMenu, setStateMenu ] = useState(false);

  // card like
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    if(!isLiked) {
      api.addLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res : c));
        })
        .catch(err => console.error(`Ошибка: ${ err }`))
    } else {
      api.deleteLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res : c));
        })
        .catch(err => console.error(`Ошибка: ${ err }`))
    }
  };

  // handle add photo popup
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  // handle edit profile popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  // handle edit avatar popup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  // handle card delete popup
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectCardDelete(card)
  }

  // close popup
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltips({});
  };

  // close popup overlay
  function closeOverlay(e) {
    if(e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  // handle card click
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  // set user info
  function handleUpdateUser({ name, about }, setLoader, nameBtn) {

    api.setUserInfo(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setLoader(nameBtn);
      })
      .catch(err => console.error(`Ошибка: ${ err }`))
  }

  // set user avatar
  function handleUpdateAvatar({ avatar }, setLoader, nameBtn) {
    api.setUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setLoader(nameBtn);
      })
      .catch(err => console.error(`Ошибка: ${ err }`))
  }

  // set card
  function handleAddPlaceSubmit({ name, link }, setLoader, nameBtn) {
    api.setCard(name, link)
      .then(newCards => {
        setCards([newCards, ...cards]);
        closeAllPopups();
        setLoader(nameBtn);
      })
      .catch(err => console.error(`Ошибка: ${ err }`))
  }

  // card delete
  function handleCardDelete(card, setLoader, nameBtn) {
    api.deleteCard(card._id)
      .then(_ => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
        setLoader(nameBtn);
      })
      .catch(err => console.error(`Ошибка: ${ err }`))
  }

  // handle login
  function handleLogin(password, email) {
    return auth.authorize(password, email)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          checkToken();
          return res;
        }
      })
  }

  // handle register
  function handleRegister(password, email) {
    return auth.register(password, email)
      .then(() => {
        setIsInfoTooltips({ isOpen: true, status: true, message: 'Вы успешно зарегистрировались!' });
        history.push('/sign-in');
      })
  }

  // check token
  function checkToken() {
    const token = localStorage.getItem('token');

    if(token) {
      auth.getContent(token)
        .then((res) => {
          setEmail(res.data.email)
          setLoggedIn(true);
          history.push('/');
        })
    }
  }

  // on sign out
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    setStateMenu(false);
  }

  // handle click burger
  function hanaleClickBurger() {
    setStateMenu(!stateMenu)
  }

  // component did mount
  useEffect(() => {
    checkToken();

    // static promise: user information first, then maps
    Promise.all([ api.getUserInfo(), api.getCards() ])
      .then(res => {
        const getUserInfo = res[0];
        const getCards = res[1];

        setCurrentUser(getUserInfo);

        return getCards;
      })
      .then(res => {
        setCards(res.map(card => card));
      })
      .catch(err => console.error(`Ошибка: ${ err }`))
  }, [])

  return (
    <CurrentUserContext.Provider value={ currentUser }>
        <div className="page">
          <Switch>
            <Route path="/sign-in">
              <Header>
                <Link className="header__link hover" to="/sign-up">Регистрация</Link>
              </Header>
              <Login onInfoTooltip={ setIsInfoTooltips } onLogin={ handleLogin } />
            </Route>
            <Route path="/sign-up">
              <Header>
                <Link className="header__link hover" to="/sign-in">Войти</Link>
              </Header>
              <Register onInfoTooltip={ setIsInfoTooltips } onRegister={ handleRegister } />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={ loggedIn }
              component={ Main }
              cards={ cards }
              onEditProfile={ handleEditProfileClick }
              onAddPlace={ handleAddPlaceClick }
              onEditAvatar={ handleEditAvatarClick }
              onCardClick={ handleCardClick }
              onCardLike={ handleCardLike }
              onCardDelete={ handleDeleteCardClick }
              email={ email }
              onSignOut={ handleSignOut }
              stateMenu={ stateMenu }
              onBurgerClick={ hanaleClickBurger } />
            <Route path="*">
              <Header />
              <NotFound />
            </Route>
          </Switch>
          <Footer />

          {/* popup update avatar */}
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onCloseOverlay={ closeOverlay } onUpdateAvatar={ handleUpdateAvatar } />
          {/* popup profile */}
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onCloseOverlay={ closeOverlay } onUpdateUser={ handleUpdateUser } />
          {/* popup photo */}
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } onCloseOverlay={ closeOverlay } onAddPlace={ handleAddPlaceSubmit } />
          {/* popup card delete */}
          <PopupCardDelete isOpen={ isDeleteCardPopupOpen } onClose={ closeAllPopups } onCloseOverlay={ closeOverlay } onCardDelete={ handleCardDelete } card={ selectCardDelete } />
          {/* popup fullscreen */}
          <ImagePopup card={ selectedCard } onClose={ closeAllPopups } onCloseOverlay={ closeOverlay } />
          {/* Info Tooltip */}
          <InfoTooltip config={ isInfoTooltip } onClose={ closeAllPopups } onCloseOverlay={ closeOverlay } />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
