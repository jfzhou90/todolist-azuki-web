export const getTasksByListId = listId => {
  return fetch(`/api/tasks/${listId}`).then(async response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const addTask = (listId, name) => {
  return fetch(`/api/tasks/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listId, name }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const toggleTask = (taskId, isCompleted) => {
  return fetch(`/api/tasks/toggle`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId, isCompleted }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const reorderTasks = (tasks, socket) => {
  return fetch('/api/tasks/reorderTasks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tasks }),
  }).then(response => {
    if (socket) {
      socket.emit('updating', 'tasks');
    }
    return response.ok ? response.json() : undefined;
  });
};
