//Date and Time Display

let now = new Date();
let currentDate = document.querySelector("#current-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = `${day}, ${month}, ${date}, ${hour}:${minutes}`;

//City Lookup
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  searchCity(city.value);
}

function searchCity(city) {
  let apiKey = "48bfbdd47439302d4823e096b598aab9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response);
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = `${city}`;
}

function displayCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("span#temperature");
  h1.innerHTML = `${temperature}`;
  let citySearch = document.querySelector("#location-entered");
  citySearch.innerHTML = `${city}`;
}

function currentPingLocation(position) {
  let apiKey = "t016074fb65443606obfa1c77473d7be";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key={key}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPingLocation);
}

let currentButton = document.querySelector("#current-location-btn");
currentButton.addEventListener("click", getCurrentLocation);

function converttoFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.inerHTML = 75;
}

function converttoCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 24;
}

let fahrenheitLink = document.querySelector("#current-temp-fahrenheit");
fahrenheitLink.addEventListener("click", converttoFahrenheit);
let celsiusLink = document.querySelector("#current-temp-celsius");
celsiusLink.addEventListener("click", converttoCelsius);

searchCity("Miami");
