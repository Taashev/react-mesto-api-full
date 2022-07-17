class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // request
  _request(path, method, body) {
    return fetch(this._baseUrl + path, {
      method: method || 'GET',
      headers: this._headers,
      ...body
    })
      .then(res => {
        if(res.ok) { return res.json() }

        return Promise.reject(res.status);
      })
  };


  // get user info
  getUserInfo() {
    return this._request('users/me')
  };

  // get cards
  getCards() {
    return this._request('cards')
  };


  // set user info
  setUserInfo(name, about) {
    return this._request(
    /* path: */ 'users/me',
    /* method: */ 'PATCH',
    /* body: */ {
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  };

  // set card
  setCard(name, link) {
    return this._request(
      /* path: */ 'cards',
      /* method: */ 'POST',
      /* body: */ {
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    )
  };


  // delete card
  deleteCard(cardId) {
    return this._request(
      /* path: */ `cards/${cardId}`,
      /* method: */ 'DELETE'
    )
  };

  // add like
  addLike(cardId) {
    return this._request(
      /* path: */ `cards/${cardId}/likes`,
      /* method: */ 'PUT'
    )
  };

  // delete like
  deleteLike(cardId) {
    return this._request(
      /* path: */ `cards/${cardId}/likes`,
      /* method: */ 'DELETE'
    )
  };

  // set user avatar
  setUserAvatar(avatar) {
    return this._request(
    /* path: */ 'users/me/avatar',
    /* method: */ 'PATCH',
    /* body: */ {
      body: JSON.stringify({
        avatar: avatar
      })
    })
  };
}

// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
  headers: {
    authorization: 'b52f2582-d828-40bf-8301-f8f9457aa9d0',
    'Content-type': 'application/json'
  }
});

export default api;
