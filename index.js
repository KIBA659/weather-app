const comtainer = document.querySelector('.main__comtainer');
const findlocation = document.querySelector('.find__location');
const notfound = document.querySelector('.not__found');
const weathercomtainer = document.querySelector('.weather__comtainer');
const weatherdeails = document.querySelector('.weather__deails');

findlocation.addEventListener('click', () => {
  const APIKey = 'c2a1ef4149097c9b8b6d6c92b6cf90e0';
  const city = document.querySelector('.find__location input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)

    .then((response) => response.json())
    .then((json) => {
      if (json === '404') {
        comtainer.style.height = '400px';
        weathercomtainer.style.display = 'none';
        weatherdeails.style.display = 'none';
        notfound.style.display = 'block';
        notfound.classList.add('fadeIn');
        return;
      }
      notfound.style.display = 'none';
      notfound.classList.remove('fadeIn');

      const image = document.querySelector(".weather__comtainer img");
      const temperature = document.querySelector(
        '.weather__comtainer .temperature'
      );
      const description = document.querySelector(
        '.weather__comtainer .description'
      );
      const humidity = document.querySelector(
        '.weather__deails .humidity span'
      );
      const wind = document.querySelector('.weather__deails .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'img/icons8-sun.svg';
          break;

        case 'Rain':
          image.src = 'img/icons8-rainfall-96.png';
          break;

        case 'Snow':
          image.src = 'img/icons8-rainfall-96.png';
          break;

        case 'Clouds':
          image.src = 'img/icons8-rainfall-96.png';
          break;

        case 'Haze':
          image.src = 'img/icons8-rainfall-96.png';
          break;
        default:
          image.src = '';
        }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}Km/h`;

      weathercomtainer.style.display = '""';
      weatherdeails.style.display = '';
      weathercomtainer.classList.add('fadeIn');
      weatherdeailsclassList.add('fadeIn');
      comtainer.style.height = '605px';
    });
});
