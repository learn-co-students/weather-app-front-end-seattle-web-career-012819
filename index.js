const BASE_URL = 'https://weather-app-rails.herokuapp.com';
const LOCATION_ENDPOINT = `/location/${location}`;

let weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let locationInput = ev.target.location.value;
    findLatLong(locationInput);
});

function findLatLong(location) {
    fetch(BASE_URL + `/location/${location}`).then((response) => response.json()).then((json) => {
        console.log(json);
        let lat = json.results[0].geometry.location.lat;
        let long = json.results[0].geometry.location.lng;
        getDaWeather(lat, long);
    });
}

function getDaWeather(lat, long) {
    fetch(BASE_URL + `/weather?loc=${lat}_${long}`)
    .then((response) => response.json()).then((json) => {
        displayForecast(json);
    });
}

function displayForecast(json) {
   let daily = json.daily.data
   let day = 20
   let weatherDiv = document.getElementById('main-weather-grid')
   weatherDiv.innerHTML = '';
   for (i = 0; i < daily.length; i++){
   let cardDiv = document.createElement('div')
   let weatherImg = document.createElement('img')
   let bodyDiv = document.createElement('div')
   let display = document.getElementById('weather-display')
   let h5 = document.createElement('h5')
   let h1 = document.createElement('h1')
   let pText = document.createElement('p')
   let smallPText = document.createElement('p')
   let smallText = document.createElement('small')
   cardDiv.className = 'card'
   weatherImg.className = 'card-img-top'
   weatherImg.src = 'https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-partly-cloudy-512.png';
   bodyDiv.className = 'card-body'
   h5.className = 'card-title'
   h5.textContent = `March ${day}`
   pText.className = 'card-text'
   pText.textContent = `High: ${Math.ceil(daily[i].apparentTemperatureHigh)} /   Low: ${Math.ceil(daily[i].apparentTemperatureLow)}`
   smallPText.className = 'card-text'
   smallText.className = 'text-muted'
   smallText.textContent = daily[i].summary
   day++
   weatherImg.addEventListener('mouseover', () => {
         weatherImg.style.visibility="hidden" ;
   })
   cardDiv.appendChild(weatherImg)
   cardDiv.appendChild(bodyDiv)
   cardDiv.appendChild(h5)
   cardDiv.appendChild(pText)
   cardDiv.appendChild(smallPText)
   cardDiv.appendChild(smallText)
   weatherDiv.appendChild(cardDiv)
}
}


// <div class="card">
//    <img src="..." class="card-img-top" alt="...">
//    <div class="card-body">
//       <h5 class="card-title">Card title</h5>
//       <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//    </div>
// </div>
