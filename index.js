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

// Meme config per weather condition
// Each has: desc, alt, localImg (fallback), memeOptions (memegen.link templates), giphyPool (curated GIF URLs)
const WEATHER_MEMES = {
    clear: {
        desc: 'Clear sky',
        alt: 'Clear weather meme',
        localImg: 'images/clear.gif',
        memeOptions: [
            { template: 'buzz', top: 'Sun in {city}', bottom: 'Sun everywhere' },
            { template: 'success', top: 'Clear skies', bottom: 'Time to go outside' },
            { template: 'leo', top: 'Clear sky in {city}', bottom: 'Cheers to that' },
            { template: 'aww-yeah', top: 'No clouds', bottom: 'Perfect weather' },
        ],
        giphyPool: [
            'https://media.giphy.com/media/l0MYt5jPR6QX5APm0/giphy.gif',
            'https://media.giphy.com/media/3o7TKF1fSIs1R19B8k/giphy.gif',
            'https://media.giphy.com/media/xTiTnBMEz7zAKs57LG/giphy.gif',
            'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
        ],
    },
    cloudy: {
        desc: 'Partly cloudy',
        alt: 'Cloudy weather meme',
        localImg: 'images/cloud.gif',
        memeOptions: [
            { template: 'fwp', top: 'I wanted sunshine', bottom: 'But got clouds in {city}' },
            { template: 'fry', top: 'Not sure if cloudy', bottom: 'Or about to rain' },
            { template: 'sad-biden', top: 'Looked outside', bottom: 'Just clouds' },
            { template: 'harold', top: 'Cloudy again in {city}', bottom: 'This is fine' },
        ],
        giphyPool: [
            'https://media.giphy.com/media/3oriO04qxVReM5rJEA/giphy.gif',
            'https://media.giphy.com/media/l4FGuhL4U2WSOXsmI/giphy.gif',
            'https://media.giphy.com/media/26ufcVAp3AiJJsrIs/giphy.gif',
            'https://media.giphy.com/media/WoF3yfYupTt8mHc7va/giphy.gif',
        ],
    },
    fog: {
        desc: 'Fog',
        alt: 'Foggy weather meme',
        localImg: 'images/mist.gif',
        memeOptions: [
            { template: 'fry', top: "Can't see anything in {city}", bottom: 'Must be fog' },
            { template: 'buzz', top: 'Fog', bottom: 'Fog everywhere' },
            { template: 'philosoraptor', top: 'If I can not see the fog', bottom: 'Is it still there' },
            { template: 'interesting', top: "I don't always drive in fog", bottom: 'But when I do I see nothing' },
        ],
        giphyPool: [
            'https://media.giphy.com/media/3o7WIQ4FARJdpmUni8/giphy.gif',
            'https://media.giphy.com/media/3oEjHB1EKuujDjYFWw/giphy.gif',
            'https://media.giphy.com/media/xUPGcC0R9QjyxkPnS8/giphy.gif',
            'https://media.giphy.com/media/l2JhIUyUs8KDCCf3W/giphy.gif',
        ],
    },
    drizzle: {
        desc: 'Drizzle',
        alt: 'Drizzle weather meme',
        localImg: 'images/rain.gif',
        memeOptions: [
            { template: 'fry', top: 'Not sure if raining', bottom: 'Or just drizzling in {city}' },
            { template: 'fine', top: 'Just a light drizzle', bottom: 'This is fine' },
            { template: 'rollsafe', top: "Can't get rained on", bottom: "If it's only drizzle" },
        ],
        giphyPool: [
            'https://media.giphy.com/media/3o7510ZWSM5IVMoSoU/giphy.gif',
            'https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif',
            'https://media.giphy.com/media/26gsv1iextbg5Gm5O/giphy.gif',
        ],
    },
    rain: {
        desc: 'Rain',
        alt: 'Rainy weather meme',
        localImg: 'images/rain.gif',
        memeOptions: [
            { template: 'disastergirl', top: 'Nice weather in {city}', bottom: 'Would be a shame if it rained' },
            { template: 'fine', top: 'Raining outside', bottom: 'This is fine' },
            { template: 'buzz', top: 'Rain', bottom: 'Rain everywhere' },
            { template: 'persian-cat', top: 'When it starts raining', bottom: 'And you left your window open' },
        ],
        giphyPool: [
            'https://media.giphy.com/media/l0MYt5jPR6QX5APm0/giphy.gif',
            'https://media.giphy.com/media/3o7510ZWSM5IVMoSoU/giphy.gif',
            'https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif',
            'https://media.giphy.com/media/DWo6beGJTTqFi/giphy.gif',
        ],
    },
    snow: {
        desc: 'Snow',
        alt: 'Snowy weather meme',
        localImg: 'images/snow.gif',
        memeOptions: [
            { template: 'winter-is-coming', top: 'Brace yourselves', bottom: 'Snow is coming to {city}' },
            { template: 'fine', top: 'Just a little snow', bottom: 'This is fine' },
            { template: 'doge', top: 'Such snow very cold', bottom: 'Much freeze wow' },
            { template: 'everywhere', top: 'Snow in {city}', bottom: 'Snow everywhere' },
        ],
        giphyPool: [
            'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
            'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyE/giphy.gif',
            'https://media.giphy.com/media/fGOjgWRzQkC2I/giphy.gif',
            'https://media.giphy.com/media/xTiTnBMEz7zAKs57LG/giphy.gif',
        ],
    },
    thunderstorm: {
        desc: 'Thunderstorm',
        alt: 'Thunderstorm weather meme',
        localImg: 'images/rain.gif',
        memeOptions: [
            { template: 'disastergirl', top: 'Thunder in {city}', bottom: 'I love the chaos' },
            { template: 'fine', top: 'Thunderstorm outside', bottom: 'This is fine' },
            { template: 'persian-cat', top: 'When thunder hits', bottom: 'And you are home alone' },
            { template: 'scared-cat', top: 'Thunderstorm', bottom: 'Time to hide' },
        ],
        giphyPool: [
            'https://media.giphy.com/media/3oEjI8vagntG7EDxgQ/giphy.gif',
            'https://media.giphy.com/media/l4FGuhL4U2WSOXsmI/giphy.gif',
            'https://media.giphy.com/media/26gsv1iextbg5Gm5O/giphy.gif',
            'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyE/giphy.gif',
        ],
    },
};

// Map WMO weather codes to meme categories
function getWeatherInfo(code) {
    if (code === 0) return WEATHER_MEMES.clear;
    if (code <= 3) return WEATHER_MEMES.cloudy;
    if (code <= 48) return WEATHER_MEMES.fog;
    if (code <= 57) return WEATHER_MEMES.drizzle;
    if (code <= 67) return WEATHER_MEMES.rain;
    if (code <= 77) return WEATHER_MEMES.snow;
    if (code <= 82) return WEATHER_MEMES.rain;
    if (code <= 86) return WEATHER_MEMES.snow;
    if (code <= 99) return WEATHER_MEMES.thunderstorm;
    return WEATHER_MEMES.cloudy;
}

// Encode text for memegen.link URLs
function encodeMemeText(text) {
    return text
        .replace(/_/g, '__')
        .replace(/ /g, '_')
        .replace(/\?/g, '~q')
        .replace(/%/g, '~p')
        .replace(/\//g, '~s')
        .replace(/#/g, '~h')
        .replace(/"/g, "''");
}

// Try loading an image URL with a timeout
function preloadImage(url, timeoutMs) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const timer = setTimeout(() => { img.src = ''; reject(); }, timeoutMs);
        img.onload = () => { clearTimeout(timer); resolve(url); };
        img.onerror = () => { clearTimeout(timer); reject(); };
        img.src = url;
    });
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Tiered meme loading: memegen.link → curated GIPHY → local fallback
async function loadWeatherMeme(weatherInfo, cityName) {
    // Tier 1: Try memegen.link
    try {
        const meme = pickRandom(weatherInfo.memeOptions);
        const top = encodeMemeText(meme.top.replace('{city}', cityName));
        const bottom = encodeMemeText(meme.bottom.replace('{city}', cityName));
        const url = `https://api.memegen.link/images/${meme.template}/${top}/${bottom}.gif`;
        return await preloadImage(url, 4000);
    } catch { /* fall through */ }

    // Tier 2: Try curated GIPHY URL
    try {
        const url = pickRandom(weatherInfo.giphyPool);
        return await preloadImage(url, 3000);
    } catch { /* fall through */ }

    // Tier 3: Local fallback (already showing)
    return weatherInfo.localImg;
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

        // Show local GIF immediately as placeholder
        image.src = weather.localImg;
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

        // Async upgrade to dynamic meme (non-blocking)
        image.classList.add('loading');
        loadWeatherMeme(weather, city).then(url => {
            image.src = url;
            image.classList.remove('loading');
        });

    } catch {
        showError('Network error. Please try again.');
    }
}

search.addEventListener('click', performSearch);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
});
