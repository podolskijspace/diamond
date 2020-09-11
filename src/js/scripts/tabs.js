const tabs = () => {
	const btns = document.querySelectorAll('[data-tabclass]');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const contentData = btn.getAttribute('data-tabclass');
      const btnNumberData = btn.getAttribute('data-tabnumber');
      const contentNodes = document.querySelectorAll(`.${contentData}`);
      const btnSiblings = getSiblings(btn);

      // toggle btn class
      btnSiblings.forEach((btnSibling) => {
        btnSibling.classList.remove('active');
      });

      btn.classList.add('active');

      // toggle contentNodes
      contentNodes.forEach((contentNode) => {
        const items = Array.from(contentNode.children);

        items.forEach((item) => {
          const itemNumberData = item.getAttribute('data-tabnumber');
          const isNumberEqual = itemNumberData == btnNumberData;

          if(isNumberEqual) {
            const siblings = getSiblings(item);

            siblings.forEach((sibling) => {
              sibling.classList.remove('active');
            });

            item.classList.add('active');
          }
        });
      });
    });
  });
};
