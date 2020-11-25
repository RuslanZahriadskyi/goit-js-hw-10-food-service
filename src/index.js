import itemMenu from './menu.json';
import itemTemplates from './templates/menu.hbs';
import ingredientsTemplates from './templates/ingredients.hbs';
import './styles.css';

const ShowAllIngredients = 'Всё меню';
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  menuRef: document.querySelector('.js-menu'),
  themeSwitchRef: document.querySelector('.theme-switch__toggle'),
  bodyRef: document.querySelector('body'),
  menuButtonRef: document.querySelector('.js-menu__button'),
};

refs.themeSwitchRef.addEventListener('change', changeThemes);
refs.themeSwitchRef.addEventListener('click', removeBodyClassForTheme);
refs.menuButtonRef.addEventListener('click', onClickButtonMenu);
refs.menuRef.addEventListener('click', onClickButtonMenu);

setBodyClassForTheme();

function setBodyClassForTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.LIGHT) {
    refs.bodyRef.classList.add(Theme.LIGHT);
    refs.themeSwitchRef.checked = false;
  }
  if (savedTheme === Theme.DARK) {
    refs.bodyRef.classList.add(Theme.DARK);
    refs.themeSwitchRef.checked = true;
  }
}

function removeBodyClassForTheme() {
  refs.bodyRef.classList.remove(Theme.LIGHT, Theme.DARK);
}

function changeThemes() {
  if (!refs.themeSwitchRef.checked) {
    localStorage.setItem('theme', Theme.LIGHT);
    refs.bodyRef.classList.toggle(Theme.LIGHT);
  }
  if (refs.themeSwitchRef.checked) {
    localStorage.setItem('theme', Theme.DARK);
    refs.bodyRef.classList.toggle(Theme.DARK);
  }
}

setMenuList(ShowAllIngredients);

function setMenuList(menuList) {
  // console.log(menuList);
  let receivedMenu = [];

  if (menuList === ShowAllIngredients) {
    receivedMenu = itemMenu.slice();
  } else
    receivedMenu = itemMenu.filter(element => {
      if (element.ingredients.includes(menuList)) {
        return true;
      }
      return false;
    });

  // console.log(receivedMenu);
  console.log(menuList);
  const menu = itemTemplates(receivedMenu);

  // tagRef = document.querySelector('.tag-list');

  refs.menuRef.innerHTML = '';
  refs.menuRef.insertAdjacentHTML('beforeend', menu);

  setMenuByFilter(receivedMenu);
}

function setMenuByFilter(receivedMenu) {
  const selectedIngredients = receivedMenu.reduce(
    (newFiltredMenu, { ingredients }) => {
      const filtredIngredients = ingredients.filter(
        ingrd => !newFiltredMenu.includes(ingrd),
      );

      return [...newFiltredMenu, ...filtredIngredients];
    },
    [],
  );

  const menuFiltredByIngredients = ingredientsTemplates([
    ShowAllIngredients,
    ...selectedIngredients,
  ]);

  // console.log(menuFiltredByIngredients);

  refs.menuButtonRef.innerHTML = '';
  refs.menuButtonRef.insertAdjacentHTML('beforeend', menuFiltredByIngredients);
}

function onClickButtonMenu(event) {
  const menuList = event.target;
  if (menuList.nodeName !== 'LI') {
    return;
  }

  // console.log(menuList.nodeName === 'LI')

  setMenuList(menuList.textContent);
}
