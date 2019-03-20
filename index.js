const BASE_URL = 'https://weather-app-rails.herokuapp.com'
// let LOCATION_ENDPOINT = /location/${location}
// WEATHER_ENDPOINT = /weather?loc=${latitude}_${longitude}

// declare all variable we want to set with fetch requests
let userLocation;
let latitude;
let longitude;
let temp;
let summary;
let rainChance;
let forecast;

const form = document.getElementById('form')
const locationInput = document.getElementById('location')
const weatherDisplay = document.getElementById('weather-display')

form.addEventListener('submit', fetchWeather)

function fetchWeather(e){
  e.preventDefault();
  userLocation = locationInput.value
// first fetch to get latitude and longitude
  fetch(`${BASE_URL}/location/${userLocation}`)
  .then(resp => resp.json())
  .then(json => {
     latitude =  json.results[0].geometry.location.lat
     longitude = json.results[0].geometry.location.lng
  }).then(location => { // second fetch to get weather data based on lat and long
    fetch(`${BASE_URL}/weather?loc=${latitude}_${longitude}`)
    .then(resp => resp.json())
    .then(json => { // set returned data to variables declared at top of page that will be used to populate the weather div
      temp = json.currently.temperature
      summary = json.currently.summary
      rainChance = json.currently.precipProbability
      time = json.currently.time
      forecast = json.daily.summary
    }).then(data => {
      fillOutData();
    })
  })
  form.reset();
}


function fillOutData(){
  // **** create each display ****
  let div = document.createElement('fieldset')
  div.classList.add('weather-div')
  let locationHeader = document.createElement('h2')
  let summaryP = document.createElement('p')
  let tempP = document.createElement('p')
  let rainChanceP = document.createElement('p')
  let forecastP = document.createElement('p')
  let removeBtn = document.createElement('button')
  // **** fill out textContent for each ****
  locationHeader.textContent = `${userLocation}`
  summaryP.textContent = `Weather summary: ${summary}`
  tempP.textContent = `Todays temperature: ${temp}`
  rainChanceP.textContent = `Chance of rain: ${rainChance}%`
  forecastP.textContent = `Forecast: ${forecast}`
  removeBtn.textContent = "Remove"
  removeBtn.classList.add('remove-btn')
  removeBtn.addEventListener('click', removeThisDisplay)
  // **** append each new filled out section to div
  div.appendChild(locationHeader)
  div.appendChild(summaryP)
  div.appendChild(tempP)
  div.appendChild(rainChanceP)
  div.appendChild(forecastP)
  div.appendChild(removeBtn)

  // **** append the new div to the main html to be displayed ****
  weatherDisplay.appendChild(div)
}

// **** Functionality to remove a weather display, run by event listener above
function removeThisDisplay(e) {
  let divToBeRemoved = e.target.parentNode
  divToBeRemoved.parentNode.removeChild(divToBeRemoved)
}








//
