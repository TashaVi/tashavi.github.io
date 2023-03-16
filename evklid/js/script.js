const swiper = new Swiper('.swiper', {
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

//burger
// let menuLinks = menu.querySelector('.header__nav').querySelectorAll('.header__link');

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector("header").classList.add("open");
    document.querySelector("body").classList.add("stop-scroll");
  });

  document.getElementById("burgerClose").addEventListener("click", function () {
    document.querySelector("header").classList.remove("open");
    document.querySelector("body").classList.remove("stop-scroll");

  });



});
  // menuLinks.forEach(function (li) {
  // li.addEventListener('click', function () {
  // document.querySelector("body").classList.remove('stop-scroll');
  // // document.querySelector("header").classList.remove('open');

  // });
  // });


// tabs

let tabsBtn = document.querySelectorAll('.tabs__nav__btn');
let tabsItem = document.querySelectorAll('.tabs__item');
let tabsContent = document.querySelector('.tabs__content');

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function (btn) {
      btn.classList.remove('tabs__nav__btn--active');
    });
    e.currentTarget.classList.add('tabs__nav__btn--active');
    document.querySelectorAll('.tabs__item').forEach(function (tabsBtn) {

      tabsBtn.classList.remove('tabs__item--active');
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs__item--active');
  });
});
//accordion
new Accordion('.accordion-list', {
  elementClass: 'accordion',
  triggerClass: 'accordion__control',
  panelClass: 'accordion__content',
  activeClass: 'accordion--active',

});
let btnPlus = document.querySelector(".btn__plus-2");
btnPlus.addEventListener("click", function () {

  btnPlus.classList.toggle(".btn__plus-2--active");
});
document.querySelector(".item__top ").addEventListener("click", function () {
  btnPlus.classList.toggle(".btn__plus-2--active");
  $('.accordion').accordion("refresh");

});


//search button

document.querySelector(".form-btn__open").addEventListener("click", function () {
  document.querySelector(".form__header").classList.add("form__active__search");
  this.classList.add("active");
});
document.querySelector(".form-close").addEventListener("click", function () {
  let form = document.querySelector(".form__header");
  form.classList.remove("form__active__search");
  form.querySelector("input").value = "";
  document.querySelector(".form-btn__open").classList.remove("active");
});

document.addEventListener("click", function (e) {
  let target = e.target;
  let form = document.querySelector(".form__header");
  if (!target.closest(".form-container")) {
    form.classList.remove("form__active__search");
    form.querySelector("input").value = "";
    document.querySelector(".form-btn__open").classList.remove("active");
  }
});

//end search button
