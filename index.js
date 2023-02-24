const comtainer = document.querySelector(".main__comtainer");
const findlocation = document.querySelector(".find__location button");
const notfound = document.querySelector(".not__found");
const weathercomtainer = document.querySelector(".weather__comtainer ");
const weatherdeails = document.querySelector(".weather__deails ");

findlocation.addEventListener("click", () => {
  const APIKey = "c2a1ef4149097c9b8b6d6c92b6cf90e0";
  const city = document.querySelector(".find__location input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        comtainer.style.height = "auto";
        weathercomtainer.style.display = "none";
        weatherdeails.style.display = "none";
        notfound.style.display = "block";
        notfound.classList.add("fadeIn");
        return;
      } else {
        weathercomtainer.style.display = "block";
        weatherdeails.style.display = "block";
        weatherdeails.style.display = "grid";
        notfound.style.display = "none";
        notfound.classList.remove("fadeIn");

        const image = document.querySelector(".weather__comtainer img");

        const temperature = document.querySelector(
          ".weather__comtainer .temperature"
        );
        const description = document.querySelector(
          ".weather__comtainer .description"
        );
        const humidity = document.querySelector(
          ".weather__deails .humidity span"
        );
        const wind = document.querySelector(".weather__deails .wind span");
        const visibility = document.querySelector(
          ".weather__deails .visibility span"
        );
        const pressure = document.querySelector(
          ".weather__deails .pressure span"
        );
        let way = "";
        const deg = json.wind.deg;
        if (deg === 0 || deg === 360) {
          way = "N";
        } else if (deg > 0 && deg < 90) {
          way = "NE";
        } else if (deg === 90) {
          way = "E";
        } else if (deg > 90 && deg < 180) {
          way = "SE";
        } else if (deg === 180) {
          way = "S";
        } else if (deg > 180 && deg < 270) {
          way = "SW ";
        } else if (deg === 270) {
          way = "W";
        } else if (deg > 270 && deg < 360) {
          way = "NW";
        } else {
          way = "";
        }
        image.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed}m/s ${way}`;
        visibility.innerHTML = `${(json.visibility / 1000).toFixed(2)}Km`;
        pressure.innerHTML = `${json.main.pressure}hPa`;

        weathercomtainer.classList.add("fadeIn");
        weatherdeails.classList.add("fadeIn");
        comtainer.style.height = "auto";
      }
    });
});
