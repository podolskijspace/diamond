'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var ancors = function ancors() {
    var links = document.querySelectorAll('.js-ancor-link');

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        var elemData = link.getAttribute('href');
        var elem = document.querySelector('' + elemData);
        var elemCoords = getCoords(elem);
        var finalCoords = elemCoords.top - 100;

        $("html, body").animate({ scrollTop: finalCoords });
      });
    });
  };

  function popupPhoto() {
    var itemsSlider = document.querySelectorAll('.js-show-scale'),
        itemsAccordion = document.querySelectorAll('.js-show-accordion'),
        popup = document.querySelector('.js-popup-scale'),
        imgPopup = popup.querySelector('img'),
        textPopup = popup.querySelector('span');

    itemsSlider.forEach(function (item) {
      var img = item.querySelector('img'),
          text = item.querySelector('.js-text');

      showPopup(img, img.src, text);
    });

    itemsAccordion.forEach(function (item) {
      if (!item.classList.contains('disabled')) {
        showPopup(item, item.dataset.img, false);
      }
    });

    function showPopup(btn, src, text) {
      btn.addEventListener('click', function (event) {
        imgPopup.src = src;
        if (text) {
          textPopup.textContent = text.textContent;
        } else {
          textPopup.textContent = '';
        }

        popup.classList.add('active');
        NKH.body.classList.add('fixed');
      });
    }

    popup.addEventListener('click', function (event) {
      popup.classList.remove('active');
      NKH.body.classList.remove('fixed');
    });
  }
  function popup() {
    var popup = document.querySelectorAll('.js-popup');

    popup.forEach(function (item) {
      item.addEventListener('click', function (event) {
        console.log(!event.target.closest('.js-dont-close'));
        if (event.target.closest('.js-close') || !event.target.closest('.js-dont-close')) {
          item.classList.remove('active');
          NKH.body.classList.remove('fixed');
        }
      });
    });

    showPopup(document.querySelector('.js-menu-btn'), document.querySelector('.js-menu'));

    function showPopup(btn, popup) {
      btn.addEventListener('click', function (event) {
        popup.classList.add('active');
        NKH.body.classList.add('fixed');
      });
    }
  }
  var tabs = function tabs() {
    var btns = document.querySelectorAll('[data-tabclass]');

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var contentData = btn.getAttribute('data-tabclass');
        var btnNumberData = btn.getAttribute('data-tabnumber');
        var contentNodes = document.querySelectorAll('.' + contentData);
        var btnSiblings = getSiblings(btn);

        // toggle btn class
        btnSiblings.forEach(function (btnSibling) {
          btnSibling.classList.remove('active');
        });

        btn.classList.add('active');

        // toggle contentNodes
        contentNodes.forEach(function (contentNode) {
          var items = Array.from(contentNode.children);

          items.forEach(function (item) {
            var itemNumberData = item.getAttribute('data-tabnumber');
            var isNumberEqual = itemNumberData == btnNumberData;

            if (isNumberEqual) {
              var siblings = getSiblings(item);

              siblings.forEach(function (sibling) {
                sibling.classList.remove('active');
              });

              item.classList.add('active');
            }
          });
        });
      });
    });
  };

  var NKH = {};
  NKH.body = document.querySelector('body');
  NKH.ESC_CODE = 27;
  NKH.siteContent = document.querySelector('.site-content');
  NKH.footer = document.querySelector('.page-footer');
  NKH.isIe11 = !!window.MSInputMethodContext && !!document.documentMode;

  if (NKH.isIe11) {
    NKH.body.classList.add('ie11');
  }

  var getSiblings = function getSiblings(elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;

    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    return siblings;
  };

  function top_walker(node, test_func, last_parent) {
    while (node && node !== last_parent) {
      if (test_func(node)) {
        return node;
      }
      node = node.parentNode;
    }
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  var onPageRdy = function onPageRdy() {
    tabs();
    popup();

    // specific
    ancors();
  };

  onPageRdy();
});
//# sourceMappingURL=main.js.map
