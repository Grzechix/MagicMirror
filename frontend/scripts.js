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
