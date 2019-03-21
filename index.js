const BASE_URL = 'https://weather-app-rails.herokuapp.com'

let form = document.querySelector("form")
let locationInput = document.getElementById('location')
let main = document.getElementById("weather-display")

form.addEventListener("submit", (ev)=>{
  ev.preventDefault()
  fetch(BASE_URL + "/location/" + locationInput.value)
  .then(resp => resp.json())
  .then(json => {
    let lat = json.results[0].geometry.location.lat
    let lng = json.results[0].geometry.location.lng
    fetch(BASE_URL + "/weather/?loc=" + lat + "_" + lng)
    .then(resp => resp.json())
    .then(json => {
      buildWeather(json)
    })
  })
})

function buildWeather(json){
  let divWrapper = document.createElement("div")
  divWrapper.setAttribute("class", "wrapper")
  let pDegrees = document.createElement("p")
  pDegrees.innerText = Math.floor(json.currently.apparentTemperature) + "°"
  divWrapper.appendChild(pDegrees)
  main.appendChild(divWrapper)

}
