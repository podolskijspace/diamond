const carousel = () => {
  const sliders = document.querySelectorAll('.js-carousel');

  sliders.forEach((slider) => {
    const section = slider.closest('.js-carousel-section');
    const container = section.querySelector('.js-carousel-container');
    const nav = section.querySelector('.js-carousel-nav');
    const sectionContainer = slider.closest('.portfolio__container');
    let options;
    const arrows = section.querySelector('.js-carousel-nav');
    const items = section.querySelectorAll('.carousel__li').length;
    const arr = [
      {
        size: 320,
        amount: 1,
      },
      {
        size: 370,
        amount: 2,
      },
      {
        size: 570,
        amount: 3,
      },
      {
        size: 770,
        amount: 4,
      },
      {
        size: 1065,
        amount: 5,
      },
      {
        size: 1430,
        amount: 6,
      },
      {
        size: 1880,
        amount: 7,
      },
    ]

    const checkAnswer = () => {
      let answer = 'check';

      arr.forEach((notUse, i) => {
        let item = arr[arr.length - i - 1];
        
        if (window.screen.width >=item.size && answer === 'check') {
          answer = item.amount < items;
        }
      })
  
      if (!answer) {
        options = {
          dots: false,
          infinite: false,
          draggable: false,
          speed: 400,
          variableWidth: true,
          appendArrows: $(nav),
          prevArrow: '<button type="button" class="carousel__nav-btn carousel__nav-btn--prev"><svg class="icon icon-arrow-prev carousel__nav-icon"><use xlink:href="#arrow-prev"></use></svg></button>',
          nextArrow: '<button type="button" class="carousel__nav-btn carousel__nav-btn--next"><svg class="icon icon-arrow-next carousel__nav-icon"><use xlink:href="#arrow-next"></use></svg></button>',
        };

        arrows.classList.add('hidden');
      }
      else {
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
    }

    const updateContainerWidth = () => {
      const updatedContainerWidth = sectionContainer.getBoundingClientRect().right;
      container.setAttribute('style', `width: ${updatedContainerWidth}px`);
    };

    updateContainerWidth();

    

    window.addEventListener('resize', () => {
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
  })
};
