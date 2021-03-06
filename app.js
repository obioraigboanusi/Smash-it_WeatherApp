window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const main = document.querySelector('#main');
  main.style.display = 'none';
  const displayCity = document.querySelector('#city');
  const weatherIcon = document.querySelector('#weather-icon');
  const weatherTemp = document.querySelector('#weather-temp');
  const minMaxTemp = document.querySelector('#min-max-temp');
  const weatherSummary = document.querySelector('#weather-summary');
  const feelsLike = document.querySelector('#feels-like');
  const displayPressure = document.querySelector('#Pressure');
  const wind_speed = document.querySelector('#wind-speed');
  const wind_degree = document.querySelector('#wind-degree');
  const displayHumidity = document.querySelector('#humidity');
  const btn = document.querySelector('button');
  const input = document.querySelector('input');

  btn.addEventListener('click', () => {
    let search_input = input.value;
    console.log(search_input);
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${search_input}&APPID=0f93971fd9ba786401ed31f437b66d11`;
    try {
      fetch(api)
        .then((response) => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          const { temp, temp_min, temp_max, feels_like, pressure, humidity } = data.main;
          const { description} = data.weather[0];
          const { speed, deg } = data.wind

          displayCity.innerHTML = `<h2>${data.name}</h2> ,<span>${data.sys.country}</span>`;
          weatherTemp.textContent = toCelcuis(temp) ;
          minMaxTemp.textContent = `${toCelcuis(temp_min)} / ${toCelcuis(temp_max)}`;
          weatherSummary.textContent = description;
          feelsLike.textContent = toCelcuis(feels_like);
          displayPressure.textContent = pressure;
          wind_speed.textContent = speed;
          wind_degree.textContent = deg;
          displayHumidity.textContent = humidity;
          // setIcons(description, document.querySelector("#icons"));
          clock();
          main.style.display = 'flex';
        })

    }
    catch (e) {
      main.innerHTML='<p class="t-center">Please enter a valid city name!!!</p>'
    }


    function clock() {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
  
      let meridian = (hours < 12) ? "AM" : "PM";
      hours = hourCalc(hours);
      minutes = (minutes < 10) ? ("0" + minutes) : minutes;
      seconds = (seconds < 10) ? ("0" + seconds) : seconds;
  
      //display date
      const options = { weekday: 'long', month: 'long', day: 'numeric' }
      document.querySelector('#current-date').textContent = date.toLocaleDateString("en-US", options);
  
      // // current time
      // const displayDate = document.querySelector('#current-time');
      //   displayDate.innerText = hours + ':' + minutes + meridian + ',';
    }
    function toCelcuis(ez) {
      // let celcius = (ez - 32) * (5 / 9);
      return ez + '°F';
    }
    function displayIcon(icon, iconID) {
      const skycons = new Skycons({ color: "white" });
      const currentIcon = description.replace(/""/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }

    function hourCalc(el) {
      el = (el == 0) ? (el = 12) : el;
      el = (el > 12) ? (el - 12) : el;
      el = (el < 10) ? ("0" + el) : el;
      return el.toString();
    }
  })
  
  

















  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     long = position.coords.longitude;
  //     lat = position.coords.latitude;


  //   })
  // }


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function (registeration) {
      console.log("service worker registered");
    })
  };
})