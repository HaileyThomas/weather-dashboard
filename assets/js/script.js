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
var currentTime;
var currentTemp;
var currentHumidity;
var currentWind;
var currentUvi;
var currentIcon;

// FORM FUNCTION
var formSubmitHandler = function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input element
    city = inputEl.value.trim();
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
            // get data from response
            response.json().then(function (data) {
                // loop over fetch response
                for (var i = 0; i < data.length; i++) {
                    // create variables
                    latitude = data[i].lat;
                    console.log("latitude: " + latitude);
                    longitude = data[i].lon;
                    console.log("longitude: " + longitude);
                    console.log("city: " + city);
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
    // get weather api url
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=" + "hourly,minutely" + "&units=" + "imperial" + "&appid=" + "d50140606331b5f0875df8b66c236b78";
    // fetch weather api
    fetch(weatherApiUrl)
        // get and parse response
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // testing logs
            console.log(data);
            console.log(data.current);
            console.log(data.current.temp);
            console.log(data.current.dt);
            // set current variables
            var getTime = data.current.dt * 1000;
            currentTime = moment(getTime).format("MM/DD/YYYY");
            console.log("current time: " + currentTime);
            currentTemp = data.current.temp;
            console.log("current temp: " + currentTemp);
            currentHumidity = data.current.humidity;
            console.log("current humidity: " + currentHumidity);
            currentWind = data.current.wind_speed;
            console.log("current wind speed: " + currentWind);
            currentUvi = data.current.uvi;
            console.log("current uvi: " + currentUvi);
            currentIcon = data.current.weather[0].icon;
            console.log("current icon: " + currentIcon);
            // run display current weather function
            displayCurrent();
        });
};

// DISPLAY CURRENT WEATHER
var displayCurrent = function () {
    console.log("function working");
    // create container
    var currentContainer = document.createElement("div");
    currentContainer.className = "card m-3";
    resultsEl.appendChild(currentContainer);
    // create results header and div
    var currentHeader = document.createElement("h2");
    currentHeader.className = "card-header bg-primary text-white";
    currentHeader.innerHTML = city + "  (" + currentTime + ")";
    currentContainer.appendChild(currentHeader);
    var currentResultsDiv = document.createElement("div");
    currentResultsDiv.className = "card-body d-flex";
    currentContainer.appendChild(currentResultsDiv);
    // show current results
    var showCurrentResultsDiv = document.createElement("div");
    showCurrentResultsDiv.className = "col-8";
    currentResultsDiv.appendChild(showCurrentResultsDiv);
    var showCurrentResults = document.createElement("p");
    showCurrentResults.className = "fs-4";
    showCurrentResults.innerHTML = "<b>Current Temperature:</b> " + currentTemp + " °F <br/> <b>Current Humidity:</b> " + currentHumidity + " % <br /> <b>Current Wind Speed:</b> " + currentWind + " MPH <br /> <b>UV Index:</b> " + "<span id='uvi'>" + currentUvi + "</span>";
    showCurrentResultsDiv.appendChild(showCurrentResults);
    var showCurrentUvi = document.getElementById("uvi");
    if (currentUvi <= 2) {
        showCurrentUvi.className = "bg-success rounded text-white";
    } else if (6 > currentUvi > 2) {
        showCurrentUvi.className = "bg-warning rounded text-white";
    } else if (currentUvi > 6) {
        showCurrentUvi.className = "bg-danger rounded text-white";
    };
    var showCurrentIconDiv = document.createElement("div");
    showCurrentIconDiv.className = "col-4";
    currentResultsDiv.appendChild(showCurrentIconDiv);
    var showCurrentIcon = document.createElement("img");
    showCurrentIcon.src = "./assets/images/icons/" + currentIcon + ".png";
    showCurrentIconDiv.appendChild(showCurrentIcon);
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
        // create list element
        var li = document.createElement("li");
        li.className = "list-group-item d-flex flex-column";
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