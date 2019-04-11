export const getUser = () => {
  return fetch('/auth/currentUserAndList').then(response => {
    return response.ok ? response.json() : undefined;
  });
};
