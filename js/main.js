const deck = document.querySelector("#webslides");
const slides = Array.from(document.querySelectorAll("#webslides > section"));
const counter = document.querySelector("#counter");
const controls = document.querySelectorAll("[data-direction]");

let currentSlide = 0;

function updateSlide() {
  deck.style.transform = `translateX(-${currentSlide * 100}vw)`;
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  slides[currentSlide].id ||= `slide-${currentSlide + 1}`;
  history.replaceState(null, "", `#${slides[currentSlide].id}`);
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  updateSlide();
}

function goNext() {
  goToSlide(currentSlide + 1);
}

function goPrev() {
  goToSlide(currentSlide - 1);
}

controls.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.direction === "next") {
      goNext();
    } else {
      goPrev();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    goNext();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }

  if (event.key === "Home") {
    goToSlide(0);
  }

  if (event.key === "End") {
    goToSlide(slides.length - 1);
  }
});

const startIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
goToSlide(startIndex >= 0 ? startIndex : 0);
