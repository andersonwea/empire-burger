import changeTitle from "./modules/menu-title.js";
import initScrollSmooth from "./modules/scroll-smooth.js";
import initScrollAnimation from "./modules/scroll-animation.js";
import initOpenStatus from "./modules/open-status.js";
import { SlideNav } from "./modules/slide.js";
import initFetchFeedback from "./modules/fetch-feedback.js";

changeTitle();
initScrollSmooth();
initScrollAnimation();
initOpenStatus();
initFetchFeedback();

const slide = new SlideNav(".slide-wrapper", ".slide");
slide.init();
slide.addControl();
