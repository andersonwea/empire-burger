class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.activeClass = "active";
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
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
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.transition(false);
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    this.dist.movement = event.clientX;
    const finalPosition = this.calcPosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.dist.finalPosition = this.dist.movePosition;
    this.wrapper.removeEventListener("mousemove", this.onMove);
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
  }
}

export { Slide };
