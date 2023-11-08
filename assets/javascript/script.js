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
const icon1 = document.getElementById("day1icon");
const icon2 = document.getElementById("day2icon");
const icon3 = document.getElementById("day3icon");
const icon4 = document.getElementById("day4icon");
const icon5 = document.getElementById("day5icon");

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
            $("#search-box").val("");
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
                  // console.log(data);
                  let cName = data.name;
                  // console.log(cName);
                  let cTemp = data.main.temp;
                  // console.log(cTemp);
                  let cWind = data.wind.speed;
                  // console.log(cWind);
                  let cHumidity = data.main.humidity;
                  // console.log(cHumidity);
                  let dtUTC = data.dt;

                  let cDate = new Date(dtUTC * 1000);
                  let today = cDate.toLocaleDateString("en-US");
                  // console.log(today);

                  let cIcon = data.weather[0].icon;
                  // console.log(cIcon);
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
                  // console.log(nameCity[0].textContent);
                  currentInfo.textContent = nameCity[0].textContent;
                });

              const fetchForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

              fetch(fetchForecastURL)
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  console.log(data);

                  const forecastArray = data.list;
                  const uniqueDays = new Set();

                  const fiveDays = forecastArray.filter((data) => {
                    const uniqueDate = new Date(data.dt_txt).getDate();
                    if (!uniqueDays.has(uniqueDate) && uniqueDays.size < 6) {
                      uniqueDays.add(uniqueDate);
                      return true;
                    }
                    return false;
                  });

                  console.log(fiveDays);

                  // for (i = 0; i < fiveDays.length; i++) {

                  //   let temps = fiveDays[i + 1].main.temp;
                  //   console.log(temps)
                  //   let dayTemp = document.getElementById(
                  //     "day" + (i + 1) + "temp"
                  //   )
                  //   dayTemp.textContent = "Temp: " + temps + "°F";
                  // }

                  //   for (i = 0; i < fiveDays.length; i++) {
                  //   let winds = fiveDays[i + 1].wind.speed;
                  //   console.log(winds)
                  //   let dayWind = document.getElementById(
                  //     "day" + (i + 1) + "wind"
                  //   )
                  //   dayWind.textContent = "Wind: " + winds + " MPH";
                  // }

                  //   for (i = 0; i < fiveDays.length; i++) {
                  //   let humids = fiveDays[i + 1].main.humidity;
                  //   console.log(humids)
                  //   let dayHumid = document.getElementById(
                  //     "day" + (i + 1) + "humidity"
                  //   )
                  //   dayHumid.textContent = "Humidity: " + humids + "%";
                  // }

                  let dt = data.list[2].dt;
                    let fiveDate = new Date(dt * 1000);
                    let nDate = fiveDate.toLocaleDateString("en-US");
                    // console.log(nDate);

                  // Day 1 Weather
                  for (i = 0; i < fiveDays.length; i++) {
                    if (fiveDays.length > 5) {
                      let tempOne = fiveDays[1].main.temp;
                      $("#day1temp").text("Temp: " + tempOne + "°F");
                      let windOne = fiveDays[1].wind.speed;
                      $("#day1wind").text("Wind: " + windOne + " MPH");
                      let humidOne = fiveDays[1].main.humidity;
                      $("#day1humidity").text("Humidity: " + humidOne + "%");
                      let iconOne = fiveDays[1].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconOne +
                        "@2x.png";
                      icon1.src = iconURL;
                      let date = fiveDays[1].dt_txt.split(" ")[0]
                      $("#day1date").text(date);
                    // $("#day1date").text(nDate);
                    } else {
                      let tempOne = fiveDays[0].main.temp;
                      $("#day1temp").text("Temp: " + tempOne + "°F");
                      let windOne = fiveDays[0].wind.speed;
                      $("#day1wind").text("Wind: " + windOne + " MPH");
                      let humidOne = fiveDays[0].main.humidity;
                      $("#day1humidity").text("Humidity: " + humidOne + "%");
                      let iconOne = fiveDays[0].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconOne +
                        "@2x.png";
                      icon1.src = iconURL;
                      let date = fiveDays[0].dt_txt.split(" ")[0]
                      $("#day1date").text(date);
                    }
                  }

                  // Day 2 Weather
                  for (i = 0; i < fiveDays.length; i++) {
                    if (fiveDays.length > 5) {
                      let tempTwo = fiveDays[2].main.temp;
                      $("#day2temp").text("Temp: " + tempTwo + "°F");
                      let windTwo = fiveDays[2].wind.speed;
                      $("#day2wind").text("Wind: " + windTwo + " MPH");
                      let humidTwo = fiveDays[2].main.humidity;
                      $("#day2humidity").text("Humidity: " + humidTwo + "%");
                      let iconTwo = fiveDays[2].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconTwo +
                        "@2x.png";
                      icon2.src = iconURL;
                      let date = fiveDays[2].dt_txt.split(" ")[0]
                      $("#day2date").text(date);
                    
                    } else {
                      let tempTwo = fiveDays[1].main.temp;
                      $("#day2temp").text("Temp: " + tempTwo + "°F");
                      let windTwo = fiveDays[1].wind.speed;
                      $("#day2wind").text("Wind: " + windTwo + " MPH");
                      let humidTwo = fiveDays[1].main.humidity;
                      $("#day2humidity").text("Humidity: " + humidTwo + "%");
                      let iconTwo = fiveDays[1].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconTwo +
                        "@2x.png";
                      icon2.src = iconURL;
                      let date = fiveDays[1].dt_txt.split(" ")[0]
                      $("#day2date").text(date);
                    
                    }
                  }

                  // Day 3 Weather
                  for (i = 0; i < fiveDays.length; i++) {
                    if (fiveDays.length > 5) {
                      let tempThree = fiveDays[3].main.temp;
                      $("#day3temp").text("Temp: " + tempThree + "°F");
                      let windThree = fiveDays[3].wind.speed;
                      $("#day3wind").text("Wind: " + windThree + " MPH");
                      let humidThree = fiveDays[3].main.humidity;
                      $("#day3humidity").text("Humidity: " + humidThree + "%");
                      let iconThree = fiveDays[3].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconThree +
                        "@2x.png";
                      icon3.src = iconURL;
                      let date = fiveDays[3].dt_txt.split(" ")[0]
                      $("#day3date").text(date);
                    } else {
                      let tempThree = fiveDays[2].main.temp;
                      $("#day3temp").text("Temp: " + tempThree + "°F");
                      let windThree = fiveDays[2].wind.speed;
                      $("#day3wind").text("Wind: " + windThree + " MPH");
                      let humidThree = fiveDays[2].main.humidity;
                      $("#day3humidity").text("Humidity: " + humidThree + "%");
                      let iconThree = fiveDays[2].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconThree +
                        "@2x.png";
                      icon3.src = iconURL;
                      let date = fiveDays[2].dt_txt.split(" ")[0]
                      $("#day3date").text(date);
                    }
                  }

                  // Day 4 Weather
                  for (i = 0; i < fiveDays.length; i++) {
                    if (fiveDays.length > 5) {
                      let tempFour = fiveDays[4].main.temp;
                      $("#day4temp").text("Temp: " + tempFour + "°F");
                      let windFour = fiveDays[4].wind.speed;
                      $("#day4wind").text("Wind: " + windFour + " MPH");
                      let humidFour = fiveDays[4].main.humidity;
                      $("#day4humidity").text("Humidity: " + humidFour + "%");
                      let iconFour = fiveDays[4].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconFour +
                        "@2x.png";
                      icon4.src = iconURL;
                      let date = fiveDays[4].dt_txt.split(" ")[0]
                      $("#day4date").text(date);
                    } else {
                      let tempFour = fiveDays[3].main.temp;
                      $("#day4temp").text("Temp: " + tempFour + "°F");
                      let windFour = fiveDays[3].wind.speed;
                      $("#day4wind").text("Wind: " + windFour + " MPH");
                      let humidFour = fiveDays[3].main.humidity;
                      $("#day4humidity").text("Humidity: " + humidFour + "%");
                      let iconFour = fiveDays[3].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconFour +
                        "@2x.png";
                      icon4.src = iconURL;
                      let date = fiveDays[3].dt_txt.split(" ")[0]
                      $("#day4date").text(date);
                    }
                  }

                  // Day 5 Weather
                  for (i = 0; i < fiveDays.length; i++) {
                    if (fiveDays.length > 5) {
                      let tempFive = fiveDays[5].main.temp;
                      $("#day5temp").text("Temp: " + tempFive + "°F");
                      let windFive = fiveDays[5].wind.speed;
                      $("#day5wind").text("Wind: " + windFive + " MPH");
                      let humidFive = fiveDays[5].main.humidity;
                      $("#day5humidity").text("Humidity: " + humidFive + "%");
                      let iconFive = fiveDays[5].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconFive +
                        "@2x.png";
                      icon5.src = iconURL;
                      let date = fiveDays[5].dt_txt.split(" ")[0]
                      $("#day5date").text(date);
                    } else {
                      let tempFive = fiveDays[4].main.temp;
                      $("#day5temp").text("Temp: " + tempFive + "°F");
                      let windFive = fiveDays[4].wind.speed;
                      $("#day5wind").text("Wind: " + windFive + " MPH");
                      let humidFive = fiveDays[4].main.humidity;
                      $("#day5humidity").text("Humidity: " + humidFive + "%");
                      let iconFive = fiveDays[4].weather[0].icon;
                      let iconURL =
                        "https://openweathermap.org/img/wn/" +
                        iconFive +
                        "@2x.png";
                      icon5.src = iconURL;
                      let date = fiveDays[4].dt_txt.split(" ")[0]
                      $("#day5date").text(date);
                    }
                  }
            
                  

                  // let icons = fiveDays[i + 1].weather[0].icon
                  // console.log(icons)
                  // document.getElementById("day" + (i + 1) + "icon").src =  "https://openweathermap.org/img/wn/" + icons + "@2x.png"

                  // document.getElementById("day" + (i+1) + "date").textContent = nDate;

                  //  console.log(dateTime);
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

// let cityName = data.city.name;
//                     // console.log(cityName)
//                     let temp = data.list[i].main.temp;
//                     // console.log(temp)

//                     let humidity = data.list[i].main.humidity;
//                     // console.log(humidity)
//                     let wind = data.list[i].wind.speed;
//                     // console.log(wind)
//                     let icon = data.list[i].weather[0].icon;
//                     // console.log(icon)
//                     let dateTime = data.list[i].dt_txt;
//                     let date = data.list[i].dt_txt.split(" ")[0]
//                     let time = data.list[i].dt_txt.split(" ")[1];
//                     const forecastArray = data.list;
//                     let dt = data.list[i].dt;
//                     let fiveDate = new Date(dt * 1000);
//                     let nDate = fiveDate.toLocaleDateString("en-US");
//                     // console.log(nDate);

//                     let longDate = new Date(dt * 1000).toLocaleDateString("en-US");
