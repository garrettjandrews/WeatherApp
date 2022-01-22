//d05cf8e588819356aed46d471ee283b2 - api key for weather.  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=d05cf8e588819356aed46d471ee283b2", {mode: 'cors'})

async function getWeatherData(location) {
    let response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=d05cf8e588819356aed46d471ee283b2", {mode: 'cors'})
    let jsonResponse = await response.json();
    return jsonResponse;
}

async function createWeatherObject(location) {
    let r = await getWeatherData(location);
    return weatherObject = {
        temperature: r.main.temp,
        feelsLike: r.main.feels_like,
        low: r.main.temp_min,
        high: r.main.temp_max,
        mainDescription: r.weather.main,
        moreDetails: r.weather.description,
        city: r.name,
        country: r.sys.country,
        windSpeed: r.wind.speed,
        humidity: r.main.humidity
}
}

function kelvinToFahrenheit(temp) {
    return Math.round((temp-273.15)*9/5 +32);
}

function updateWeather(location) {
    let cityField = document.getElementById('city-field');
    let countryField = document.getElementById('country-field');
    let tempField = document.getElementById('temp-field');
    let highField = document.getElementById('high-field');
    let lowField = document.getElementById('low-field');
    let feelsLikeField = document.getElementById('feels-like-field');
    let mainDescField = document.getElementById('main-desc-field');
    let moreDetailsField = document.getElementById('more-details-field');
    let windField = document.getElementById('wind-field');
    let humidField = document.getElementById('humid-field');
    createWeatherObject(location)
        .then(r => {
            cityField.textContent = "City: " + r.city;
            countryField.textContent = "Country: " + r.country;
            tempField.textContent = "Temperature: " + kelvinToFahrenheit(r.temperature);
            highField.textContent = "High: " + kelvinToFahrenheit(r.high);
            lowField.textContent = "Low: " + kelvinToFahrenheit(r.low);
            feelsLikeField.textContent = "Feels Like: " + kelvinToFahrenheit(r.feelsLike);
            mainDescField.textContent = "Description: " + r.mainDescription;
            moreDetailsField.textContent = "More Details: " + r.moreDetails;
            windField.textContent = "Wind Spd: " + r.windSpeed;
            humidField.textContent = "Humidity: " + r.humidity + "%";
        })
        
}

updateWeather("Atlanta")



searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', () => {
    let userSelection;
    if (document.querySelector('.search-box') == null) {
        userSelection = "Atlanta"
    } else {
        userSelection = document.querySelector('.search-box').value
    }
    updateWeather(userSelection);
})

searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        let userSelection;
        if (document.querySelector('.search-box') == null) {
            userSelection = "Atlanta"
        } else {
            userSelection = document.querySelector('.search-box').value
        }
        updateWeather(userSelection);
    }
})
