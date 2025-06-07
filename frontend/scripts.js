let weatherApiKey = null;

// --- API keys ---
async function fetchApiKeys() {
    try {
        const res = await fetch("http://raspberrypi.local:5000/api/keys");
        const data = await res.json();
        weatherApiKey = data.weather_api_key;
    } catch (error) {
        console.error("Error fetching API keys:", error);
    }
}

// --- TIME & DATE ---
async function updateTime() {
    try {
        const res = await fetch("http://raspberrypi.local:5000/api/time");
        const data = await res.json();
        document.getElementById("clock").innerHTML = `${data.hour}:${data.minute}<sup>${data.second}</sup>`;
        document.getElementById("date").textContent = data.date;
    } catch (error) {
        console.error("Error fetching time:", error);
    }
}

// --- WEATHER ---
async function updateWeather() {
    if (!weatherApiKey) return; // Ensure the API key is available
    const city = "Gliwice";
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=en`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric&lang=pl`;

    try {
        const resCurrent = await fetch(urlCurrent);
        const dataCurrent = await resCurrent.json();

        const temp = Math.round(dataCurrent.main.temp);
        const description = dataCurrent.weather[0].description;
        const icon = dataCurrent.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        
        document.getElementById("weather-temp").textContent = `${temp}°C`;
        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("weather-icon").alt = description;
        document.getElementById("weather-desc").textContent = description;

        const resForecast = await fetch(urlForecast);
        const dataForecast = await resForecast.json();

        // Display weather forecast for the next 3 hours
        let forecastHtml = "";
        for (let i = 0; i < 3; i++) {
            const entry = dataForecast.list[i];
            const hour = new Date(entry.dt * 1000).getHours();
            const tempF = Math.round(entry.main.temp);
            const iconF = entry.weather[0].icon;
            const iconUrlF = `https://openweathermap.org/img/wn/${iconF}.png`;
            forecastHtml += `<span class="forecast-hour">
                <img src="${iconUrlF}" alt="" class="forecast-icon">
                <span class="forecast-temp">${tempF}°C</span>
                <span class="forecast-time">${hour}:00</span>
            </span>`;
        }
        document.getElementById("weather-forecast").innerHTML = forecastHtml;

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// --- NEWS ---
async function updateNews() {
    const url = "http://raspberrypi.local:5000/api/nyt";
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log("NYT API response:", data);

        const newsMarquee = document.getElementById('news');
        if (!data.articles || data.articles.length === 0) {
            newsMarquee.textContent = 'No news available.';
            return;
        }

        const headlines = data.articles
            .slice(0, 10)
            .map(article => article.title)
            .join('  ✦  ');

        newsMarquee.textContent = headlines;
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news').textContent = 'Failed to load news.';
    }
}

// --- GREETING ---
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Hello!";
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Have a nice afternoon!";
    else greeting = "Good evening!";
    document.getElementById("greeting").textContent = greeting;
}

// --- QUOTES ---
const quotes = [
    "Every day is a new opportunity",
    "Believe in yourself and act!",
    "Never give up on your dreams.",
    "Success is the sum of small efforts repeated every day.",
    "The best time to act is now.",
    "Your attitude determines your success.",
    "Don't be afraid of change - it is change that leads to growth."
];
let currentQuote = 0;
function showQuote() {
    const quoteDiv = document.getElementById("quote");
    quoteDiv.style.opacity = 0;
    setTimeout(() => {
        quoteDiv.textContent = quotes[currentQuote];
        quoteDiv.style.opacity = 1;
        currentQuote = (currentQuote + 1) % quotes.length;
    }, 700);
}

// --- INITIALIZATION ---
(async () => {
    await fetchApiKeys();
    setInterval(updateTime, 1000);
    updateTime();
    setInterval(updateWeather, 900000);
    updateWeather();
    setInterval(updateNews, 900000);
    updateNews();
    setInterval(updateGreeting, 60000);
    updateGreeting();
    showQuote();
    setInterval(showQuote, 1000 * 60 * 3); // Change quote every 3 minutes
})();