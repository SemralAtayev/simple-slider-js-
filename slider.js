function slider({
  completeSliderSelector,
  slideWrapperSelecor,
  sliderWrapperInnerSelector,
  slideSelector,
  slideNextSelector,
  slidePrevSelector
  })
  {
  //   slideShow();

  const slideWrapper = document.querySelector(slideWrapperSelecor),
        sliderWrapperInner = document.querySelector(sliderWrapperInnerSelector),
        slide = document.querySelectorAll(slideSelector),
        slideNext = document.querySelector(slideNextSelector),
        slidePrev = document.querySelector(slidePrevSelector),
    

    width = window.getComputedStyle(slideWrapper).width;

  let completeSlider = document.querySelector(completeSliderSelector);

  // console.log(width);

  const currentSlideNumber = document.querySelector("#current");
  const totalSlideNumber = document.querySelector("#total");

  let slideIndex = 1;
  let offset = 0;

  if (slide.length < 10) {
    totalSlideNumber.innerHTML = `0${slide.length}`;
    currentSlideNumber.innerHTML = `0${slideIndex}`;
  } else {
    totalSlideNumber.innerHTML = slide.length;
    currentSlideNumber.innerHTML = slideIndex;
  }

  slideWrapper.style.overflow = "hidden";
  sliderWrapperInner.style.display = "flex";
  sliderWrapperInner.style.width = 100 * slide.length + "%";
  sliderWrapperInner.style.transition = "all .5s ease";
  slide.forEach((item) => (item.style.width = width));

  // dots

  completeSlider.style.position = "relative";

  let indicatorsDiv = document.createElement("div");
  let dots = [];

  indicatorsDiv.classList.add("carousel-indicators");
  completeSlider.append(indicatorsDiv);

  for (let i = 0; i < slide.length; i++) {
    let dotsDiv = document.createElement("div");
    dotsDiv.classList.add("dot");
    dotsDiv.dataset.count = i + 1;
    if (i == 0) {
      dotsDiv.classList.add("active");
    }
    indicatorsDiv.appendChild(dotsDiv);
    dots.push(dotsDiv);
  }

  //functions

  const addActiveDot = function (dotVar) {
    dotVar.forEach((dot) => {
      dot.classList.remove("active");
    });
    dotVar[slideIndex - 1].classList.add("active");
  };

  const checkIndex = function () {
    if (slideIndex < 10) {
      currentSlideNumber.innerHTML = `0${slideIndex}`;
    } else {
      currentSlideNumber.innerHTML = slideIndex;
    }
  };

  const plusIndex = function () {
    if (slideIndex == slide.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
  };

  const replacePx = function (str) {
    return +str.replace(/\D/g, "");
  };

  //functions end

  slideNext.addEventListener("click", () => {
    if (offset == replacePx(width) * (slide.length - 1)) {
      offset = 0;
    } else {
      offset += replacePx(width);
    }
    sliderWrapperInner.style.transform = `translateX(-${offset}px)`;

    plusIndex();

    checkIndex();

    addActiveDot(dots);
  });

  slidePrev.addEventListener("click", () => {
    if (offset == 0) {
      offset = replacePx(width) * (slide.length - 1);
    } else {
      offset -= replacePx(width);
    }
    sliderWrapperInner.style.transform = `translateX(-${offset}px)`;

    plusIndex();

    checkIndex();

    addActiveDot(dots);
  });

  // add event listener to all dots and when we press one of the dots we going to slide number, which is equal to e.target.getAttribute('data-count')

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-count");

      slideIndex = slideTo;

      offset = replacePx(width) * (slideTo - 1);

      sliderWrapperInner.style.transform = `translateX(-${offset}px)`;

      addActiveDot(dots);

      checkIndex();
    });
  });
}

export default slider;
