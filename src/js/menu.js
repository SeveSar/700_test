const burgerButton = document.querySelector('.js-burger');
const overlayItem = document.querySelector('.js-overlay');
const menuNavItem = document.querySelector('.js-nav-menu');
const closeNavButton = document.querySelector('.js-nav-close');
const toggleMenu = () => {
  overlayItem.classList.toggle('overlay--active');
  menuNavItem.classList.toggle('nav--active');
  document.body.classList.toggle('no-scroll');
};

burgerButton.addEventListener('click', toggleMenu);

overlayItem.addEventListener('click', toggleMenu);

closeNavButton.addEventListener('click', toggleMenu);
