document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  const apiKey = "55f531d61809762a7d2914abd4e291af";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // 👈 this will show the weather data
      document.getElementById("weatherResult").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      `;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("weatherResult").innerText =
        "Error fetching weather data.";
    });
});
