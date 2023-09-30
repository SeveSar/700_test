const inputItems = document.querySelectorAll('[mask]');

const INPUT_INSTANCES = {};

inputItems.forEach((input) => {
  const mask = input.getAttribute('mask');
  const nameInput = input.getAttribute('id');
  INPUT_INSTANCES[nameInput] = IMask(input, { mask });
});
