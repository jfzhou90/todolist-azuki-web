export const getUser = () => {
  return fetch('/auth/currentUser').then(response => {
    return response.ok ? response.json() : undefined;
  });
};
