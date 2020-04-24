export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('globalState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('globalState', serializedState);
  } catch {
    // ignore write errors
  }
};

export const removeState = () => {
  try {
    localStorage.removeItem('globalState');
  } catch {
    // ignore write errors
  }
};

///////

/* export const getItems = (items) =>
  JSON.parse(localStorage.getItem(items) || null);

export const setItems = (title, items) =>
  localStorage.setItem(title, JSON.stringify(items));

export const removeItems = (items) => localStorage.removeItem(items);
 */
