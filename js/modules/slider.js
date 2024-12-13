function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  function strToNum(str) {
    return +str.replace(/\D/g, "");
  }

  function sliderDotCreation() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function checkSliderIndex(slideIndex) {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  next.addEventListener("click", () => {
    if (offset == strToNum(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += strToNum(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    sliderDotCreation();
    checkSliderIndex(slideIndex);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = strToNum(width) * (slides.length - 1);
    } else {
      offset -= strToNum(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    sliderDotCreation();
    checkSliderIndex(slideIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = strToNum(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      sliderDotCreation();
      checkSliderIndex(slideIndex);
    });
  });
}

export default slider;
