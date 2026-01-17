function refreshTemperature(response) {
  let temperatureElement = document.querySelector(".degrees");
  let temperature = response.data.temperature.current;

  let descriptionElement = document.querySelector(".description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let countryElement = document.querySelector(".country");
  country = response.data.country;
  countryElement.innerHTML = country;

  let humidityElement = document.querySelector(".humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerText = `${humidity}%`;

  let windElement = document.querySelector(".wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerText = `${wind}Km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeElement.innerHTML = `${hours}:${minutes}h`;

  let dayElement = document.querySelector(".day");
  let day = new Date(response.data.time * 1000);
  dayElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `
    <img 
      src="${response.data.condition.icon_url}" 
      alt="${response.data.condition.description}"
    />
  `;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[date.getDay()];
  let dayNumber = date.getDate();
  return `${dayName}, ${dayNumber}`;
}

function searchCity(city) {
  let apiKey = "76ab2ecoa4e0c3c3807ad4cff1b5696t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#cityInput");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
 <div class="weather-forecast-day">
      <div class="weather-forecast-date">Tue</div>
      <div class="weather-forecast-icon">🌤️</div>
      <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
              <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
          </div>
  </div>`;
  });

  let forecastElemenent = document.querySelector("#forecast");
  forecastElemenent.innerHTML = forecastHtml;
}

let searhFormElement = document.querySelector("#search-form");
searhFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Hamburg");
displayForecast();
