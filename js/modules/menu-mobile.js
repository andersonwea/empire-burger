class MobileMenu {
  constructor(menuButton) {
    this.menuButton = document.querySelector(menuButton);
    this.handleClick = this.handleClick.bind(this);
    this.activeClass = "active";
  }

  handleClick() {
    this.menuButton.classList.toggle(this.activeClass);
  }

  addEventMenu() {
    this.menuButton.addEventListener("click", this.handleClick);
  }

  init() {
    this.addEventMenu();
  }
}

export default MobileMenu;
