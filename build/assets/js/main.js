'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var accordion = function accordion() {
    var btns = document.querySelectorAll('.js-accordion-btn'),
        itemsSecond = document.querySelectorAll('.js-second-item');

    btns.forEach(function (btn) {
      var parentItem = btn.closest('.js-accordion-item');

      btn.addEventListener('click', function () {
        var itemSiblings = getSiblings(parentItem);
        var isActive = parentItem.classList.contains('fixed'),
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
        var btnCoords = getCoords(btn);

        // window.scroll({
        //   top: btnCoords.top - 100,
        //   behavior: 'smooth'
        // });
      });

      function checkSize() {

        if (window.screen.width <= 980) {
          itemsSecond.forEach(function (item) {
            item.classList.remove('fixed');
            item.classList.remove('active');
          });
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

  var carousel = function carousel() {
    var sliders = document.querySelectorAll('.js-carousel');

    sliders.forEach(function (slider) {
      var section = slider.closest('.js-carousel-section');
      var container = section.querySelector('.js-carousel-container');
      var nav = section.querySelector('.js-carousel-nav');
      var sectionContainer = slider.closest('.portfolio__container');
      var options = void 0;
      var arrows = section.querySelector('.js-carousel-nav');
      var items = section.querySelectorAll('.carousel__li').length;
      var arr = [{
        size: 320,
        amount: 1
      }, {
        size: 370,
        amount: 2
      }, {
        size: 570,
        amount: 3
      }, {
        size: 770,
        amount: 4
      }, {
        size: 1065,
        amount: 5
      }, {
        size: 1430,
        amount: 6
      }, {
        size: 1880,
        amount: 7
      }];

      var checkAnswer = function checkAnswer() {
        var answer = 'check';

        arr.forEach(function (notUse, i) {
          var item = arr[arr.length - i - 1];

          if (window.screen.width >= item.size && answer === 'check') {
            answer = item.amount < items;
          }
        });

        if (!answer) {
          options = {
            dots: false,
            infinite: false,
            draggable: false,
            speed: 400,
            variableWidth: true,
            appendArrows: $(nav),
            prevArrow: '<button type="button" class="carousel__nav-btn carousel__nav-btn--prev"><svg class="icon icon-arrow-prev carousel__nav-icon"><use xlink:href="#arrow-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="carousel__nav-btn carousel__nav-btn--next"><svg class="icon icon-arrow-next carousel__nav-icon"><use xlink:href="#arrow-next"></use></svg></button>'
          };

          arrows.classList.add('hidden');
        } else {
          options = {
            dots: false,
            infinite: false,
            speed: 400,
            variableWidth: true,
            appendArrows: $(nav),
            prevArrow: '<button type="button" class="carousel__nav-btn carousel__nav-btn--prev"><svg class="icon icon-arrow-prev carousel__nav-icon"><use xlink:href="#arrow-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="carousel__nav-btn carousel__nav-btn--next"><svg class="icon icon-arrow-next carousel__nav-icon"><use xlink:href="#arrow-next"></use></svg></button>',
            autoplay: false,
            autoplaySpeed: 5000
          };

          arrows.classList.remove('hidden');
        }

        $(slider).slick(options);
      };

      var updateContainerWidth = function updateContainerWidth() {
        var updatedContainerWidth = sectionContainer.getBoundingClientRect().right;
        container.setAttribute('style', 'width: ' + updatedContainerWidth + 'px');
      };

      updateContainerWidth();

      window.addEventListener('resize', function () {
        updateContainerWidth();
        $(slider).slick('unslick');
        checkAnswer();
      });

      checkAnswer();
    });

    $('.js-slider').slick({
      infinite: true,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000
    });
  };

  function declOfNum(number, words) {
    return words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]];
  }

  function calculator() {
    var wrappers = document.querySelectorAll('.js-main-item'),
        counterWrapper = document.querySelector('.js-counter'),
        mainCounterWrapper = counterWrapper.querySelector('.js-count'),
        mainCostWrapper = counterWrapper.querySelector('.js-cost'),
        topCost = document.querySelector('.js-all-cost'),
        list = document.querySelector('.js-list-calc'),
        title = document.querySelector('.js-title-footer'),
        inputCost = document.querySelector('.js-input-cost>input'),
        inputPick = document.querySelector('.js-input-pick>input'),
        tabs = document.querySelectorAll('.js-accordion-module');

    tabs.forEach(function (tab) {
      var btn = tab.querySelector('.js-btn'),
          text = tab.querySelector('.js-text');

      btn.addEventListener('click', function (event) {
        if (tab.classList.contains('active')) {
          tab.classList.remove('active');
          text.textContent = 'Выбрать';
          tabs.forEach(function (item, i) {
            if (item === tab) {
              wrappers[i].classList.add('inactive');
            }
          });
        } else {
          tab.classList.add('active');
          text.textContent = 'Выбрано';
          tabs.forEach(function (item, i) {
            if (item === tab) {
              wrappers[i].classList.remove('inactive');
            }
          });
        }

        calcAll();
      });

      // calc();
    });

    var mainObj = {
      countersArr: [],
      costsArr: []
    };

    function makeCalc(wrapperMain) {
      var checkboxMain = wrapperMain.querySelector('input');

      function makeSecondZero(wrapper) {
        var checkbox = wrapper.querySelector('input'),
            time = wrapper.querySelector('.js-time'),
            cost = wrapper.querySelector('.js-cost');

        checkbox.checked = false;
        time.textContent = 0;
        cost.textContent = '0 ₽';
      }

      function makeSecondChecked(wrapper) {
        var checkbox = wrapper.querySelector('input');

        checkbox.checked = true;
      }

      function makeThirdZero(wrapper) {
        var checkbox = wrapper.querySelector('input');

        checkbox.checked = false;
      }

      function makeThirdChecked(wrapper) {
        var checkbox = wrapper.querySelector('input');

        checkbox.checked = true;
      }

      function checkSecond() {
        var counter = 0;

        wrapperMain.querySelectorAll('.js-second-item').forEach(function (item) {
          if (item.querySelector('input').checked) {
            counter += 1;
          }
        });

        if (counter) {
          wrapperMain.querySelector('input').checked = true;
        } else {
          wrapperMain.querySelector('input').checked = false;
        }
      }

      function checkThird(wrapper) {
        var counter = 0;

        wrapper.querySelectorAll('.js-third-item').forEach(function (item) {
          if (item.querySelector('input').checked) {
            counter += 1;
          }
        });

        if (counter) {
          wrapper.querySelector('input').checked = true;
        } else {
          wrapper.querySelector('input').checked = false;
        }
      }

      wrapperMain.querySelectorAll('.js-second-item').forEach(function (wrapper) {
        wrapper.querySelector('input').addEventListener('change', function () {
          list.innerHTML = '';
          inputPick.value = '';
          if (this.checked) {
            wrapper.querySelectorAll('.js-third-item').forEach(function (item) {
              makeThirdChecked(item);
            });
          } else {
            wrapper.querySelectorAll('.js-third-item').forEach(function (item) {
              makeThirdZero(item);
            });
          }

          checkSecond();
          calcAll();
        });
      });

      checkboxMain.addEventListener('change', function (event) {
        list.innerHTML = '';
        inputPick.value = '';

        if (this.checked) {
          wrapperMain.querySelectorAll('.js-second-item').forEach(function (item) {
            makeSecondChecked(item);
          });

          wrapperMain.querySelectorAll('.js-third-item').forEach(function (item) {
            makeThirdChecked(item);
          });
        } else {
          wrapperMain.querySelector('.js-days').textContent = '0 дней';
          wrapperMain.querySelector('.js-hours').textContent = '0 часов';
          wrapperMain.querySelector('.js-cost').textContent = '0 ₽';

          wrapperMain.querySelectorAll('.js-second-item').forEach(function (item) {
            makeSecondZero(item);
          });

          wrapperMain.querySelectorAll('.js-third-item').forEach(function (item) {
            makeThirdZero(item);
          });
        }

        calcAll();
      });

      wrapperMain.querySelectorAll('.js-second-item').forEach(function (wrapper) {
        wrapper.querySelectorAll('.js-third-item').forEach(function (item) {
          var input = item.querySelector('input');

          input.addEventListener('change', function (event) {
            var checked = input.checked;
            list.innerHTML = '';
            inputPick.value = '';
            if (event.target.closest('.js-one-pick')) {
              wrapper.querySelectorAll('.js-third-item input').forEach(function (item) {
                if (item.dataset.name === input.dataset.name) {
                  item.checked = false;
                }
              });
              input.checked = checked;
            }

            if (event.target.closest('.js-only-several')) {
              wrapper.querySelectorAll('.js-third-item input').forEach(function (item) {
                if (item.dataset.name === input.dataset.name) {
                  item.checked = checked;
                }
              });
            }

            checkThird(wrapper);
            checkSecond();
            calcAll();
          });

          // item.querySelector('.js-btn-add').addEventListener('click', event => {
          //   if (input.checked) {
          //   }
          //   else {
          //     input.checked = true;
          //     checkThird(wrapper);
          //     checkSecond();
          //     calcAll();
          //   }
          // })
        });
      });
    }

    function addToFooter(array) {
      var costArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var items = list.querySelectorAll('li'),
          text = text[0] || 'random';
      array.forEach(function (item, i) {
        list.innerHTML += '\n        <li class="footer__item-calc">\n          <div class="footer__wrapper-calc">\n            ' + item + '\n          </div>\n        </li>\n        ';

        inputPick.value += item + ' - ' + costArray[i] + ', <br> ';
      });

      if (!(items.length === 0 && text.textContent)) {
        list.classList.add('hidden');
        title.textContent = 'Обратная связь';
        NKH.order = mainCostWrapper.textContent;
        inputCost.value = NKH.order;
      } else {
        list.classList.remove('hidden');
        title.textContent = 'Вы выбрали на сумму ' + mainCostWrapper.textContent;
        NKH.order = mainCostWrapper.textContent;
        inputCost.value = NKH.order;
      }
    }

    function calcAll() {
      list.innerHTML = '';
      inputPick.value = '';

      wrappers.forEach(function (wrapper, moduleNum) {
        calc(wrapper, moduleNum);
      });
    }

    function calc(wrapperMain, moduleNum) {
      var mainCounterHours = 0,
          mainCounterCost = 0,
          days = 0,
          counter = 0,
          counterHaveMain = 0,
          counterAllMain = 0,
          arrayMain = [],
          arrayCostMain = [];

      wrapperMain.querySelectorAll('.js-second-item').forEach(function (wrapper) {
        var counterHours = 0,
            counterCost = 0,
            counterHoursAlt = 0,
            counterCostAlt = 0,
            counterAll = 0,
            counterHave = 0,
            array = [],
            arrayCost = [],
            costHelp = void 0;

        wrapper.querySelectorAll('.js-third-item').forEach(function (item) {
          if (item.querySelector('input').checked && !item.closest('.inactive') && !item.querySelector('.js-not-count')) {
            counterHours += parseFloat(item.querySelector('.js-time').textContent.replace(/\s+/g, ''));
            counterCost += parseFloat(item.querySelector('.js-cost').textContent.replace(/\s+/g, ''));
            counter += 1;
            counterHave += 1;
            array.push(item.querySelector('.js-text').textContent.trim());
            arrayCost.push(item.querySelector('.js-cost').textContent.trim());
          }
          counterAll += 1;
          counterHoursAlt += parseFloat(item.querySelector('.js-time').textContent.replace(/\s+/g, ''));
          counterCostAlt += parseFloat(item.querySelector('.js-cost').textContent.replace(/\s+/g, ''));
        });

        counterAllMain += 1;

        if (counterHave === counterAll) {
          counterHaveMain += 1;
          arrayMain.push(wrapper.querySelector('.js-text').textContent.trim());
          arrayCostMain.push(wrapper.querySelector('.js-cost').textContent.trim());
        } else if (counterHave > 0) {
          addToFooter(array, arrayCost);
        }

        wrapper.querySelector('.js-time').textContent = counterHoursAlt;
        counterCost += " ₽";
        counterCost = counterCost.slice(0, counterCost.length - 5) + ' ' + counterCost.slice(counterCost.length - 5, counterCost.length);
        counterCostAlt += " ₽";
        counterCostAlt = counterCostAlt.slice(0, counterCostAlt.length - 5) + ' ' + counterCostAlt.slice(counterCostAlt.length - 5, counterCostAlt.length);
        wrapper.querySelector('.js-cost').textContent = counterCostAlt;

        mainCounterHours += counterHours;
        mainCounterCost += parseFloat(counterCost.replace(/\s+/g, ''));

        // if (!tabs[moduleNum].classList.contains('js-not-count')) {
        //   costHelp = mainCounterCost + ' ₽'
        //   tabs[moduleNum].querySelector('.js-value').textContent = costHelp.slice(0, costHelp.length - 5) + ' ' + costHelp.slice(costHelp.length - 5, costHelp.length);
        // }
      });

      mainCounterHours = Math.ceil(mainCounterHours);
      wrapperMain.querySelector('.js-hours').textContent = mainCounterHours + ' ' + declOfNum(mainCounterHours, ['час', 'часа', 'часов']);

      days = Math.ceil(mainCounterHours / 8);
      wrapperMain.querySelector('.js-days').textContent = days + ' ' + ' ' + declOfNum(days, ['день', 'дня', 'дней']);

      mainCounterCost += " ₽";
      mainCounterCost = mainCounterCost.slice(0, mainCounterCost.length - 5) + ' ' + mainCounterCost.slice(mainCounterCost.length - 5, mainCounterCost.length);
      wrapperMain.querySelector('.js-cost').textContent = mainCounterCost;

      wrapperMain.querySelector('.js-count').textContent = counter;

      finalCalc();

      if (counterHaveMain === counterAllMain) {
        addToFooter([wrapperMain.querySelector('.js-text').textContent.trim()], [wrapperMain.querySelector('.js-cost').textContent.trim()]);
      } else if (counterHaveMain > 0) {
        addToFooter(arrayMain, arrayCostMain);
      }

      addToFooter([]);
    }

    function finalCalc() {
      var counter = 0,
          cost = 0;
      mainObj.countersArr.forEach(function (item, i) {
        counter += +mainObj.countersArr[i].textContent;
        cost += parseFloat(mainObj.costsArr[i].textContent.replace(/\s+/g, ''));
      });
      cost += " ₽";
      cost = cost.slice(0, cost.length - 5) + ' ' + cost.slice(cost.length - 5, cost.length);
      mainCounterWrapper.textContent = counter;
      mainCostWrapper.textContent = cost;
      // topCost.textContent = cost;
    }

    wrappers.forEach(function (wrapper) {
      mainObj.countersArr[mainObj.countersArr.length] = wrapper.querySelector('.js-count');
      mainObj.costsArr[mainObj.costsArr.length] = wrapper.querySelector('.js-cost');
      makeCalc(wrapper);
    });

    calcAll();
  }
  function input() {
    var wrappers = document.querySelectorAll('.js-input');

    wrappers.forEach(function (wrapper) {
      var input = wrapper.querySelector('input');

      if (input) {
        input.addEventListener('focus', function () {
          wrapper.classList.add('active');
        });

        input.addEventListener('blur', function () {
          if (!input.value.length) {
            wrapper.classList.remove('active');
          }
        });
      } else {
        var textarea = wrapper.querySelector('textarea');
        textarea.value = textarea.value.trim();

        textarea.addEventListener('focus', function () {
          wrapper.classList.add('active');
        });

        textarea.addEventListener('blur', function () {
          if (!textarea.value.trim().length) {
            wrapper.classList.remove('active');
          }
        });
      }
    });
  }
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

  var phoneMask = function phoneMask() {
    $('.js-phone-mask').mask('+7 (000) 000-00-00');
  };

  function form() {
    document.getElementById('form').addEventListener('submit', function (event) {
      event.preventDefault();
      setTimeout(function () {
        if (!document.querySelector('.parsley-errors-list li')) {
          NKH.order = parseFloat(NKH.order.replace(/\s+/g, ''));
          var ask = document.querySelector('.js-title-footer').textContent.trim() === 'Обратная связь';
          $.post('send.php', // адрес обработчика
          $("#form").serialize(), // отправляемые данные          

          function (msg) {
            // получен ответ сервера 
            document.querySelector('.popup-footer').classList.add('active');
            NKH.body.classList.add('fixed');

            if (ask) {
              var goalParams = {
                order_price: NKH.order,
                currency: "RUB"
              };

              ym(65567878, 'reachGoal', 'send_form_without_calculator', goalParams);

              gtag('event', 'generate_lead', {
                'event_label': 'send_form_without_calculator',
                'value': NKH.order
              });
            } else {
              var goalParams = {
                order_price: NKH.order,
                currency: "RUB"
              };

              ym(65567878, 'reachGoal', 'send_form_with_calculator', goalParams);

              gtag('event', 'generate_lead', {
                'event_label': 'send_form_with_calculator',
                'value': NKH.order
              });
            }
          });
          return false;
        }
      }, 500);
    });
  }
  function addFile() {
    var item = document.querySelector('.js-file'),
        input = item.querySelector('input'),
        span = item.querySelector('span');

    item.addEventListener('change', function (event) {
      if (event.srcElement.files.length === 0) {
        span.textContent = 'Добавить файл';
      } else if (event.srcElement.files.length === 1) {
        span.textContent = event.srcElement.files[0].name;
      } else {
        span.textContent = '\u0412\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 ' + event.srcElement.files.length + ' \u0444\u0430\u0439\u043B\u043E\u0432';
      }
    });
  }
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
        if (event.target.closest('.js-close') || !event.target.closest('.popup__wrapper')) {
          item.classList.remove('active');
          NKH.body.classList.remove('fixed');
        }
      });
    });
  }
  function showArrow() {
    var line = document.getElementById('why'),
        arrow = document.querySelector('.js-arrow-up');

    window.addEventListener('scroll', function (event) {

      if (line.offsetTop < window.pageYOffset + 200) {
        arrow.classList.add('active');
      } else {
        arrow.classList.remove('active');
      }
    });
  }
  function jsSeveral() {
    var items = document.querySelectorAll('.js-only-several>input');

    var name = items[0].dataset.name,
        i = 0;

    items.forEach(function (item, j) {
      i++;

      if (item.dataset.name !== name) {
        i = 0;
        name = item.dataset.name;
      }

      if (i !== 0 && j !== 0) {
        item.closest('label').style.display = 'none';
      }
    });
  }
  function changeColor() {
    var item = document.querySelector('.js-change-color'),
        line = document.querySelector('.js-check-line');

    function checkLine() {
      if (line.clientHeight - item.clientHeight === item.offsetTop) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }

    document.addEventListener('scroll', checkLine);

    checkLine();
  }
  function accordionPopup() {
    var wrappers = document.querySelectorAll('.js-popup-wrapper');

    wrappers.forEach(function (wrapper) {
      wrapper.addEventListener('mouseenter', function (event) {
        var item = wrapper.querySelector('.js-popup');

        if (event.screenY - 150 < item.offsetHeight) {
          wrapper.classList.add('down');
        } else {
          wrapper.classList.remove('down');
        }
      });
    });
  };
  var headerScroll = function headerScroll() {
    window.addEventListener('scroll', function (e) {
      var scrollTop = window.pageYOffset;
      var isActive = scrollTop > 50;
      var header = document.querySelector('.js-page-header');

      if (isActive) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    });
  };

  var parallax = function parallax() {
    var p = new Parallax('.parallax').init();
  };

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

  var wow = function wow() {
    var wowInit = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    });

    wowInit.init();
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

    // specific
    ancors();
  };

  onPageRdy();
});
//# sourceMappingURL=main.js.map
