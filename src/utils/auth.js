export const baseUrl = "http://localhost:3001";

export const register = (email, password, name, avatarURL) => {
  return fetch(`${baseUrl}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatarURL }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

export const logIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};
