class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.activeClass = "active";
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
    this.changeEvent = new Event("changeEvent");
  }

  transition(active) {
    this.slide.style.transition = active ? "transform 0.3s ease-in-out" : "";
  }

  moveSlide(clientX) {
    this.slide.style.transform = `translate3d(${clientX}px, 0, 0)`;
    this.dist.movePosition = clientX;
  }

  calcPosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.2;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.wrapper.addEventListener(moveType, this.onMove);
    this.transition(false);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    this.dist.movement = event.clientX;
    const finalPosition = this.calcPosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.dist.finalPosition = this.dist.movePosition;
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.transition(true);
    this.changeSlideOnEnd();
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = -element.offsetLeft;
      return { element, position };
    });
  }

  changeActiveClass() {
    this.slideArray.forEach((slide) => {
      slide.element.classList.remove(this.activeClass);
    });
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 80 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < 80 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);

    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onMove = this.onMove.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slideConfig();
    this.changeSlide(0);
  }
}

class SlideNav extends Slide {
  constructor(wrapper, slide) {
    super(wrapper, slide);
    this.bindControlEvent();
  }

  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";

    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) =>
      item.classList.remove(this.activeClass)
    );
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl() {
    this.control = this.createControl();
    this.controlArray = [...this.control.children];

    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvent() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}

export { Slide, SlideNav };
