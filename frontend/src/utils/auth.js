const request = ({ path, method = 'GET', headers, body }) => {
  return fetch(`https://auth.nomoreparties.co/${ path }`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return res.json()
        .then(data => {
          throw new Error(data?.error || data.message);
        })
    })
};

export const register = (password, email) => {
  return request({
    path: 'signup',
    method: 'POST',
    headers: {},
    body: { password: password, email: email }
  })
};

export const authorize = (password, email) => {
  return request({
    path: 'signin',
    method: 'POST',
    headers: {},
    body: { password: password, email: email }
  })
};

export const getContent = (token) => {
  return request({
    path: 'users/me',
    headers: { 'Authorization': `Bearer ${token}`}
  })
};
