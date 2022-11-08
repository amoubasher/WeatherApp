// Server-Side APIs Day 3 01:25:46
// Server-Side APIs Day 3 01:43:24
// Server-Side APIs Day 3 02:00:00

var api_key = 'eb7f528cc275c1424ff1ab19a726e7c7';
function getGeoLocation (query, limit = 5) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${5}&appid=${api_key}`)
}


function getCurrentWeather({arguments}){
    // https://api.openweathermap.org/data/3.0
    return fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid={API key}`)
    // ${arguments.lan} & ${arguments.lon} & ${imperial} & ${api_key}
}


getGeoLocation('Anaheim')
.then(function(response){
    return response.json()
})
.then(data => {
    console.log(data)
    getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
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