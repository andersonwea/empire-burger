class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(clientX) {
    console.log("moveSlide", clientX);
    this.slide.style.transform = `translate3d(${clientX}px, 0, 0)`;
    this.dist.movePosition = clientX;
  }

  calcPosition(clientX) {
    this.dist.movement = this.dist.startX - clientX;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    console.log("mouseDown", event.clientX);
    this.dist.startX = event.clientX;

    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    this.dist.movement = event.clientX;
    const finalPosition = this.calcPosition(event.clientX);
    console.log("movement", finalPosition);
    console.log("mouseMove", this.dist.movement);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    console.log("mouseUP", event.clientX);
    this.dist.finalPosition = event.clientX;
    this.wrapper.removeEventListener("mousemove", this.onMove);
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
  }
}

export { Slide };
