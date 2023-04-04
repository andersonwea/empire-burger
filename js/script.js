import changeTitle from "./modules/menu-title.js";
import initScrollSmooth from "./modules/scroll-smooth.js";
import initScrollAnimation from "./modules/scroll-animation.js";
import initOpenStatus from "./modules/open-status.js";
import { Slide } from "./modules/slide.js";

changeTitle();
initScrollSmooth();
initScrollAnimation();
initOpenStatus();

const slide = new Slide(".slide-wrapper", ".slide");
slide.init();
slide.changeSlide(0);
