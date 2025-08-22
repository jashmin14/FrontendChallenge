const API_KEY = "https://api.open-meteo.com/v1/forecast"; // Free API (no key needed)

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const errorEl = document.getElementById("error");

const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");

// Get coordinates (lat/lon) for a city using Open-Meteo geocoding
async function getCoordinates(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
  const res = await fetch(geoUrl);
  const data = await res.json();
  if (!data.results || data.results.length === 0)
    throw new Error("City not found!");
  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name,
  };
}

// Get weather data
async function getWeather(city) {
  try {
    errorEl.textContent = "";
    weatherInfo.classList.add("hidden");

    const { lat, lon, name } = await getCoordinates(city);

    const url = `${API_KEY}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await fetch(url);
    const data = await res.json();

    const weather = data.current_weather;

    // Update UI
    cityNameEl.textContent = name;
    descriptionEl.textContent = "Weather data fetched!";
    tempEl.textContent = weather.temperature;
    windEl.textContent = weather.windspeed;
    humidityEl.textContent = weather.relativehumidity ?? "N/A";

    weatherInfo.classList.remove("hidden");
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    errorEl.textContent = "Please enter a city name.";
    return;
  }
  getWeather(city);
});
