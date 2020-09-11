function addFile () {
  let item = document.querySelector('.js-file'),
      input = item.querySelector('input'),
      span = item.querySelector('span');

  item.addEventListener('change', event => {
    if (event.srcElement.files.length === 0) {
      span.textContent = 'Добавить файл'
    }
    else if (event.srcElement.files.length === 1) {
      span.textContent = event.srcElement.files[0].name;
    }
    else {
      span.textContent = `Вы добавили ${event.srcElement.files.length} файлов`
    }
  })
}