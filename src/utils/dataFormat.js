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
  data.forEach(item => (keyHash[item.id] = item));

  return { activeTasks, completedTasks, keyHash };
};

export const addNewTask = (state, newData) => {
  const newState = { ...state };
  newState.activeTasks = [...newState.activeTasks, newData.id];
  newState.keyHash[newData.id] = newData;

  return newState;
};

export const updateToggle = (state, newData) => {
  const newDataStates = Object.values(state.keyHash).map(task =>
    task.id === newData.id ? newData : task
  );

  return formatTaskStructure(newDataStates);
};
