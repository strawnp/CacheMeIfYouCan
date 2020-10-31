var apiKey = "d88f7585c318ca84fe20c5e487101b1f";

// add event listeners to each form submission button
document.addEventListener("DOMContentLoaded", getWeather);

/**
 * Make a GET request to OpenWeatherMap to get the current weather based on the
 * input of the user (either a city name or a zip code).
 */
function getWeather() {
  document.getElementById("weatherForm").addEventListener("click", function(event) {
    // make request to OpenWeatherMap and append either q or zip as appropriate
    let req = new XMLHttpRequest();
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    if (document.getElementById("city").checked) {
      apiUrl += "q=";
    } else {
      apiUrl += "zip="
    }

    // append value entered by user along with units and api key
    let loc = document.getElementById("location").value;
    apiUrl += loc + "&units=imperial&appid=" + apiKey;

    // make request and add event listener for callback function
    req.open("GET", apiUrl, true);
    req.addEventListener("load", function() {
      // clear other text areas on the page
      document.getElementById("httpBinDisplay").textContent = "";

      if (req.status >= 200 && req.status < 400) {
        // add reponse data to page if receive proper request status
        document.getElementById("weatherDisplay").textContent = "";

        let weatherData = JSON.parse(req.responseText);
        let weatherOut = document.createElement("p");

        weatherOut.textContent = "The weather in " + weatherData.name +
          " is currently " + weatherData.main.temp + " degrees Fahrenheit " +
          "with a humidity of " + weatherData.main.humidity + ". " +
          "Today's High/Low: " + weatherData.main.temp_max + "/" + weatherData.main.temp_min +
          ". Current outlook: " + weatherData.weather[0].description + ".";

        document.getElementById("weatherDisplay").appendChild(weatherOut);
      } else {
        // display error message in the case of invalid input or other error
        document.getElementById("weatherDisplay").textContent = "";
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Location not found. Please try again.";
        document.getElementById("weatherDisplay").appendChild(errorMessage);
      }
    });

    req.send(null);
    event.preventDefault();
  })
}
