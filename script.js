// OpenWeatherMap API key and URL
const apiKey = '43b9227ec5ae51dd82685e5d5907d0f3';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Selecting elements from the HTML document
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const humidityImg = document.querySelector('.details .humidity img');
const windImg = document.querySelector('.details .wind img');

// Function to check the weather for a given location
async function checkWeather(location) {
  // Make an API request to OpenWeatherMap
  const response = await fetch(apiUrl + location + `&appid=${apiKey}`);

  // Check if the location was found
  if (response.status == 404) {
    // If location was not found, display an error message and hide the weather details
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    // If the location was found, parse the response and display the weather details
    var data = await response.json();
    console.log(data);

    // Display the temperature, loacation name, humidity, and wind speed
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°C';
    document.querySelector('.location').innerHTML = data.name;
    document.querySelector(
      '.humidity'
    ).innerHTML = `Humidity <br> ${data.main.humidity}%`;
    document.querySelector(
      '.wind'
    ).innerHTML = `Wind speed <br> ${data.wind.speed} km/h`;

    // Set the weather icon based on the weather condition
    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'images/clear.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'images/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = 'images/mist.png';
    } else {
      weatherIcon.src = 'images/snow.png';
    }

    // Display the weather details and hide the error message
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

// Hide the weather details and error message on page load
document.querySelector('.weather').style.display = 'none';
document.querySelector('.error').style.display = 'none';

// Check the weather for London by default
checkWeather('London');

// Listen for a click event on the search button
searchBtn.addEventListener('click', () => {
  // Check the weather for the location entered in the search box
  checkWeather(searchBox.value);
});
