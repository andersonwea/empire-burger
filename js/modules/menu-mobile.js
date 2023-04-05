class MobileMenu {
  constructor(menuButton, menuMobile) {
    this.menuButton = document.querySelector(menuButton);
    this.menuMobile = document.querySelector(menuMobile);
    this.handleClick = this.handleClick.bind(this);
    this.activeClass = "active";
  }

  handleClick() {
    this.menuButton.classList.toggle(this.activeClass);
    this.menuMobile.classList.toggle(this.activeClass);
  }

  addEventMenu() {
    this.menuButton.addEventListener("click", this.handleClick);
  }

  init() {
    this.addEventMenu();
  }
}

export default MobileMenu;
