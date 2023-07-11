const hourHand = document.querySelector(".data-hour-hand");
const minuteHand = document.querySelector(".data-minute-hand");
const secondHand = document.querySelector(".data-second-hand");
setInterval(setClock, 1000);

function setClock(params) {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  // 分數要再加入當前的秒數。ex:12分12秒為 0.22份
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  // 時數要再加入當前的分數，但時鐘為 12 小時一圈，故除以12
  const hourRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hourRatio);
}
// 角度
function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setInterval(() => {
  const currentTime = moment().format("HH:mm:ss");
  document.getElementById("current-time").textContent = currentTime;
}, 1000);
