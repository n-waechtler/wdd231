const currentTemp = document.querySelector('#current-weather');
const forecastDiv = document.querySelector('#forecast');

const lat = "40.7607";
const lon = "-111.8910";
const apiKey = "1adaff4efb93fa6a3724f89a87e41d3d";

const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    const currentItem = data.list[0];
    currentTemp.innerHTML = `
        <p><strong>Current Temp:</strong> ${Math.round(currentItem.main.temp)}&deg;F</p>
        <p><strong>Condition:</strong> ${currentItem.weather[0].description}</p>
        `;
    
    forecastDiv.innerHTML = '<h3>3-Day Forecast</h3>';
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const card = document.createElement('div');
        card.className = 'forecast-day';
        card.innerHTML = `<span>${dayName}:</span> <strong>${Math.round(day.main.temp)}&deg;F</strong> - ${day.weather[0].description}`;
        forecastDiv.appendChild(card);
    });
}

apiFetch();