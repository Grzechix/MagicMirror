
async function fetchApiKeys() {
    try {
        const res = await fetch("http://raspberrypi.local:5000/api/keys");
        const data = await res.json();
        weatherApiKey = data.weather_api_key;
        //newsApiKey = data.news_api_key;
    } catch (error) {
        console.error("Error fetching API keys:", error);
    }
}

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

async function updateWeather() {
    if (!weatherApiKey) return; // Ensure the API key is available
    const city = "Gliwice";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=en`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric&lang=pl`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const temp = data.main.temp.toFixed(0); // Round to nearest whole number
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        
        document.getElementById("weather-temp").textContent = `${temp}°C`;
        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("weather-icon").alt = description;
        document.getElementById("weather-desc").textContent = description;

        try {
            const res = await fetch(url);
            const resForecast = await fetch(urlForecast);
            const data = await res.json();
            const dataForecast = await resForecast.json();

            // Display weather forecast for the next 3 hours
            let forecastHtml = "";
            for (let i = 0; i < 3; i++) {
                const entry = dataForecast.list[i];
                const hour = new Date(entry.dt * 1000).getHours();
                const tempF = Math.round(entry.main.temp);
                const iconF = entry.weather[0].icon;
                const iconUrlF = `https://openweathermap.org/img/wn/${iconF}.png`;
                forecastHtml += `<span style="margin-right:18px;">
            <img src="${iconUrlF}" alt="" style="width:28px;vertical-align:middle;">
            <span style="font-weight:500;">${tempF}°C</span>
            <span style="color:#aaa;font-size:0.9em;">${hour}:00</span>
        </span>`;
            }
            document.getElementById("weather-forecast").innerHTML = forecastHtml;
        } catch (error) {
            console.error("Error fetching weather forecast:", error);
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

async function updateNews() {
    const url = "http://raspberrypi.local:5000/api/nyt";
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("NYT API response:", data);

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

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Hello!";
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Have a nice afternoon!";
    else greeting = "Good evening!";
    document.getElementById("greeting").textContent = greeting;
}

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

// Inicjalizacja
(async () => {
    await fetchApiKeys();
    setInterval(updateTime, 1000);
    updateTime();
    setInterval(updateWeather, 900000);
    updateWeather();
    setInterval(updateNews, 900000);
    updateNews();

    // Nowe funkcje:
    setInterval(updateGreeting, 60000);
    updateGreeting();
    showQuote();
    setInterval(showQuote, 1000 * 60 * 3); // Change quote every 3 minutes
})();
///////////////////////////////////////


// This fuctnion is commented out because we need to upgrade plan of NewsAPI (too much informations in use) 

//async function updateNews() {
//    if (!newsApiKey) return; // Ensure the API key is available
//    //const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;
//    const url = `https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml`;
//    try {
//        const response = await fetch(url);
//        const data = await response.json();
//        console.log("News API response:", data);

//        const newsMarquee = document.getElementById('news');
//        if (!data.articles || data.articles.length === 0) {
//            newsMarquee.textContent = 'No news available.';
//            return;
//        }

//        const headlines = data.articles
//            .slice(0, 10)
//            .map(article => article.title)
//            .join('  ✦  ');

//        newsMarquee.textContent = headlines;
//    } catch (error) {
//        console.error('Error fetching news:', error);
//        document.getElementById('news').textContent = 'Failed to load news.';
//    }
//}