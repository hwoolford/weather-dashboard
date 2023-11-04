const apiKey = "1cf183538d8a0988ab3207c9e8585519";
let city;
const userCity = document.getElementById("search-box");
const userInput = userCity.value.trim();
const searchBtn = document.getElementById("search-button");
const searchHistory = document.getElementsByClassName("search-history");

// const fetchURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
const fetchURLCity = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
// const fetchCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

// add event listener for searchBtn
// search btn will trigger city weather and will set search term in local storage
// Get lat and lon from geocodingAPI
// I will have to get the searched city from local storage and append it to the <ul> class "history" and will need to create new <li> items for each city searched. This will be done with a for loop
// I will need to set an event listener for clicking on the <li> which will trigger city weather
const weather =
  "http://api.openweathermap.org/geo/1.0/direct?q=Houston&appid=1cf183538d8a0988ab3207c9e8585519";

// http://api.openweathermap.org/data/2.5/forecast?lat=29.7589382&lon=-95.3676974&appid=1cf183538d8a0988ab3207c9e8585519&units=imperial

// http://api.openweathermap.org/data/2.5/weather?lat=29.7589382&lon=-95.3676974&appid=1cf183538d8a0988ab3207c9e8585519&units=imperial

$(document).ready(function () {
  $("#search-button").on("click", function () {
    const userInput = userCity.value.trim();
    localStorage.setItem("history", JSON.stringify(userInput));

    function getCoordinates() {
      fetch(weather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (let i = 0; i < data.length; i++) {
            city = data[i].name;
            latitude = data[i].lat;
            longitude = data[i].lon;
            console.log(city);
            console.log(latitude);
            console.log(longitude);
            // getCity();
            let storedCity = JSON.parse(localStorage.getItem("history"));
            const searchHistory = document.getElementsByClassName("search-history");
            let searchDiv = document.createElement("div");
            let searchUl = document.createElement("ul");
            let searchLi = document.createElement("li");
            searchLi.innerHTML = storedCity;
            searchDiv.append(searchUl);
            searchUl.append(searchLi);
          }
        });
    }

    // function getCity() {
    //   // let storedCity = JSON.parse(localStorage.getItem("history"));
    //   // let historyEl = document.getElementsByClassName("search-history");

    //   userCity.innerHTML = "";
    //   for (let i = 0; i < storedCity.length; i++) {
    //     let searchUl = document.createElement("ul");
    //     let searchLi = document.createElement("li");
    //     historyEl.innerHTML = searchUl;
    //     searchUl.innerHTML = searchLi;
    //   }
    // }

    getCoordinates();
  });

  // function getCity () {
  //     let storedCity = JSON.parse(localStorage.getItem("history"))
  //     let historyEl = document.querySelectorAll(".history-list");
  // }
});

// searchBtn.addEventListener("click", getCoordinates())
