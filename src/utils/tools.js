import { setItem, getItem } from './storage';

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

function setThemeStyle(color) {
  return `
    .ant-btn.ant-btn-primary{
      background-color: ${color};
      border-color: ${color};
    }
    .ant-btn.ant-btn-primary:hover, .ant-btn.ant-btn-primary:focus{
      color: #fff;
    }
    .ant-btn:hover, .ant-btn:focus{
      border-color: ${color};
      color: ${color};
    }
    .ant-btn.ant-btn-link{
      color: ${color};
    }
    .ant-menu-item.ant-menu-item-selected{
      background-color: ${color}!important;
    }
    .header-main .header-main-top{
      border-bottom: 1px solid ${color};
    }
    .theme-picker-btn{
      background-color: ${color};
    }
  `
}

let style = null;

function createStyle(color) {
  if (!style) {
    style = document.createElement('style');
    document.querySelector('head').appendChild(style);
  }

  setItem('theme-color', color);

  style.innerText = setThemeStyle(color);
}

function initThemeColor() {
  const color = getItem('theme-color');
  if (color) {
    createStyle(color);
  }
}

export {
  formatDate,
  createStyle,
  initThemeColor
}