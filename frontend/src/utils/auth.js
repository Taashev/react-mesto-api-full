const request = ({ path, method = 'GET', headers, body }) => {
  return fetch(`http://localhost:3001/${ path }`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
    .then(res => {

      console.log(res.json());

      if (res.ok) {
        return;
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
    credentials: 'include',
    body: { password: password, email: email }
  })
};

export const authorize = (password, email) => {
  return request({
    path: 'signin',
    method: 'POST',
    headers: {},
    credentials: 'include',
    body: { password: password, email: email }
  })
};

// export const getContent = (token) => {
//   return request({
//     path: 'users/me',
//     headers: { 'Authorization': `Bearer ${token}`}
//   })
// };
