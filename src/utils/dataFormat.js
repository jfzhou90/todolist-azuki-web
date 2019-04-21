export const formatDataStructure = data => {
  const keyOrder = data.sort((a, b) => a.order - b.order).map(item => item.id);
  const keyHash = {};
  data.forEach(item => (keyHash[item.id] = item));

  return { keyOrder, keyHash };
};

export const addNewData = (state, newData) => {
  const newState = { ...state };
  newState.keyOrder.push(newData.id);
  newState.keyHash[newData.id] = newData;
  return newState;
};

export const formatTaskStructure = data => {
  const activeTasks = data
    .filter(task => !task.isCompleted)
    .sort((a, b) => a.order - b.order)
    .map(item => item.id);

  const completedTasks = data
    .filter(task => task.isCompleted)
    .sort((a, b) => a.order - b.order)
    .map(item => item.id);

  const keyHash = {};
  data.forEach(item => {
    if (Array.isArray(item.subtasks)) {
      item.subtasks = formatDataStructure(item.subtasks);
    }
    keyHash[item.id] = item;
  });

  return { activeTasks, completedTasks, keyHash };
};

export const addNewTask = (state, newData) => {
  const newState = { ...state };
  newState.activeTasks = [...newState.activeTasks, newData.id];
  const subtasksExists = newData.subtasks ? newData.subtasks : [];
  newData.subtasks = formatDataStructure(subtasksExists);
  newState.keyHash[newData.id] = newData;

  return newState;
};

export const updateToggle = (state, newData) => {
  const keyHash = {};
  const keyOrder = newData.subtasks.map(subtask => subtask.id);
  newData.subtasks.forEach(subtask => {
    keyHash[subtask.id] = subtask;
  });
  newData.subtasks = { keyOrder, keyHash };
  const newDataStates = Object.values(state.keyHash).map(task =>
    task.id === newData.id ? newData : task
  );
  return formatTaskStructure(newDataStates);
};

export const addSubtask = (state, newData) => {
  const newState = { ...state };
  newState.keyHash[newData.TaskId].subtasks.keyOrder.push(newData.id);
  newState.keyHash[newData.TaskId].subtasks.keyHash[newData.id] = newData;
  return newState;
};

export const removeSubtask = (state, data) => {
  const newState = { ...state };
  newState.keyHash[data.taskId].subtasks.keyOrder = newState.keyHash[
    data.taskId
  ].subtasks.keyOrder.filter(itemId => itemId !== data.id);

  return newState;
};
