const initFetchFeedback = () => {};
const feedbacks = document.querySelectorAll(".slide p");
const userImageAvatar = document.querySelectorAll(".user-avatar img");
const userName = document.querySelectorAll(".user-details h4");
const userAge = document.querySelectorAll(".user-details span");

const fetchFeedback = async (url) => {
  const data = await fetch(url);
  const dataJSON = await data.json();

  dataJSON.forEach((item, index) => {
    userName[index].innerText = item.name;
    userAge[index].innerText = `${item.age} anos`;
    userImageAvatar[index].src = item.image;
    feedbacks[index].innerText = `"${item.testimonial}"`;
  });
};

fetchFeedback("https://api.brchallenges.com/api/empire-burger/testimonials");

export default initFetchFeedback;
