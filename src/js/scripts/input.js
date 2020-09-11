function input () {
  const wrappers = document.querySelectorAll('.js-input');

  wrappers.forEach(wrapper => {
    const input = wrapper.querySelector('input');

    if (input) {
      input.addEventListener('focus', () => {
        wrapper.classList.add('active');
      });

      input.addEventListener('blur', () => {
        if (!input.value.length) {
          wrapper.classList.remove('active');
        }
      })
    } 
    else {
      const textarea = wrapper.querySelector('textarea');
      textarea.value = textarea.value.trim();
      
      textarea.addEventListener('focus', () => {
        wrapper.classList.add('active');
      });

      textarea.addEventListener('blur', () => {
        if (!textarea.value.trim().length) {
          wrapper.classList.remove('active');
        }
      })
    }


    
  })
}