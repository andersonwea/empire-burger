const menuTitle = document.getElementById('menu-title');

const changeTitle = () => {
  if (window.innerWidth <= 600) {
    menuTitle.innerHTML = 'nossa especialidade'
  } else {
    menuTitle.innerHTML = 'cardápio imperial | burger'
  }
}

changeTitle();

window.addEventListener('resize', changeTitle);