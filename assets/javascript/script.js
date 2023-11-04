const apiKey = "1cf183538d8a0988ab3207c9e8585519";
let city;
const userCity = document.getElementById("search-box");
const searchBtn = document.getElementById("search-button");
// const fetchURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
const fetchURLCity = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
// const fetchCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;


// add event listener for searchBtn
// search btn will trigger city weather and will set search term in local storage
// Get lat and lon from geocodingAPI
// I will have to get the searched city from local storage and append it to the <ul> class "history" and will need to create new <li> items for each city searched. This will be done with a for loop
// I will need to set an event listener for clicking on the <li> which will trigger city weather
const weather = 'http://api.openweathermap.org/geo/1.0/direct?q=Houston&appid=1cf183538d8a0988ab3207c9e8585519'

// http://api.openweathermap.org/data/2.5/forecast?lat=29.7589382&lon=-95.3676974&appid=1cf183538d8a0988ab3207c9e8585519&units=imperial

// http://api.openweathermap.org/data/2.5/weather?lat=29.7589382&lon=-95.3676974&appid=1cf183538d8a0988ab3207c9e8585519&units=imperial

function getCoordinates() {
    fetch(weather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            nameCity = data[i].name
            latitude = data[i].lat
            longitude = data[i].lon
            console.log(nameCity)
            console.log(latitude)
            console.log(longitude)
        }
    })
}
getCoordinates();

   
// searchBtn.addEventListener("click", getCoordinates())