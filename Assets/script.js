// Server-Side APIs Day 3 01:25:46
// Server-Side APIs Day 3 01:43:24
// Server-Side APIs Day 3 02:00:00

var api_key = 'eb7f528cc275c1424ff1ab19a726e7c7';
function getGeoLocation (query, limit = 5) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${5}&appid=${api_key}`).then(function(response){
        return response.json()
    })
    .then(data => {
        console.log(data[0].lat)
        getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
        .then(weatherResponse => weatherResponse.json())
        .then(weatherData => {
            //now we can consume data
            displayWeatherData(weatherData)
        })
        .catch(error => {
            console.log("error", error)
            document.body.textContent = error.message
        })
    })
}

function displayWeatherData(data){
    //do stuff with data here, DOM manipulation logic
    document.body.textContent = JSON.stringify(data, null, 2);
}


function getCurrentWeather({lat,lon}){
    // https://api.openweathermap.org/data/3.0
    return fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${'imperial'}&appid=${api_key}`)
    // ${arguments.lan} & ${arguments.lon} & ${imperial} & ${api_key}
}

getGeoLocation('Irvine');


