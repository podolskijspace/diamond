const accordion = () => {
  const btns = document.querySelectorAll('.js-accordion-btn'),
        itemsSecond = document.querySelectorAll('.js-second-item');

  btns.forEach((btn) => {
    const parentItem = btn.closest('.js-accordion-item');

    btn.addEventListener('click', () => {
      const itemSiblings = getSiblings(parentItem);
      const isActive = parentItem.classList.contains('fixed'),
            content = parentItem.querySelector('.accordion__content');

      // show/hide accordion-content
      // itemSiblings.forEach((itemSibling) => {
      //   itemSibling.classList.remove('active');
      // });

      // if(isActive){
      //   parentItem.classList.remove('active');
      //   parentItem.classList.remove('fixed');
      // }else{
      //   parentItem.classList.add('active');
      //   parentItem.classList.add('fixed');
      // }

      if (!event.target.closest('.accordion__column--checkbox')) {
        $(content).slideToggle();
        parentItem.classList.toggle('fixed');
      }




      // scroll to accordion-content
      const btnCoords = getCoords(btn);

      // window.scroll({
      //   top: btnCoords.top - 100,
      //   behavior: 'smooth'
      // });
    });

    function checkSize () {

      if (window.screen.width <= 980) {
        itemsSecond.forEach(item => {
          item.classList.remove('fixed');
          item.classList.remove('active');
        })
      }
    }
    
    window.addEventListener('resize', checkSize);
    
    checkSize();
    // parentItem.querySelector('.js-arrow').addEventListener('mouseenter', event => {
    //   if (!parentItem.classList.contains('fixed')) {
    //     parentItem.classList.add('active');
    //   }
    // });

    // parentItem.querySelector('.js-arrow').addEventListener('mouseleave', event => {
    //   if (!parentItem.classList.contains('fixed')) {
    //     parentItem.classList.remove('active');
    //   }
    // });

  });
};


