
function getItem(key) {
  const result = window.localStorage.getItem(key);
  return JSON.parse(result);
}

function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  window.localStorage.removeItem(key);
}

export {
  getItem,
  setItem,
  removeItem
}