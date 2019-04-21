export const reorder = (draggables, startIndex, endIndex) => {
  const [removed] = draggables.splice(startIndex, 1);
  draggables.splice(endIndex, 0, removed);

  return draggables;
};
