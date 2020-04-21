export const getItems = (items) =>
  JSON.parse(localStorage.getItem(items) || null);

export const setItems = (title, items) =>
  localStorage.setItem(title, JSON.stringify(items));

export const removeItems = (items) => localStorage.removeItem(items);
