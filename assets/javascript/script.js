const userCity = document.getElementById("search-box");
const userInput = userCity.value.trim();
const searchBtn = document.getElementById("search-button");
const searchHistory = document.getElementsByClassName("search-history");
const tableBody = document.getElementById("history");
const nameCity = document.getElementsByClassName("city-name");
const currentInfo = document.getElementsByClassName("current-info");
const currentTemp = document.getElementById("current-temp");
const currentWind = document.getElementById("current-wind");
const currentHumidity = document.getElementById("current-humidity");
const currentIcon = document.getElementById("current-weather-icon");

const apiKey = "1cf183538d8a0988ab3207c9e8585519";
let city;
let latitude;
let longitude;

$(document).ready(function () {
  $("#search-button").on("click", function () {
    const userInput = userCity.value.trim();
    localStorage.setItem("history", JSON.stringify(userInput));

    function getCoordinates() {
      let city = userInput;
      const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

      fetch(geocodeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (let i = 0; i < data.length; i++) {
            let city = data[i].name;
            let latitude = data[i].lat;
            let longitude = data[i].lon;

            let storedCity = JSON.parse(localStorage.getItem("history"));
            let createTableRow = document.createElement("tr");
            let tableData = document.createElement("td");
            let info = document.createElement("a");

            info.textContent = storedCity;
            tableData.appendChild(info);
            createTableRow.appendChild(tableData);
            tableBody.appendChild(createTableRow);
            function getForecast(latitude, longitude, city) {
              // console.log(city);
              // console.log(latitude);
              // console.log(longitude);

              const fetchWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

              fetch(fetchWeatherURL)
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  console.log(data);
                  let cName = data.name;
                  console.log(cName);
                  let cTemp = data.main.temp;
                  console.log(cTemp);
                  let cWind = data.wind.speed;
                  console.log(cWind);
                  let cHumidity = data.main.humidity;
                  console.log(cHumidity);
                  let dtUTC = data.dt;

                  let cDate = new Date(dtUTC * 1000);
                  let today = cDate.toLocaleDateString("en-US");
                  console.log(today);

                  let cIcon = data.weather[0].icon;
                  let iconURL =
                    "https://openweathermap.org/img/wn/" + cIcon + "@4x.png";
                  currentIcon.src = iconURL;

                  currentTemp.textContent = "Temperature: " + cTemp + "°F";
                  currentInfo.textContent = currentTemp.textContent;

                  currentWind.textContent = "Wind: " + cWind + " MPH";
                  currentInfo.textContent = currentWind.textContent;

                  currentHumidity.textContent = "Humidity: " + cHumidity + "%";
                  currentInfo.textContent = currentHumidity.textContent;

                  nameCity[0].textContent = cName + " (" + today + ")";
                  console.log(nameCity[0].textContent);
                  currentInfo.textContent = nameCity[0].textContent;
                });

              const fetchForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

              fetch(fetchForecastURL)
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  // console.log(data);
                  for (let i = 0; i < data.list.length; i++) {
                    let cityName = data.city.name;
                    // console.log(cityName)
                    let temp = data.list[i].main.temp;
                    // console.log(temp)
                    let humidity = data.list[i].main.humidity;
                    // console.log(humidity)
                    let wind = data.list[i].wind.speed;
                    // console.log(wind)
                    let icon = data.list[i].weather[0].icon;
                    // console.log(icon)
                    let dateTime = data.list[i].dt_txt;
                    let date = data.list[i].dt_txt.split(" ")[0];
                    let time = data.list[i].dt_txt.split(" ")[1];
                    const forecastArray = data.list;
                    let dt = data.list[i].dt;
                    // console.log(dt)

                    //  console.log(dateTime);

                    // console.log(date);

                    // console.log(time);

                    // Getting current results for the current weather data
                    // let currentDate = data.list[0].dt_txt;
                    // let currentTemperature = data.list[0].main.temp;
                    // let currentWindSpeed = data.list[0].wind.speed;
                    // let currentHumid = data.list[0].main.humidity;
                    // let iconCode = data.list[0].weather[0].icon;
                    // console.log(iconCode)

                    // nameCity[0].textContent =
                    //   cityName + " (" + currentDate.split(" ")[0] + ")";
                    // // console.log(nameCity[0].textContent);
                    // currentInfo.textContent = nameCity[0].textContent;

                    // currentTemp.textContent =
                    //   "Temperature: " + currentTemperature + "°F";
                    // // console.log(currentTemp.textContent);
                    // currentInfo.textContent = currentTemp.textContent;

                    // currentWind.textContent =
                    //   "Wind: " + currentWindSpeed + " MPH";
                    // currentInfo.textContent = currentWind.textContent;

                    // currentHumidity.textContent =
                    //   "Humidity: " + currentHumid + "%";

                    // let iconURL =
                    //   "https://openweathermap.org/img/wn/" +
                    //   iconCode +
                    //   "@4x.png";
                    // currentIcon.src = iconURL;

                    // let dateTime = data.list[0].dt_txt;
                    // console.log(dateTime)
                    // let temp = data.list[0].main.temp;
                    // console.log(temp)
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }

            getForecast(latitude, longitude, city);
          }
        });
    }

    getCoordinates();
  });
});
