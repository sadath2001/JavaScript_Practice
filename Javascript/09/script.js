async function getWeather(lat, lon) {
  const result = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=f8a32804eb8e4ac89ab103359242410&q=${lat},${lon}&aqi=yes`
  );
  return await result.json();
}

async function gotLocation(position) {
  // success callback
  //   console.log(position);
  const result = await getWeather(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);
}

function failedGetting() {
  console.log("Couldnt fetch the location");
}
const button = document.getElementById("button");
button.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedGetting);
});
