const demoSlider = new Swiper('#demo-slider', {
  // Optional parameters
  loop: true,
  speed: 700,
  spaceBetween: 20,
  slidesPerView: 1.2,
  centeredSlides: true,
  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: '.demo__button-next',
    prevEl: '.demo__button-prev',
  },
});

let init = false;
let newsSlider;
function swiperCard() {
  if (window.innerWidth <= 575) {
    if (!init) {
      init = true;
      newsSlider = new Swiper('#news-slider', {
        slidesPerView: 1.3,
        spaceBetween: 20,
      });
    }
  } else if (init) {
    newsSlider.destroy();
    init = false;
  }
}
swiperCard();
window.addEventListener('resize', swiperCard);
