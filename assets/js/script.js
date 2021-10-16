// VARIABLES
var formEl = document.querySelector("#form");
var inputEl = document.querySelector("#enter-city");
var historyEl = document.querySelector("#history-container");
var historyListEl = document.querySelector("#history-list");
var resultsEl = document.querySelector("#right-container");
var listHistory = JSON.parse(window.localStorage.getItem("history")) || [];
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
                    // run save city function
                    saveCity();
                    // run get weather function
                    getWeather();
                };
            });
        } else {
            alert("Error!");
        };
    });
};

// GET WEATHER FUNCTION
var getWeather = function () {
    console.log("Hi2");
};

// SAVE CITY FUNCTION
var saveCity = function () {
    // push city to array
    listHistory.push(city);
    // allow 10 history listings
    listHistory.splice(10);
    // save city to local storage
    localStorage.setItem("history", JSON.stringify(listHistory));
    updateHistory();
};

// UPDATE HISTORY FUNCTION
var updateHistory = function () {
    // get list
    var getList = document.getElementsByClassName("list-group-item");
    for (var i = 0; i < getList.length; i++) {
        getList[i].parentNode.removeChild(getList[i]);
    };
    displayHistory();
};

// DISPLAY HISTORY FUNCTION
var displayHistory = function () {
    for (i = 0; i < listHistory.length; i++) {
        console.log("item: " + listHistory[i]);
        // create list element
        var li = document.createElement("li");
        li.className = "list-group-item";
        historyListEl.appendChild(li);
        // create button element
        var button = document.createElement("button");
        button.className = "btn btn-primary m-2";
        button.innerHTML = listHistory[i];
        li.appendChild(button);
    };
};

// run display history function
displayHistory();

// EVENT LISTENERS
formEl.addEventListener("submit", formSubmitHandler);