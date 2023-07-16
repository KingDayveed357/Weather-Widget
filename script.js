const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const card = document.querySelector(".card");

searchBtn.addEventListener('click', searchWeather);
if (cityInput.value == "") {
  card.style.display = "none";
}
function searchWeather(event) {
  event.preventDefault(); 
 
  const apiKey = 'a6bdd6371ebd61c2bd8216b63f58129a'; 
  const cityName = cityInput.value.trim();
  if (cityInput == '') {
    alert("Input is Empty")
}
  weatherContainer.innerHTML = '';

  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      card.style.display = "flex";
      const weather = {
        description: data.weather[0].description,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        sunrise: convertTimestamp(data.sys.sunrise),
        sunset: convertTimestamp(data.sys.sunset),
        country: data.sys.country,
        currentTime: getCurrentTime(data.timezone)
      };

      // Update the weather details in the HTML
      const country = document.getElementById('country');
      const location = document.getElementById('location');
      const temp = document.getElementById('temp');
      const humidity = document.getElementById('humidity');
      const windS = document.getElementById('windS');
      const sunRise = document.getElementById('sunRise');
      const sunSet = document.getElementById('sunSet');
      const des = document.getElementById('des');

      location.innerText = cityName;
      country.innerText = `Country: ${weather.country}`;
      temp.innerText = `Temperature: ${weather.temperature}K`;
      humidity.innerText = `Humidity: ${weather.humidity}%`;
      windS.innerText = `Wind Speed: ${weather.windSpeed} m/s`;
      sunRise.innerText = `Sunrise: ${weather.sunrise}`;
      sunSet.innerText = `Sunset: ${weather.sunset}`;
      des.innerText = `Description: ${weather.description}`;

      const currentTime = document.createElement('p');
      currentTime.innerText = `Current Time: ${weather.currentTime}`;
      weatherContainer.appendChild(currentTime);


      let fullDate = document.getElementById("fullDate");
      const date = new Date();
      const options = { timeZone: 'GMT' };
      const year = date.toLocaleString('en-US', options);
      const month = (date.getMonth() + 1).toLocaleString('en-US', options);
      const day = date.getDate().toLocaleString('en-US', options);

      fullDate.innerText = `${date}`;


    })
    .catch(error => {
      console.error('Error:', error);
      card.style.display = "none";
      alert("An error occurred. Please try again later.")
    });
}

function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const timeString = date.toLocaleTimeString('en-US');
  return timeString;
}

function getCurrentTime(timezoneOffset) {
  const currentTime = new Date();
  const utcOffset = currentTime.getTimezoneOffset();
  const localTime = new Date(currentTime.getTime() + (timezoneOffset) * 60000);
  const timeString = localTime.toLocaleTimeString('en-US');
  return timeString;
}

