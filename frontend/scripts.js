async function updateTime() {
    try {
        const res = await fetch("http://localhost:5000/api/time");
        const data = await res.json();
        console.log("Fetched time:", data.time); // Dodaj log
        document.getElementById("clock").textContent = data.time;
    } catch (error) {
        console.error("Error fetching time:", error);
    }
}

async function updateWeather() { //apikey pogodynka
  const apiKey = "xxx";
  const city = "Gliwice"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

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

async function updateNews() { //apikey newsapi
  const apiKey = "xxx";
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const newsMarquee = document.getElementById('news');
    if (!data.articles || data.articles.length === 0) {
      newsMarquee.textContent = 'Brak dostępnych wiadomości.';
      return;
    }

    const headlines = data.articles
      .slice(0, 10)
      .map(article => article.title)
      .join('  ✦  ');

    newsMarquee.textContent = headlines;
  } catch (error) {
    console.error('Error fetching news:', error);
    document.getElementById('news').textContent = 'Nie udało się załadować wiadomości.';
  }
} 
// async function updateTime() {
//     fetch("http://localhost:5000/api/time") // URL, pod którym działa Flask
//       .then(response => response.json())    // Zakładamy, że API zwraca JSON
//       .then(data => {
//         document.getElementById("clock").innerText = data.time;
//       })
//       .catch(error => console.error("Error fetching time:", error));

//     const res = await fetch("/api/time");
//     const data = await res.json();
//     document.getElementById("clock").textContent = data.time;
// }

setInterval(updateTime, 1000);
updateTime();
setInterval(updateWeather, 900000);
updateWeather();
setInterval(updateNews, 900000);
updateNews();
