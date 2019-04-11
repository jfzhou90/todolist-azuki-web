export const getTodosByListId = listId => {
  return fetch(`/api/todos/${listId}`).then(response => {
    return response.ok ? response.json() : undefined;
  });
};
