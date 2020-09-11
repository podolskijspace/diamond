function showArrow () {
  const line = document.getElementById('why'),
        arrow = document.querySelector('.js-arrow-up');

  window.addEventListener('scroll', event => {

    if (line.offsetTop < window.pageYOffset + 200) {
      arrow.classList.add('active');
    }
    else {
      arrow.classList.remove('active');
    }
  })
}