export const getTasksByListId = listId => {
  return fetch(`/api/todos/${listId}`).then(async response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};
