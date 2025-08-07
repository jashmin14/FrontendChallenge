async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "a8c1234b56e789f01234567890abcd12"; // ← your real key
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "City not found!";
    } else {
      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      `;
      resultDiv.innerHTML = weather;
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching weather data.";
  }
}
