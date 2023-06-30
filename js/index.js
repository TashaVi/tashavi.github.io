// import inputmask from 'inputmask';
// import noUiSlider from 'nouislider';


//swipers
const usefulSwiper = new Swiper(".js-useful-swiper", {
  resizeObserver: true,
  updateOnWindowResize: true,
  direction: "horizontal",
  slidesPerColumn: 1,
  slidesPerView: "auto",
  spaceBetween: 32,

  navigation: {
    nextEl: ".js-useful-next",
    prevEl: ".js-useful-prev",
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },

  breakpoints: {
    320: {
      slidesPerGroup: 1,
      spaceBetween: 16,
    },
    570: {
      slidesPerGroup: 2,
      spaceBetween: 32,
    },
    1023: {
      slidesPerGroup: 3,
    },
  },
});

const swiper = new Swiper('.js-promo-swiper', {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

const offersSwiper = new Swiper(".js-special-offers-swiper", {
  resizeObserver: true,
  updateOnWindowResize: true,
  direction: "horizontal",
  slidesPerColumn: 1,
  slidesPerView: "auto",
  spaceBetween: 32,
  autoHeight: true,

  navigation: {
    nextEl: ".js-special-offers-next",
    prevEl: ".js-special-offers-prev",
  },

  breakpoints: {
    320: {
      slidesPerGroup: 1,
    },
    570: {
      slidesPerGroup: 2,
    },
    1023: {
      slidesPerGroup: 3,
    },
  },
});


//new select 
const element = document.querySelector('#city-select');
  const choices = new Choices(element,{
    allowHTML: true,
    searchEnabled: false,
    placeholder: true,
    itemSelectText: '',
  });
//end new select


// const choices = new Choices("[data-trigger]", {
//  searchEnabled: false,
//  itemSelectText: "",
// });

const selectchoices = new Choices("#header-bottom__select", {
searchEnabled: false,
 itemSelectText: "",
});





//burger
const burger = document.querySelector(".js-burger");
const headerNav = document.querySelector(".header__nav");

function closeMenu() {
  burger.classList.remove("active");
  headerNav.classList.remove("active");
}

function openMenu() {
  burger.classList.add("active");
  headerNav.classList.add("active");
}

if (burger) {
  document.body.addEventListener("click", (e) => {
    const target = e.target;

    if (!target.closest(".active")) {
      closeMenu();
    }
  });

  burger.addEventListener("click", () => {
    if (burger.classList.contains("active")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  window.addEventListener("resize", () => {
    closeMenu();
  });
}




//validation

// const validation = new JustValidate('.js-form');
//         const selector = document.querySelector("input[type='tel']");
//         const im = new Inputmask("+7 (999)-999-99-99");
//         im.mask(selector);
      
//         validation
//           .addField('.name', [{
//               rule: 'minLength',
//               value: 2,
//               errorMessage: "Вы не ввели имя"
//             },
//             {
//               rule: 'maxLength',
//               value: 25,
//               errorMessage: "Вы не ввели имя"
//             }
//           ])
//           .addField('.mail', [{
//               rule: 'required',
//               errorMessage: 'Вы не ввели e-mail',
//             },
//             {
//               rule: 'email',
//               errorMessage: 'Вы не ввели e-mail',
//             }
//           ])
//           .addField('.tel', [{
//             rule: "function",
//             validator: function (name, value) {
//               const phone = selector.inputmask.unmaskedvalue();
              
//               return Number(phone) && phone.length === 10;
//             },
//             errorMessage: 'Вы не ввели телефон',
//           }]);

          const phoneInput = document.getElementById("tel");

          if (phoneInput) {
            const im = new Inputmask("+7 (999)-999-99-99");
            im.mask(phoneInput);
          }
          
          const form = document.querySelector(".js-form");
          
          if (form) {
            const popup = document.querySelector(".js-popup-call");
            new JustValidate(".js-form", {
              rules: {
                name: {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                },
                tel: {
                  required: true,
                  function: () => {
                    const phone = phoneInput.inputmask.unmaskedvalue();
                    return Number(phone) && phone.length === 10;
                  },
                },
                mail: {
                  required: true,
                  email: true,
                },
                checkbox: {
                  required: true,
                },
              },
              focusWrongField: true,
              messages: {
                name: {
                  required: '"Имя" обязательно для заполнения',
                  minLength: '"Имя" введено некорректно, минимум 2 знака',
                  maxLength: '"Имя" введено некорректно, максимум 20 знаков',
                },
                tel: {
                  required: '"Телефон" обязательно для заполнения',
                  function: 'Заполните "Телефон"',
                },
                email: {
                  required: '"Email" обязательно для заполнения',
                  email: 'Недопустимый формат "Email"',
                },
                checkbox: {
                  required: 'Необходимо принять "Пользовательское соглашение"',
                },
              },
            
              submitHandler: (form) => {
                const formData = new FormData(form);
                const xhr = new XMLHttpRequest();
                const body = document.querySelector("body");
          
                xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                      body.style.overflow = "hidden";
                      popup.classList.add("active");
          
                      form.reset();
                      
                      const popupForm = document.querySelector(".js-popup-form");
                      if(popupForm) popupForm.classList.remove("active");
                    }
                  }
                };
                xhr.open("POST", "https://", true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(new URLSearchParams(formData).toString());
              },
            });
          
            const inputs = document.querySelectorAll(".feedback__input");
            const button = document.querySelector(".js-submit");
            button.addEventListener("click", () => {
              inputs.forEach((el) => {
                if (!el.classList.contains("js-validate-error-field"))
                  el.classList.add("js-validate-success-field");
              });
            });
          }

          //show-more
           const fadeIn = (el, timeout, className) => {
            el.style.opacity = 0;
            el.classList.add(className);
            //el.style.display = display || 'block';
            el.style.transition = `opacity ${timeout}ms`;
           
            setTimeout(() => {
              el.style.opacity = 1;
            }, 10);
           };
           
           const fadeOut = (el, timeout, className) => {
             el.style.opacity = 1;
             el.style.transition = `opacity ${timeout}ms`;
             el.style.opacity = 0;
           
             setTimeout(() => {
               //el.style.display = 'none';
               el.classList.remove(className);
             }, timeout);
            };
           
           //show more index.html 
           const showMoreBtn = document.querySelector(".js-show-more");
const allRatingCards = document.querySelectorAll(".rating__item");

if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    if (showMoreBtn.classList.contains("js-active")) {
      allRatingCards.forEach((el) => {
        el.classList.remove("show-card");
        //fadeOut(el, 1000, "show-card");
      });

      showMoreBtn.classList.remove("js-active");
      showMoreBtn.textContent = "Смотреть больше товаров";
    } else {
      allRatingCards.forEach((el) => {
        //el.classList.add("show-card");
        fadeIn(el, 1000, "show-card");
      });

      showMoreBtn.classList.add("js-active");
      showMoreBtn.textContent = "Свернуть";
    }
  });
}
//end show more index.html

//show more catalog 
        
          const limitShowItems = 9;

          const showMore = (el) => {
            const showMoreBtn = el.target;
            const container = showMoreBtn.closest(".js-items-container");
            const items = container.querySelectorAll(".catalog-filter__item");

  if (showMoreBtn.classList.contains("js-active")) {
    if (container) {
      items.forEach((el) => {
        el.classList.remove("show-item");
      });

      showMoreBtn.classList.remove("js-active");
      showMoreBtn.textContent = `еще +${items.length - limitShowItems}`;
    }
  } else {
    items.forEach((el) => {
      fadeIn(el, 1000, "show-item");
    });

    showMoreBtn.classList.add("js-active");
    showMoreBtn.textContent = "Скрыть";
  }
};

const allItems = document.querySelectorAll(".js-catalog-more");
allItems.forEach((el) => {
  el.addEventListener("click", (el) => showMore(el));
});

//end show_more catalog


//sliders products
const productSliderNav = new Swiper(".slider-nav", {
  resizeObserver: true,
  updateOnWindowResize: true,
  slideClass: "slider-nav__item",
  direction: "horizontal",
  freeMode: true,
  breakpoints: {
    1025: {
      direction: "horizontal",
      slidesPerView: 4,
      spaceBetween: 20,
    },
    890: {
      direction: "vertical",
      spaceBetween: 20,
      slidesPerView: 4,
    },
    695: {
      slidesPerView: 4,
      direction: "vertical",
      spaceBetween: 20,
    },
    320: {
      direction: "horizontal",
      slidesPerView: "auto",
      spaceBetween: 5,
    },
  },
});

const productSlider = new Swiper(".product-slider", {
  resizeObserver: true,
  updateOnWindowResize: true,
  slideClass: "product-slider__item",
  slidesPerView: 1,
  initialSlide: 4,
  spaceBetween: 10,
  mousewheel: true,
  grabCursor: true,
  thumbs: {
    swiper: productSliderNav,
  },
});

const sliderThumbs = new Swiper('.modal-thumbs__slider-container', {
  resizeObserver: true,
  updateOnWindowResize: true,
  slideClass: 'modal-thumbs__slide',
  spaceBetween: 10,
  direction: 'horizontal',
  freeMode: true,
  breakpoints: {
    1025: {
      slidesPerView: 4,
    },
    769: {
      slidesPerView: 3,
    },
    695: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
  navigation: {
    prevEl: ".js-slider-next",
    nextEl: ".js-slider-prev",
  },
});

const sliderImages = new Swiper('.modal-slider__container', {
  resizeObserver: true,
  updateOnWindowResize: true,
  slideClass: 'modal-slider__item',
  slidesPerView: 1,
  initialSlide: 4,
  spaceBetween: 10,
  mousewheel: true,
  navigation: {
    nextEl: '.modal-thumbs__btn-next',
    prevEl: '.modal-thumbs__btn-prev',
  },
  grabCursor: true,
  thumbs: {
    swiper: sliderThumbs
  },
});

const productSwiper = new Swiper(".js-product-swiper", {
  resizeObserver: true,
  updateOnWindowResize: true,
  direction: "horizontal",
  
  breakpoints: {
    300: {
      slidesPerGroup: 2,
      slidesPerColumn: 1,
      slidesPerView: "auto",
      spaceBetween: 16,
    },

    767: {
      slidesPerGroup: 2,
      slidesPerColumn: 1,
      slidesPerView: "auto",
      spaceBetween: 32,
    },
  },

  navigation: {
    nextEl: ".js-product-next",
    prevEl: ".js-product-prev",
  },
});

//swiper catalog

const catalogSwiper = new Swiper(".js-catalog-products-swiper", {
  // resizeObserver: true,
  // updateOnWindowResize: true,
  slidesPerView: 3,
   grid: {
   rows: 3,
   },
  // direction: "horizontal",
  // slidesPerColumnFill: "row",
  
  breakpoints: {
    1: {
      // slidesPerGroup: 2,
      // slidesPerColumn: 3,
      spaceBetween: 16,
      slidesPerView: 2,
     
    },
    768: {
      // slidesPerGroup: 3,
      // slidesPerColumn: 3,
      spaceBetween: 32,
      slidesPerView: 2
    },
    1030: {
      // slidesPerGroup: 3,
      // slidesPerColumn: 3,
      slidesPerView: 3,
      spaceBetween: 32
    },
    1080: {
      // slidesPerGroup: 3,
      // slidesPerColumn: 3,
      spaceBetween: 32,
      slidesPerView: 3,
      grid: {
        rows: 3,
      },
    },
    1920: {
      // slidesPerGroup: 3,
      // slidesPerColumn: 3,
      slidesPerView: 3,
      spaceBetween: 32,
      grid: {
        rows: 3,
      },
    }
  },

  pagination: {
    el: ".catalog-pagination.swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});
//range-slider catalog page
// import {formatMoney} from "./utils/format.js";

const formatMoney = (money) => {
  return new Intl.NumberFormat("ru-RU").format(money);
};
const createChoiceItem = (text, dataColor) => {
  return (
    `
    <button style="background: ${dataColor}" class="btn-reset catalog-choice__item" data-choice-text="${text}">${text}
      <svg aria-hidden="true">
          <path d="M1 1L8.2 8.2"  stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.2 1L1 8.2"  stroke-linecap="round" stroke-linejoin="round"/>     
      </svg>
    </button>
  `
  );
};

let rangeSlider = document.getElementById('range-slider');
if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [2000, 150000],
    connect: true,
    step: 1,
    range: {
      'min': [0],
      'max': [225000]
    }
  });

  const input0 = document.getElementById('input-0');
  const input1 = document.getElementById('input-1');
  const inputs = [input0, input1];
  const connect = document.querySelector('.noUi-connect');

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  rangeSlider.noUiSlider.on('slide', function () {
    connect.style.background = '#7033ac';
  });

  rangeSlider.noUiSlider.on('end', function () {
    connect.style.background = '#a65cf0';
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });

  let oldValue = null;

  function createRangeChoiceItem(item) {
    const choice = document.querySelector(`[data-choice-text="${oldValue}"]`);
    if(choice) {
        choice.remove();
    }

    let text = "До " + formatMoney(item.value);
 

    oldValue = text;

    let dataColor = item.getAttribute('data-color');
    document.querySelector('.catalog-choice__list').insertAdjacentHTML('beforeend', createChoiceItem(text, dataColor));
  }

  rangeSlider.noUiSlider.on('change', function () {
    createRangeChoiceItem(input1);
  });

  input1.addEventListener('change', function (el) {
    createRangeChoiceItem(input1);
  })
}

// range slider 2

const rangeSlider2 = document.querySelector(".filters__range");
const rangeInputs = document.querySelectorAll(".input-number");

if (rangeSlider2) {
  noUiSlider.create(rangeSlider2, {
    start: [2000, 250000],
    connect: true,
    step: 25000,
    keyboardSupport: true,
    range: {
      min: [2000],
      max: [250000],
    },
  });

  rangeSlider2.noUiSlider.on("update", (values, handle) => {
    rangeInputs[handle].value = Math.round(values[handle]);
  });

  const setrangeSlider2 = (index, value) => {
    let arr = [null, null];
    arr[index] = value;

    rangeSlider2.noUiSlider.set(arr);
  };

  rangeInputs.forEach((item, i) => {
    item.addEventListener("change", (e) => {
      setrangeSlider2(i, e.currentTarget.value);
    });
  });
}

const handles = document.querySelectorAll(".noUi-handle");
const noUiLine = document.querySelector(".noUi-connect");

handles.forEach((el) => {
  el.addEventListener("focus", () => {
    noUiLine.style.background = "#7033ac";
  });
});

handles.forEach((el) => {
  el.addEventListener("blur", () => {
    noUiLine.style.background = "#a65cf0";
  });
});

//pop up

const popup = document.querySelector(".js-popup-call");
const closeBtn = document.querySelector(".js-close-btn");
const body = document.querySelector("body");

const hidePopup = (popup) => {
  body.style.overflow = "auto";
  popup.classList.remove("active");
};

const showPopup = (popup) => {
  body.style.overflow = "hidden";
  popup.classList.add("active");
};

const handlerActive = (event, popup) => {
  if (!event.target.closest(".js-content")) {
    hidePopup(popup);
  }
};

if (popup && closeBtn) {
  popup.addEventListener("click", (e) => handlerActive(e, popup));
  closeBtn.addEventListener("click", () => hidePopup(popup));
}

// Form popup
const popupForm = document.querySelector(".js-popup-form");
const closeBtnForm = document.querySelector(".js-close-btn-form");
const buyBtn = document.querySelector(".js-btn-buy");

if (buyBtn && popupForm && closeBtnForm) {
  buyBtn.addEventListener("click", () => showPopup(popupForm));

  popupForm.addEventListener("click", (e) => handlerActive(e, popupForm));
  closeBtnForm.addEventListener("click", () => hidePopup(popupForm));
}

// Slider popup
const popupSlider = document.querySelector(".js-popup-slider");
const closeBtnSlider = document.querySelector(".js-close-btn-slider");
const initialSlider = document.querySelector(".product-slider");

if (initialSlider && popupSlider && closeBtnSlider) {
  initialSlider.addEventListener("click", () => showPopup(popupSlider));

  popupSlider.addEventListener("click", (e) => handlerActive(e, popupSlider));
  closeBtnSlider.addEventListener("click", () => hidePopup(popupSlider));
}

