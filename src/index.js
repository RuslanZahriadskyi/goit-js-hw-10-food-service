import itemMenu from './menu.json';
import itemTemplates from './templates/menu.hbs';
// import ingredientsTemplates from './templates/ingredients.hbs';
import './styles.css';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const createItem = itemTemplates(itemMenu);

const refs = {
  menuRef: document.querySelector('.js-menu'),
  themeSwitchRef: document.querySelector('.theme-switch__toggle'),
  bodyRef: document.querySelector('body'),
};

refs.themeSwitchRef.addEventListener('change', changeThemes);
refs.themeSwitchRef.addEventListener('click', removeBodyClassForTheme);
refs.menuRef.insertAdjacentHTML('beforeend', createItem);

getBodyClassForTheme();

function getBodyClassForTheme() {
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

// const test = itemMenu.reduce((newElement, el) => {
//   const newIngredients = el.ingredients.filter(el => !newElement.includes(el));
//   return [...newElement, ...newIngredients];
// }, []);
