const BASE_URL = 'https://weather-app-rails.herokuapp.com/location';
const WEATHER_URL = 'https://weather-app-rails.herokuapp.com/weather?loc=';
const locationInput = document.getElementById("location");
const locationSubmit = document.getElementById("location-submit");
const locationForm = document.getElementById("location-form");
let userLat;
let userLng;
const weatherLi = document.createElement("li");
const weatherDisplay = document.getElementById("weather-display");
locationForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  weatherDisplay.innerHTML = '';
  fetch(BASE_URL + `/${locationInput.value}`)
  .then(resp => resp.json())
  .then(data =>{
    
    data['results'].forEach(i =>{
      //console.log(i.geometry.location.lat);
       userLat =i.geometry.location.lat;
       userLng =i.geometry.location.lng;
       // console.log("latitute", userLat);
       // console.log("longitute", userLng);

       //*******************************************
       fetch(WEATHER_URL + `${userLat}_${userLng}`)
       .then(resp => resp.json())
       .then(weather =>{
          weatherLi.textContent = `timezone: ${weather['timezone']}`;
          weatherDisplay.appendChild(weatherLi);

        Object.entries(weather["currently"]).forEach(item =>{
          const newLi = document.createElement("li");
          newLi.textContent = item;
          weatherDisplay.appendChild(newLi);
        })
         })
       })
    })
  })

  //get weather info
