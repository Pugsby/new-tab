const quote = document.getElementById("quote")
const clock = document.getElementById("time")
const date = document.getElementById("date")
const search = document.getElementById("search")
fetch('https://bing.biturl.top')
    .then(response => response.json())
    .then(data => {
        if (data && data.url) {
            document.body.style.backgroundImage = `url(${data.url})`;
        } else {
            console.error('URL not found in the response');
        }
    })
    .catch(error => console.error('Error fetching the background image:', error));

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours())%12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;
    const day = String(now.getDate())
    const month = String(now.getMonth())
    const year = String(now.getFullYear())
    date.textContent = `${month}/${day}/${year}`
}

setInterval(updateClock, 1000);
updateClock(); // Initialize clock immediately
quote.innerHTML = "INSERT QUOTE HERE"

fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        if (data) {
            const now = new Date();
            const hours = now.getHours();
            const used = hours >= 6 && hours < 19 ? data.day : data.night;
            const randomIndex = Math.floor(Math.random() * used.length);
            const selectedQuote = used[randomIndex]
            quote.textContent = `"${selectedQuote.quote}" -${selectedQuote.author}`;
        } else {
            console.error('Invalid quotes data format');
        }
    })
    .catch(error => console.error('Error fetching quotes:', error));

    search.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = search.value.trim();
            if (query) {
                window.location.href = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
            }
        }
    });