const accordionItems = document.querySelectorAll('.js-accordion-button');

const hideAccordion = (currentTarget) => {
  accordionItems.forEach((item) => {
    if (currentTarget !== item) {
      item.classList.remove(item.getAttribute('activeClass'));
    }
  });
};

const initAccordion = () => {
  accordionItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      hideAccordion(e.currentTarget);
      const activeClass = e.currentTarget.getAttribute('activeClass');
      if (e.currentTarget.classList.contains(activeClass)) {
        e.currentTarget.classList.remove(activeClass);
      } else {
        e.currentTarget.classList.add(activeClass);
      }
    });
  });
};

initAccordion();
