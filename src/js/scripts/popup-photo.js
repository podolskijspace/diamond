function popupPhoto () {
  const itemsSlider = document.querySelectorAll('.js-show-scale'),
        itemsAccordion = document.querySelectorAll('.js-show-accordion'),
        popup = document.querySelector('.js-popup-scale'),
        imgPopup = popup.querySelector('img'),
        textPopup = popup.querySelector('span');

  itemsSlider.forEach(item => {
    const img = item.querySelector('img'),
          text = item.querySelector('.js-text');

    
    showPopup(img, img.src, text);
  })

  itemsAccordion.forEach(item => {
    if (!item.classList.contains('disabled')) {
      showPopup(item, item.dataset.img, false)
    }
  })

  function showPopup (btn, src, text) {
    btn.addEventListener('click', event => {
      imgPopup.src = src;
      if (text) {
        textPopup.textContent = text.textContent;
      }
      else {
        textPopup.textContent = '';   
      }

      popup.classList.add('active');
      NKH.body.classList.add('fixed');
    })
  }

  popup.addEventListener('click', event => {
    popup.classList.remove('active');
    NKH.body.classList.remove('fixed');
  })
}