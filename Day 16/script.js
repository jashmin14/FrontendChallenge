async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "55f531d61809762a7d2914abd4e291af"; // Replace with your OpenWeather API key

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    document.getElementById("weatherResult").innerHTML = `
      <strong>${data.name}, ${data.sys.country}</strong><br>
      🌡 Temperature: ${data.main.temp}°C<br>
      🌥 Weather: ${data.weather[0].description}
    `;
  } catch (error) {
    document.getElementById(
      "weatherResult"
    ).innerHTML = `<span style="color:red">${error.message}</span>`;
  }
}
