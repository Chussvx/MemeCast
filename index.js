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

// WMO weather code to image/description mapping
function getWeatherInfo(code) {
    if (code === 0) return { img: 'images/clear.gif', alt: 'Clear weather meme', desc: 'Clear sky' };
    if (code <= 3) return { img: 'images/cloud.gif', alt: 'Cloudy weather meme', desc: 'Partly cloudy' };
    if (code <= 48) return { img: 'images/mist.gif', alt: 'Misty weather meme', desc: 'Fog' };
    if (code <= 57) return { img: 'images/rain.gif', alt: 'Rainy weather meme', desc: 'Drizzle' };
    if (code <= 67) return { img: 'images/rain.gif', alt: 'Rainy weather meme', desc: 'Rain' };
    if (code <= 77) return { img: 'images/snow.gif', alt: 'Snowy weather meme', desc: 'Snow' };
    if (code <= 82) return { img: 'images/rain.gif', alt: 'Rainy weather meme', desc: 'Rain showers' };
    if (code <= 86) return { img: 'images/snow.gif', alt: 'Snowy weather meme', desc: 'Snow showers' };
    if (code <= 99) return { img: 'images/rain.gif', alt: 'Rainy weather meme', desc: 'Thunderstorm' };
    return { img: 'images/cloud.gif', alt: 'Weather meme', desc: 'Unknown' };
}

function showError(message) {
    container.classList.remove('weather-active');
    container.classList.add('error-active');
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.querySelector('p').textContent = message;
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

async function performSearch() {
    const city = input.value;

    if (city === '')
        return;

    // Reset animations so they can replay
    weatherBox.classList.remove('fadeIn');
    weatherDetails.classList.remove('fadeIn');
    error404.classList.remove('fadeIn');

    try {
        // Step 1: Geocode city name to coordinates (Open-Meteo — no API key needed)
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );
        const geoJson = await geoRes.json();

        if (!geoJson.results || geoJson.results.length === 0) {
            showError('OOPS! INVALID LOCATION :/');
            return;
        }

        const { latitude, longitude } = geoJson.results[0];

        // Step 2: Fetch current weather using coordinates
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );
        const weatherJson = await weatherRes.json();
        const current = weatherJson.current;

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const weather = getWeatherInfo(current.weather_code);
        image.src = weather.img;
        image.alt = weather.alt;

        temperature.innerHTML = `${Math.round(current.temperature_2m)}<span>°C</span>`;
        description.textContent = weather.desc;
        humidity.textContent = `${current.relative_humidity_2m}%`;
        wind.textContent = `${Math.round(current.wind_speed_10m)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.classList.remove('error-active');
        container.classList.add('weather-active');

    } catch {
        showError('Network error. Please try again.');
    }
}

search.addEventListener('click', performSearch);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
});
