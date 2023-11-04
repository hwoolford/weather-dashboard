const userCity = document.getElementById("search-box");
const userInput = userCity.value.trim();
const searchBtn = document.getElementById("search-button");
const searchHistory = document.getElementsByClassName("search-history");
const tableBody = document.getElementById("history");
const apiKey = "1cf183538d8a0988ab3207c9e8585519";

// const fetchURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

// const fetchCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

// add event listener for searchBtn
// search btn will trigger city weather and will set search term in local storage
// Get lat and lon from geocodingAPI
// I will have to get the searched city from local storage and append it to the <ul> class "history" and will need to create new <li> items for each city searched. This will be done with a for loop
// I will need to set an event listener for clicking on the <li> which will trigger city weather

$(document).ready(function () {
  $("#search-button").on("click", function () {
    const userInput = userCity.value.trim();
    localStorage.setItem("history", JSON.stringify(userInput));

    function getCoordinates() {
      let city = userInput
      const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
      fetch(geocodeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (let i = 0; i < data.length; i++) {
            cityName = data[i].name;
            latitude = data[i].lat;
            longitude = data[i].lon;
            console.log(city);
            console.log(latitude);
            console.log(longitude);
            
            let storedCity = JSON.parse(localStorage.getItem("history"));
            let createTableRow = document.createElement("tr");
            let tableData = document.createElement("td");
            let info = document.createElement("a");

            info.textContent = storedCity;
            tableData.appendChild(info);
            createTableRow.appendChild(tableData);
            tableBody.appendChild(createTableRow);
          }
        });
    }

    getCoordinates();
  });
});
