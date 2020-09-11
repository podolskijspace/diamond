function declOfNum(number, words) {  
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}

function calculator () {
  const wrappers = document.querySelectorAll('.js-main-item'),
        counterWrapper = document.querySelector('.js-counter'),
        mainCounterWrapper = counterWrapper.querySelector('.js-count'),
        mainCostWrapper = counterWrapper.querySelector('.js-cost'),
        topCost = document.querySelector('.js-all-cost'),
        list = document.querySelector('.js-list-calc'),
        title = document.querySelector('.js-title-footer'),
        inputCost = document.querySelector('.js-input-cost>input'),
        inputPick = document.querySelector('.js-input-pick>input'),
        tabs = document.querySelectorAll('.js-accordion-module');

  tabs.forEach (tab => {
    let btn = tab.querySelector('.js-btn'),
        text = tab.querySelector('.js-text');

    btn.addEventListener('click', event => {
      if (tab.classList.contains('active')) {
        tab.classList.remove('active');
        text.textContent = 'Выбрать';
        tabs.forEach((item, i) => {
          if (item === tab) {
            wrappers[i].classList.add('inactive');
          }
        })
      }
      else {
        tab.classList.add('active');
        text.textContent = 'Выбрано';
        tabs.forEach((item, i) => {
          if (item === tab) {
            wrappers[i].classList.remove('inactive');
          }
        })
      }

      calcAll();
    })

    // calc();
  })

  let mainObj = {
        countersArr: [],
        costsArr: [],
      };

  function makeCalc (wrapperMain) {
    const checkboxMain = wrapperMain.querySelector('input');

    function makeSecondZero (wrapper) {
      const checkbox = wrapper.querySelector('input'),
            time = wrapper.querySelector('.js-time'),
            cost = wrapper.querySelector('.js-cost');

      checkbox.checked = false;
      time.textContent = 0;
      cost.textContent = '0 ₽';
    }

    function makeSecondChecked (wrapper) {
      const checkbox = wrapper.querySelector('input');

      checkbox.checked = true;
    }

    function makeThirdZero (wrapper) {  
      const checkbox = wrapper.querySelector('input');

      checkbox.checked = false;
    }

    function makeThirdChecked (wrapper) {  
      const checkbox = wrapper.querySelector('input');

      checkbox.checked = true;
    }

    function checkSecond () {
      let counter = 0;

      wrapperMain.querySelectorAll('.js-second-item').forEach(item => {
        if (item.querySelector('input').checked) {
          counter += 1;
        }
      });

      if (counter) {
        wrapperMain.querySelector('input').checked = true;
      }
      else {
        wrapperMain.querySelector('input').checked = false;
      }

      
    }

    function checkThird (wrapper) {
      let counter = 0;

      wrapper.querySelectorAll('.js-third-item').forEach(item => {
        if (item.querySelector('input').checked) {
          counter += 1;
        }
      });

      if (counter) {
        wrapper.querySelector('input').checked = true;
      }
      else {
        wrapper.querySelector('input').checked = false;
      }

      
    }

    wrapperMain.querySelectorAll('.js-second-item').forEach(wrapper => {
      wrapper.querySelector('input').addEventListener('change', function () {
        list.innerHTML = '';
        inputPick.value = '';
        if (this.checked) {
          wrapper.querySelectorAll('.js-third-item').forEach(item => {
            makeThirdChecked(item);
          });
        }
        else {
          wrapper.querySelectorAll('.js-third-item').forEach(item => {
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
        wrapperMain.querySelectorAll('.js-second-item').forEach(item => {
          makeSecondChecked(item);
        });

        wrapperMain.querySelectorAll('.js-third-item').forEach(item => {
          makeThirdChecked(item);
        });
      }
      else {
        wrapperMain.querySelector('.js-days').textContent = '0 дней';
        wrapperMain.querySelector('.js-hours').textContent = '0 часов';
        wrapperMain.querySelector('.js-cost').textContent = '0 ₽';
        
        wrapperMain.querySelectorAll('.js-second-item').forEach(item => {
          makeSecondZero(item);
        });

        wrapperMain.querySelectorAll('.js-third-item').forEach(item => {
          makeThirdZero(item);
        });
      }

      calcAll();
    });

    wrapperMain.querySelectorAll('.js-second-item').forEach(wrapper => {
      wrapper.querySelectorAll('.js-third-item').forEach(item => {
        let input = item.querySelector('input');
        
        input.addEventListener('change', event => {
          let checked = input.checked;
          list.innerHTML = '';
          inputPick.value = '';
          if (event.target.closest('.js-one-pick')) {
            wrapper.querySelectorAll('.js-third-item input').forEach(item => {
              if (item.dataset.name === input.dataset.name) {
                item.checked = false;
              }
            });
            input.checked = checked;
          }

          if (event.target.closest('.js-only-several')) {
            wrapper.querySelectorAll('.js-third-item input').forEach(item => {
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

  function addToFooter (array, costArray = []) {
    let items = list.querySelectorAll('li'),
        text = text[0] || 'random';
    array.forEach((item, i) => {
      list.innerHTML += `
      <li class="footer__item-calc">
        <div class="footer__wrapper-calc">
          ${item}
        </div>
      </li>
      `;

      inputPick.value += `${item} - ${costArray[i]}, <br> `;
    });
    
    if (!(items.length === 0 && text.textContent)) {
      list.classList.add('hidden');
      title.textContent = 'Обратная связь';
      NKH.order = mainCostWrapper.textContent;
      inputCost.value = NKH.order;
    } 
    else {
      list.classList.remove('hidden');
      title.textContent = 'Вы выбрали на сумму ' + mainCostWrapper.textContent;
      NKH.order = mainCostWrapper.textContent;
      inputCost.value = NKH.order;
    }
  }

  function calcAll () {
    list.innerHTML = '';
    inputPick.value = '';

    wrappers.forEach((wrapper, moduleNum) => {
      calc (wrapper, moduleNum);
    });
  }

  function calc (wrapperMain, moduleNum) {
    let mainCounterHours = 0,
        mainCounterCost = 0,
        days = 0,
        counter = 0,
        counterHaveMain = 0,
        counterAllMain = 0,
        arrayMain = [],
        arrayCostMain = [];

    wrapperMain.querySelectorAll('.js-second-item').forEach(wrapper => {
      let counterHours = 0,
          counterCost = 0,
          counterHoursAlt = 0,
          counterCostAlt = 0,
          counterAll = 0,
          counterHave = 0,
          array = [],
          arrayCost = [],
          costHelp;

      wrapper.querySelectorAll('.js-third-item').forEach(item => {
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
      }
      else if (counterHave > 0) {
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
    
    finalCalc ();

    if (counterHaveMain === counterAllMain) {
      addToFooter([wrapperMain.querySelector('.js-text').textContent.trim()], [wrapperMain.querySelector('.js-cost').textContent.trim()]);
    }
    else if (counterHaveMain > 0) {
      addToFooter(arrayMain, arrayCostMain);
    }

    addToFooter([]);
  }

  function finalCalc () {
    let counter = 0,
        cost = 0;
    mainObj.countersArr.forEach((item, i) => {
      counter += +mainObj.countersArr[i].textContent;
      cost += parseFloat(mainObj.costsArr[i].textContent.replace(/\s+/g, ''));
    });
    cost += " ₽";
    cost = cost.slice(0, cost.length - 5) + ' ' + cost.slice(cost.length - 5, cost.length);
    mainCounterWrapper.textContent = counter;
    mainCostWrapper.textContent = cost;
    // topCost.textContent = cost;
  }

  wrappers.forEach(wrapper => {
    mainObj.countersArr[mainObj.countersArr.length] = wrapper.querySelector('.js-count');
    mainObj.costsArr[mainObj.costsArr.length] = wrapper.querySelector('.js-cost');
    makeCalc(wrapper);
  });

  calcAll();
}