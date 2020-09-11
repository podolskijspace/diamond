function popup () {
  let popup = document.querySelectorAll('.js-popup');

  popup.forEach(item => {
    item.addEventListener('click', event => {
      if (event.target.closest('.js-close') || !event.target.closest('.popup__wrapper')) {
        item.classList.remove('active');
        NKH.body.classList.remove('fixed');
      }
    });
  });
}