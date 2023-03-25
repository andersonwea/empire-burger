const initOpenStatus = () => {
  const openStatus = document.querySelector("[data-status]");
  const openTime = document.querySelector("[data-week]");
  const weekDays = openTime.dataset.week.split(",").map(Number);
  const weekHour = openTime.dataset.weekHour.split(",").map(Number);
  const weekendHour = openTime.dataset.weekendHour.split(",").map(Number);

  const timeNow = new Date();
  const dayNow = timeNow.getDay();
  const hourNow = timeNow.getHours();

  const weekOpen = weekDays.indexOf(dayNow) !== -1;
  const weekHourOpen = hourNow >= weekHour[0] && hourNow < weekHour[1];
  const weekendHourOpen = hourNow >= weekendHour[0] && hourNow < weekendHour[1];
  const isTodayWeekend = "[0,6]".includes(dayNow);

  if (weekOpen && isTodayWeekend) {
    if (weekendHourOpen) {
      openTime.classList.add("open");
      openStatus.innerText = "aberto";
    }
  } else {
    if (weekHourOpen) {
      openTime.classList.add("open");
      openStatus.innerText = "aberto";
    }
  }
};

export default initOpenStatus;
