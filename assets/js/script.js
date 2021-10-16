// VARIABLES
var formEl = document.querySelector("#form");
var inputEl = document.querySelector("#enter-city");
var historyEl = document.querySelector("#history-container");
var resultsEl = document.querySelector("#right-container");
var city;
var latitude;
var longitude;
var state;
var country;

// FORM FUNCTION
var formSubmitHandler = function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input element
    city = inputEl.value.trim();
    console.log(city);
    // run get city location function
    getCityLocation();
};

// GET CITY LOCATION FUNCTION
var getCityLocation = function () {
    // format api url
    var cityApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + "6ff484b66ed5b4a802761c069566a64c";
    // make fetch request
    fetch(cityApiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            console.log(response);
            // get data from response
            response.json().then(function (data) {
                console.log(data);
                // loop over fetch response
                for (var i = 0; i < data.length; i++) {
                    // create variables
                    latitude = data[i].lat;
                    console.log("latitude: " + latitude);
                    longitude = data[i].lon;
                    console.log("longitude: " + longitude);
                    console.log("city: " + city);
                    state = data[i].state;
                    console.log("state: " + state);
                    country = data[i].country;
                    console.log("country: " + country);
                };
            });
        } else {
            alert("Error!");
        };
    });
};


// EVENT LISTENERS
formEl.addEventListener("submit", formSubmitHandler);