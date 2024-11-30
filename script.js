const API_KEY = "ffd30d016c8494f1a631821484b2ba47";
const API = "https://api.openweathermap.org/data/2.5/weather?q=";

const inputEl = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const displayWheather = document.querySelector(".display");

async function checkWeather(city) {
  try {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    const response = await fetch(`${API}${city}&appid=${API_KEY}`);
    const data = await response.json();

    if (data.cod === "404") {
      document.querySelector(".error").style.display = "block";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".temp").textContent =
        Math.floor(data.main.temp) + " °C";
      document.querySelector(".city").textContent = data.name;
      document.querySelector(".wind").textContent = data.wind.speed + " km/h";
      document.querySelector(
        "img"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = inputEl.value.trim();
  checkWeather(city);
  city ? (displayWheather.style.display = "block") : "none";
});
