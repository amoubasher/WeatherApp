// Server-Side APIs Day 3 01:25:46
// Server-Side APIs Day 3 01:43:24

var api_key = '4253ae682bded8fe54667e18d996e279';
function getGeoLocation (query, limit = 5) {
    return fetch('http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${5}&appid=${api_key}')
}


function getCurrentWeather({lat, lon, units}){
    return fetch ('')
}


getGeoLocation('Anaheim')
.then(response => response.json())
.then(data => {
    var {lat, lon} = data[0];
    getCurrentWeather({lat, lon})
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData => {
        document.body.textContent = JSON.stringify(weatherData, null, 2)
    })
    .catch(error => {
        document.body.textContent = error.message
    })
})
.catch(error => {
    document.body.textContent = error.message
})