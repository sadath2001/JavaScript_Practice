const button = document.getElementById("button");
const display = document.getElementById("time");
function showTime() {
  const times = new Date();
  const currentTime = `${times.getHours()}:${times.getMinutes()}:${times.getSeconds()}`;
  display.innerText = currentTime;
}
// setTimeout(showTime, 1000); // going to run just once
let interval = setInterval(showTime, 1000);
button.addEventListener("click", () => {
  clearInterval(interval);
});
