export const addNewList = listName => {
  return fetch('/api/list/createList', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: listName }),
  }).then(response => {
    return response.ok ? response.json() : undefined;
  });
};

export const reorderLists = (list, socket) => {
  return fetch('/api/list/reorderList', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  }).then(response => {
    if (socket) {
      socket.emit('updating', 'list');
    }
    return response.ok ? response.json() : undefined;
  });
};

export const deleteList = id => {
  return fetch(`/api/list/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then(response => {
    return response.ok ? response.json() : undefined;
  });
};

export const updateList = (id, name) => {
  return fetch(`/api/list/updateListFields`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  }).then(response => {
    return response.ok ? response.json() : undefined;
  });
};
