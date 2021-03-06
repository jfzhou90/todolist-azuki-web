export const getUser = () => {
  return fetch('/auth/currentUserAndList').then(response => {
    if (response && response.ok) {
      return response.json();
    } else {
      throw new Error('Could not retrieve user.');
    }
  });
};
