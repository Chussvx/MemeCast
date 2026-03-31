const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

// WARNING: API keys in client-side code are publicly visible.
// For production use, proxy requests through a backend server.
// Get your free key at https://openweathermap.org/api
const APIKey = 'YOUR_API_KEY_HERE';

function performSearch() {
    const city = input.value;

    if (city === '')
        return;

    // Reset error text to default
    error404.querySelector('p').textContent = 'OOPS! INVALID LOCATION :/';

    // Reset animations so they can replay
    weatherBox.classList.remove('fadeIn');
    weatherDetails.classList.remove('fadeIn');
    error404.classList.remove('fadeIn');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.classList.remove('weather-active');
                container.classList.add('error-active');
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.gif';
                    image.alt = 'Clear weather meme';
                    break;

                case 'Rain':
                case 'Drizzle':
                case 'Thunderstorm':
                    image.src = 'images/rain.gif';
                    image.alt = 'Rainy weather meme';
                    break;

                case 'Snow':
                    image.src = 'images/snow.gif';
                    image.alt = 'Snowy weather meme';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.gif';
                    image.alt = 'Cloudy weather meme';
                    break;

                case 'Mist':
                case 'Haze':
                case 'Fog':
                case 'Smoke':
                case 'Dust':
                case 'Sand':
                case 'Ash':
                case 'Squall':
                case 'Tornado':
                    image.src = 'images/mist.gif';
                    image.alt = 'Misty weather meme';
                    break;

                default:
                    image.src = 'images/cloud.gif';
                    image.alt = 'Weather meme';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.classList.remove('error-active');
            container.classList.add('weather-active');

        })
        .catch(() => {
            container.classList.remove('weather-active');
            container.classList.add('error-active');
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.querySelector('p').textContent = 'Network error. Please try again.';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
        });
}

search.addEventListener('click', performSearch);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
});
