// Server-Side APIs Day 3 01:25:46
// Server-Side APIs Day 3 01:43:24
// Server-Side APIs Day 3 02:00:00
// Server-Side APIs Day 3 02:13:15

var input = document.querySelector('#input')

input.addEventListener('keyup', function(event){
    if (event.key === 'Enter'){
        createWeatherDisplay(event.target.value)
    }
})

var previousSearchHistory = localStorage.getItem('history')
if (previousSearchHistory) {
    previousSearchHistory = JSON.parse(previousSearchHistory)
} else {
    previousSearchHistory = []
}

for (var i=0; i <previousSearchHistory.length; i++){
    var historyBtn = document.createElement('button')
    var historyItem = previousSearchHistory[i]
    historyBtn.textContent = historyItem
    historyBtn.addEventListener('click', function(event){
        createWeatherDisplay(event.target.textContent)
    })
    document.querySelector('.history').append(historyBtn)
}

var todayDate = moment()
$("#date").text(todayDate.format("MMMM Do, YYYY"))

var forecast = document.querySelector('#forecast')

// var button = document.querySelector('#button')
// button.addEventListener('click', function(event){
//     if (event.click === 'click'){
//         createWeatherDisplay(event.target.value)
//     }
// })

var api_key = 'eb7f528cc275c1424ff1ab19a726e7c7';

function getGeoLocation (query, limit = 5) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${5}&appid=${api_key}`)
}


function getCurrentWeather(arguments){
    // https://api.openweathermap.org/data/3.0
    return fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${api_key}`)
    // ${arguments.lan} & ${arguments.lon} & ${imperial} & ${api_key}
}

function getFiveDayForecast(arguments){
    return fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${api_key}`)
}


function addToHistory(location){
    var searchHistory = localStorage.getItem('history')
    if (searchHistory){
        searchHistory = JSON.parse(searchHistory)
        
        if(searchHistory.includes(location)){
            return
        }

        searchHistory.push(location)
        localStorage.setItem('history', JSON.stringify(searchHistory))
    } else {
        searchHistory = [location]
        localStorage.setItem('history', JSON.stringify(searchHistory))
    }
}

function createWeatherDisplay(location){
    return getGeoLocation(location)
    .then(function(response){
        return response.json()
    })
    .then(data => {
        console.log(data)
        if (data.length === 0){
            var errorEl = document.createElement('p')
            errorEl.textContent = `We could not find ${location}`
            document.body.appendChild(errorEl)
        } else {
            // For Current Weather
            getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
            .then(weatherResponse => weatherResponse.json())
            .then(weatherData => {
                var weatherPicture = document.createElement('img')
                weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                var currentDateDiv = document.createElement('div')
                var currentWeatherStatement = document.createElement('p')
                var currentTemp = document.createElement('p')
                var currentDate = document.createElement('h4')
                currentDate.textContent = todayDate.format("MM/D/YYYY")
                currentTemp.textContent = `Temperature: ${weatherData.main.temp} F`
                var currentWind = document.createElement('p')
                currentWind.textContent = `Wind: ${weatherData.wind.speed} MPH`
                var currentHumidity = document.createElement('p')
                currentHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`
                currentWeatherStatement.textContent = `${weatherData.weather[0].main}: it is currently ${weatherData.weather[0].description}`
                // document.body.appendChild(weatherPicture)
                // document.body.appendChild(currentWeatherStatement)
                addToHistory(location)
                currentDateDiv.append(weatherPicture, currentDate, currentTemp, currentWeatherStatement, currentWind, currentHumidity)
                currentDay.append(currentDateDiv)
                // document.body.textContent = JSON.stringify(weatherData, null, 2)
            })
            // Add 5 Day Forecast

            getFiveDayForecast({ lat: data[0].lat, lon: data[0].lon })
            .then(forecastFiveResponse => forecastFiveResponse.json())
            .then(forecastData => {
                for (i=0; i<5; i++){
                    var forecastDataDiv = document.createElement('div')
                    forecastDataDiv.setAttribute('style', 'margin: 50px;')
                    var dayHeader = document.createElement('h3')
                    dayHeader.textContent = todayDate.add(1, "days").format("MM/D/YYYY")
                    var forecastTempData = document.createElement('p')
                    forecastTempData.textContent=`Temperature: ${forecastData.list[i].main.temp} F`
                    var forecastWindData = document.createElement('p')
                    forecastWindData.textContent=`Wind Speed: ${forecastData.list[i].wind.speed} MPH`
                    var forecastHumidityData = document.createElement('p')
                    forecastHumidityData.textContent=`Humidity: ${forecastData.list[i].main.humidity}%`
                    forecastDataDiv.append(dayHeader, forecastTempData, forecastWindData, forecastHumidityData)
                    forecast.append(forecastDataDiv)
                }
            })

            .catch(error => {
                document.body.textContent = error.message
            })   
        }
    })
    .catch(error => {
        document.body.textContent = error.message
    })
}