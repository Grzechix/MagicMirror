let weatherApiKey = null;
let newsApiKey = null;

async function fetchApiKeys() {
    try {
        const res = await fetch("http://raspberrypi.local:5000/api/keys");
        const data = await res.json();
        weatherApiKey = data.weather_api_key;
        newsApiKey = data.news_api_key;
    } catch (error) {
        console.error("Error fetching API keys:", error);
    }
}

async function updateTime() {
    try {
        const res = await fetch("http://raspberrypi.local:5000/api/time");
        const data = await res.json();
        document.getElementById("clock").textContent = data.time;
    } catch (error) {
        console.error("Error fetching time:", error);
    }
}

async function updateWeather() {
    if (!weatherApiKey) return; // Ensure the API key is available
    const city = "Gliwice";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=en`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const temp = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const weatherText = `Weather in ${cityName}: ${description}, ${temp}°C`;

        const weatherDiv = document.getElementById("weather");
        weatherDiv.textContent = weatherText;

        const oldIcon = weatherDiv.querySelector("img");
        if (oldIcon) oldIcon.remove();

        const weatherIcon = document.createElement("img");
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherDiv.appendChild(weatherIcon);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

async function updateNews() {
    if (!newsApiKey) return; // Ensure the API key is available
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

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

// Najpierw pobierz klucze, potem uruchom resztę
(async () => {
    await fetchApiKeys();
    setInterval(updateTime, 1000);
    updateTime();
    setInterval(updateWeather, 900000);
    updateWeather();
    setInterval(updateNews, 900000);
    updateNews();
})();