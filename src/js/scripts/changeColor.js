function changeColor () {
  let item = document.querySelector('.js-change-color'),
      line = document.querySelector('.js-check-line');

  function checkLine () {
    if (line.clientHeight - item.clientHeight === item.offsetTop) {
      item.classList.add('active');
    }
    else {
      item.classList.remove('active');
    }
  }

  document.addEventListener('scroll', checkLine);

  checkLine();
}