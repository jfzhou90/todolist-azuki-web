export const addSubtask = (taskId, name) => {
  return fetch(`/api/subtasks/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId, name }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const updateSubtask = (id, name) => {
  return fetch(`/api/subtasks/update`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const deleteSubtask = id => {
  return fetch(`/api/subtasks/`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const reorderSubTasks = (subtaskArray, socket) => {
  return fetch('/api/subtasks/reorder', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subtaskArray }),
  }).then(response => {
    if (response.ok) {
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};

export const toggleSubTask = (id, isCompleted, socket) => {
  return fetch('/api/subtasks/toggle', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, isCompleted }),
  }).then(response => {
    if (response.ok) {
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    } else {
      throw new Error('An Error occured with the API');
    }
  });
};
