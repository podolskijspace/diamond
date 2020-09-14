function popup () {
  let popup = document.querySelectorAll('.js-popup');

  popup.forEach(item => {
    item.addEventListener('click', event => {
      console.log(!event.target.closest('.js-dont-close'));
      if (event.target.closest('.js-close') || !event.target.closest('.js-dont-close')) {
        item.classList.remove('active');
        NKH.body.classList.remove('fixed');
      }
    });
  });

  showPopup(document.querySelector('.js-menu-btn'), document.querySelector('.js-menu'));

  function showPopup (btn, popup) {
    btn.addEventListener('click', event => {
      popup.classList.add('active');
      NKH.body.classList.add('fixed');
    })
  }
}