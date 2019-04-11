export const reorderLists = list => {
  return fetch('/api/list/reorderList', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  }).then(response => {
    return response.ok ? response.json() : undefined;
  });
};

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
    body: JSON.stringify({ id: id, name: name }),
  }).then(response => {
    return response.ok ? response.json() : undefined;
  });
};
