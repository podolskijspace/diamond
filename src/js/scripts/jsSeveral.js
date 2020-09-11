function jsSeveral () {
  const items = document.querySelectorAll('.js-only-several>input');

  let name = items[0].dataset.name,
      i = 0;

  items.forEach((item, j) => {
    i++;
    
    if (item.dataset.name !== name) {
      i = 0;
      name = item.dataset.name;
    }
    
    if (i !== 0 && j !== 0) {
      item.closest('label').style.display = 'none';
    }
  })
}