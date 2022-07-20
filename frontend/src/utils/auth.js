const baseUrl = `${window.location.protocol}//${process.env.REACT_APP_API_URL || 'localhost:3001'}`;

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json()
  .then(data => {
    throw new Error(data?.error || data.message);
  })
};

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  }).then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  }).then(checkResponse)
};

export const logout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: 'GET',
    credentials: 'include'
  }).then(checkResponse)
};

export const getContent = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(checkResponse)
};
