const BASE_URL = 'https://weather-app-rails.herokuapp.com'
const form = document.querySelector('form');

function createForm() {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let input = document.getElementById('location').value;
    requestLocationInfo(input);
  });
}
createForm();

function requestLocationInfo(input) {
  fetch(BASE_URL + `/location/${input}`)
  .then(response => {
    return response.json();
  })
  .then(json => {
    let lat = json.results[0].geometry.location.lat;
    let lng = json.results[0].geometry.location.lng;
    const address = json.results[0].formatted_address;
    displayLocation(address);
    requestWeather(lat, lng);
  });
}

function requestWeather(lat, lng) {
  fetch(BASE_URL + `/weather?loc=${lat}_${lng}`)
  .then(response => {
    return response.json();
  })
  .then(json => {
    displayWeather(json);
  });
}

function displayWeather(weatherData) {
  const summary = weatherData.currently.summary;
  const windSpeed = weatherData.currently.windSpeed;
  const humidity = weatherData.currently.humidity;
  const visibility = weatherData.currently.visibility;
  const weatherValues = [
    {"Summary": summary}, 
    {"Wind Speed": windSpeed}, 
    {"Humidity": humidity}, 
    {"Visibililty": visibility}
  ];

  const main = document.getElementById('weather-display');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  main.appendChild(h2);
  main.appendChild(ul);

  for (i in weatherValues) {
    const li = document.createElement('li');
    const currentObject = weatherValues[i];
    for (key in currentObject) {
      const currentValue = currentObject[key];
      li.textContent = `${key}: ${currentValue}`;
    }
    ul.appendChild(li);
  }
}

function displayLocation(address) {
  const main = document.getElementById('weather-display');
  main.innerHTML = '';
  const div = document.createElement('div');
  div.setAttribute('id', 'location-info');
  const h2 = document.createElement('h2');
  h2.textContent = address;

  main.appendChild(div);
  div.appendChild(h2);
}
