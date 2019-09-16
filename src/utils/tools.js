
function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hours = addZero(date.getHours());
  const min = addZero(date.getMinutes());
  const sec = addZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
}

function addZero(number) {
  const string = number.toString();
  return string.length === 1 ? '0' + string : string;
}

export {
  formatDate
}