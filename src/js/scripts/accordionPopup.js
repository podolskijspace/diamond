function accordionPopup () {
  let wrappers = document.querySelectorAll('.js-popup-wrapper');

  wrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseenter', event => {
      let item = wrapper.querySelector('.js-popup');
      
      if (event.screenY - 150 < item.offsetHeight) {
        wrapper.classList.add('down');
      }
      else {
        wrapper.classList.remove('down');
      }
    })
  })
};