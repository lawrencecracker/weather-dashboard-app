document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");
  const weatherInfo = document.getElementById("weatherInfo");

  searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
      alert("Please enter a city name.");
      return;
    }

    fetchWeather(cityName);
  });

  async function fetchWeather(cityName) {
    const apiKey = "efbd1191a3194bb4d5db42b6003e9cf6";
    const geocodingApiKey = "pk.eyJ1Ijoic3JpamFrc2luZ2giLCJhIjoiY2xsM3g0cDl2MDBxbjNlbzZ5N3FpdjVvbCJ9.qIp_XNx9twd935eusrHB6Q";

    try {
      // Use geocoding API to get coordinates from city name
      const geocodingResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${geocodingApiKey}`
      );
      const geocodingData = await geocodingResponse.json();
      const [longitude, latitude] = geocodingData.features[0].center;

      // Use OpenWeatherMap API to get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      // Display weather information
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const description = weatherData.weather[0].description;

      weatherInfo.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Description: ${description}</p>
      `;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherInfo.innerHTML = "An error occurred. Please try again.";
    }
  }
});
