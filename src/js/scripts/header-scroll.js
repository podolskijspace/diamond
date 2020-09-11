const headerScroll = () => {
  window.addEventListener('scroll', (e) => {
    const scrollTop = window.pageYOffset;
    const isActive = scrollTop > 50;
    const header = document.querySelector('.js-page-header');

    if(isActive){
      header.classList.add('fixed');
    }else{
      header.classList.remove('fixed');
    }
  });
};
