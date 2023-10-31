var apiKey = "1cf183538d8a0988ab3207c9e8585519";
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;


// Now that you have created your query URL, you only need to call the Fetch API to pass the query URL in as a parameter, as shown in the following example:
// fetch(queryURL)
// Remember that the query URL won't work automatically as it's written. You'll need to adjust your application to accept user input, to store in the city variable that you've created.