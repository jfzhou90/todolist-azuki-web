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
