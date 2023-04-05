import changeTitle from "./modules/menu-title.js";
import initScrollSmooth from "./modules/scroll-smooth.js";
import initScrollAnimation from "./modules/scroll-animation.js";
import initOpenStatus from "./modules/open-status.js";
import { SlideNav } from "./modules/slide.js";
import initFetchFeedback from "./modules/fetch-feedback.js";
import initFetchMenu from "./modules/fetch-menu.js";
import MobileMenu from "./modules/menu-mobile.js";

initFetchFeedback();
initFetchMenu();
changeTitle();
initScrollSmooth();
initScrollAnimation();
initOpenStatus();

const mobileMenu = new MobileMenu(".button-menu-mobile");
mobileMenu.init();

const slide = new SlideNav(".slide-wrapper", ".slide");
slide.init();
slide.addControl();
