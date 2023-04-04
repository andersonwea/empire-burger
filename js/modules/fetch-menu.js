const initFetchMenu = () => {};
const burgerName = document.querySelectorAll(".content-menu h3");
const burgerIngredients = document.querySelectorAll(".content-menu p");

const formatPriceToBrazil = (price) => {
  return `R$ ${price.toString().replace(".", ",")}`;
};

const fetchMenu = async (url) => {
  try {
    const data = await fetch(url);
    const dataJSON = await data.json();

    dataJSON.forEach((item, index) => {
      burgerName[
        index
      ].innerHTML = `${item.plate.toUpperCase()}<span>${formatPriceToBrazil(
        item.price
      )}
      </span>`;
      burgerIngredients[index].innerText = item.ingredients;
    });
  } catch (error) {
    console.log(Error(error));
  }
};

fetchMenu("https://api.brchallenges.com/api/empire-burger/menu");

export default initFetchMenu;
