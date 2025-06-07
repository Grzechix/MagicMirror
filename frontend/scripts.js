let weatherApiKey = null;
//let newsApiKey = null;

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

        const temp = data.main.temp.toFixed(0); // Round to nearest whole number
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
        
        document.getElementById("weather-temp").textContent = `${temp}°C`;
        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("weather-icon").alt = description;
        document.getElementById("weather-desc").textContent = description;
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

function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById("date-time").textContent = `${dateStr} ${timeStr}`;
}

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Witaj!";
    if (hour < 12) greeting = "Dzień dobry!";
    else if (hour < 18) greeting = "Miłego popołudnia!";
    else greeting = "Dobry wieczór!";
    document.getElementById("greeting").textContent = greeting;
}

// Cytaty motywacyjne
const quotes = [
    "Każdy dzień jest nową szansą.",
    "Uwierz w siebie i działaj!",
    "Nigdy nie rezygnuj ze swoich marzeń.",
    "Sukces to suma małych wysiłków powtarzanych codziennie.",
    "Najlepszy czas na działanie jest teraz.",
    "Twoje nastawienie decyduje o Twoim sukcesie.",
    "Nie bój się zmian – to one prowadzą do rozwoju."
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
    setInterval(updateDateTime, 1000);
    updateDateTime();
    setInterval(updateGreeting, 60000);
    updateGreeting();
    showQuote();
    setInterval(showQuote, 1000 * 60 * 3); // zmiana cytatu co 3 minuty
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