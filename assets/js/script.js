// VARIABLES
var formEl = document.querySelector("#form");
var inputEl = document.querySelector("#enter-city");
var historyEl = document.querySelector("#history-container");
var historyListEl = document.querySelector("#history-list");
var resultsEl = document.querySelector("#right-container");
var currentContainer;
var futureRowDiv;
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
var dailyOneTime;
var dailyOneTemp;
var dailyOneWind;
var dailyOneHumidity;
var dailyOneIcon;
var dailyTwoTime;
var dailyTwoTemp;
var dailyTwoWind;
var dailyTwoHumidity;
var dailyTwoIcon;
var dailyThreeTime;
var dailyThreeTemp;
var dailyThreeWind;
var dailyThreeHumidity;
var dailyThreeIcon;
var dailyFourTime;
var dailyFourTemp;
var dailyFourWind;
var dailyFourHumidity;
var dailyFourIcon;
var dailyFiveTime;
var dailyFiveTemp;
var dailyFiveWind;
var dailyFiveHumidity;
var dailyFiveIcon;

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
    console.log("its working");
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
                    longitude = data[i].lon;
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
            // set current variables
            var getTime = data.current.dt * 1000;
            currentTime = moment(getTime).format("MM/DD/YYYY");
            currentTemp = data.current.temp;
            currentHumidity = data.current.humidity;
            currentWind = data.current.wind_speed;
            currentUvi = data.current.uvi;
            currentIcon = data.current.weather[0].icon;
            // set daily 1 variables
            var getOneTime = data.daily[1].dt * 1000;
            dailyOneTime = moment(getOneTime).format("MM/DD/YYYY");
            dailyOneTemp = data.daily[1].temp.day;
            dailyOneWind = data.daily[1].wind_speed;
            dailyOneHumidity = data.daily[1].humidity;
            dailyOneIcon = data.daily[1].weather[0].icon;
            // set daily 2 variables
            var getTwoTime = data.daily[2].dt * 1000;
            dailyTwoTime = moment(getTwoTime).format("MM/DD/YYYY");
            dailyTwoTemp = data.daily[2].temp.day;
            dailyTwoWind = data.daily[2].wind_speed;
            dailyTwoHumidity = data.daily[2].humidity;
            dailyTwoIcon = data.daily[2].weather[0].icon;
            // set daily 3 variables
            var getThreeTime = data.daily[3].dt * 1000;
            dailyThreeTime = moment(getThreeTime).format("MM/DD/YYYY");
            dailyThreeTemp = data.daily[3].temp.day;
            dailyThreeWind = data.daily[3].wind_speed;
            dailyThreeHumidity = data.daily[3].humidity;
            dailyThreeIcon = data.daily[3].weather[0].icon;
            // set daily 4 variables
            var getFourTime = data.daily[4].dt * 1000;
            dailyFourTime = moment(getFourTime).format("MM/DD/YYYY");
            dailyFourTemp = data.daily[4].temp.day;
            dailyFourWind = data.daily[4].wind_speed;
            dailyFourHumidity = data.daily[4].humidity;
            dailyFourIcon = data.daily[4].weather[0].icon;
            // set daily 5 variables
            var getFiveTime = data.daily[5].dt * 1000;
            dailyFiveTime = moment(getFiveTime).format("MM/DD/YYYY");
            dailyFiveTemp = data.daily[5].temp.day;
            dailyFiveWind = data.daily[5].wind_speed;
            dailyFiveHumidity = data.daily[5].humidity;
            dailyFiveIcon = data.daily[5].weather[0].icon;
            // run display current weather function
            displayCurrent();
        });
};

// DISPLAY CURRENT WEATHER
var displayCurrent = function () {
    console.log("function working");
    // create container
    currentContainer = document.createElement("div");
    currentContainer.className = "card m-3";
    resultsEl.appendChild(currentContainer);
    // create results header and div
    var currentHeader = document.createElement("h2");
    currentHeader.className = "card-header bg-primary text-white";
    currentHeader.innerHTML = city + "  (" + currentTime + ")";
    currentContainer.appendChild(currentHeader);
    currentResultsDiv = document.createElement("div");
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
    /* var showCurrentUvi = document.getElementById("uvi");
    if (currentUvi <= 2) {
        showCurrentUvi.className = "bg-success rounded text-white";
    } else if (6 > currentUvi > 2) {
        showCurrentUvi.className = "bg-warning rounded text-white";
    } else if (currentUvi > 6) {
        showCurrentUvi.className = "bg-danger rounded text-white";
    }; */
    var showCurrentIconDiv = document.createElement("div");
    showCurrentIconDiv.className = "col-4";
    currentResultsDiv.appendChild(showCurrentIconDiv);
    var showCurrentIcon = document.createElement("img");
    showCurrentIcon.src = "./assets/images/icons/" + currentIcon + ".png";
    showCurrentIconDiv.appendChild(showCurrentIcon);
    // add div row for future forecast
    futureRowDiv = document.createElement("div");
    futureRowDiv.className = "row"
    resultsEl.appendChild(futureRowDiv);
    // create future forecast day one
    var futureOneCard = document.createElement("div");
    futureOneCard.className = "col card d-flex p-0 m-1";
    futureRowDiv.appendChild(futureOneCard);
    var futureOneHeader = document.createElement("h5");
    futureOneHeader.className = "card-header bg-primary text-white";
    futureOneHeader.innerHTML = dailyOneTime;
    futureOneCard.appendChild(futureOneHeader);
    var futureOneBottom = document.createElement("div");
    futureOneBottom.className = "card-body align-self-center";
    futureOneCard.appendChild(futureOneBottom);
    var futureOneIcon = document.createElement("img");
    futureOneIcon.src = "./assets/images/icons/" + dailyOneIcon + ".png";
    futureOneBottom.appendChild(futureOneIcon);
    var futureOneResults = document.createElement("p");
    futureOneResults.innerHTML = "<b>Temp:</b> " + dailyOneTemp + " °F <br/><b>Humidity:</b> " + dailyOneHumidity + " %<br/><b>Wind:</b> " + dailyOneWind + " MPH";
    futureOneBottom.appendChild(futureOneResults);
    // create future forecast day two
    var futureTwoCard = document.createElement("div");
    futureTwoCard.className = "col card d-flex p-0 m-1";
    futureRowDiv.appendChild(futureTwoCard);
    var futureTwoHeader = document.createElement("h5");
    futureTwoHeader.className = "card-header bg-primary text-white";
    futureTwoHeader.innerHTML = dailyTwoTime;
    futureTwoCard.appendChild(futureTwoHeader);
    var futureTwoBottom = document.createElement("div");
    futureTwoBottom.className = "card-body align-self-center";
    futureTwoCard.appendChild(futureTwoBottom);
    var futureTwoIcon = document.createElement("img");
    futureTwoIcon.src = "./assets/images/icons/" + dailyTwoIcon + ".png";
    futureTwoBottom.appendChild(futureTwoIcon);
    var futureTwoResults = document.createElement("p");
    futureTwoResults.innerHTML = "<b>Temp:</b> " + dailyTwoTemp + " °F <br/><b>Humidity:</b> " + dailyTwoHumidity + " %<br/><b>Wind:</b> " + dailyTwoWind + " MPH";
    futureTwoBottom.appendChild(futureTwoResults);
    // create future forecast day three
    var futureThreeCard = document.createElement("div");
    futureThreeCard.className = "col card d-flex p-0 m-1";
    futureRowDiv.appendChild(futureThreeCard);
    var futureThreeHeader = document.createElement("h5");
    futureThreeHeader.className = "card-header bg-primary text-white";
    futureThreeHeader.innerHTML = dailyThreeTime;
    futureThreeCard.appendChild(futureThreeHeader);
    var futureThreeBottom = document.createElement("div");
    futureThreeBottom.className = "card-body align-self-center";
    futureThreeCard.appendChild(futureThreeBottom);
    var futureThreeIcon = document.createElement("img");
    futureThreeIcon.src = "./assets/images/icons/" + dailyThreeIcon + ".png";
    futureThreeBottom.appendChild(futureThreeIcon);
    var futureThreeResults = document.createElement("p");
    futureThreeResults.innerHTML = "<b>Temp:</b> " + dailyThreeTemp + " °F <br/><b>Humidity:</b> " + dailyThreeHumidity + " %<br/><b>Wind:</b> " + dailyThreeWind + " MPH";
    futureThreeBottom.appendChild(futureThreeResults);
    // create future forecast day four
    var futureFourCard = document.createElement("div");
    futureFourCard.className = "col card d-flex p-0 m-1";
    futureRowDiv.appendChild(futureFourCard);
    var futureFourHeader = document.createElement("h5");
    futureFourHeader.className = "card-header bg-primary text-white";
    futureFourHeader.innerHTML = dailyFourTime;
    futureFourCard.appendChild(futureFourHeader);
    var futureFourBottom = document.createElement("div");
    futureFourBottom.className = "card-body align-self-center";
    futureFourCard.appendChild(futureFourBottom);
    var futureFourIcon = document.createElement("img");
    futureFourIcon.src = "./assets/images/icons/" + dailyFourIcon + ".png";
    futureFourBottom.appendChild(futureFourIcon);
    var futureFourResults = document.createElement("p");
    futureFourResults.innerHTML = "<b>Temp:</b> " + dailyFourTemp + " °F <br/><b>Humidity:</b> " + dailyFourHumidity + " %<br/><b>Wind:</b> " + dailyFourWind + " MPH";
    futureFourBottom.appendChild(futureFourResults);
    // create future forecast day five
    var futureFiveCard = document.createElement("div");
    futureFiveCard.className = "col card d-flex p-0 m-1";
    futureRowDiv.appendChild(futureFiveCard);
    var futureFiveHeader = document.createElement("h5");
    futureFiveHeader.className = "card-header bg-primary text-white";
    futureFiveHeader.innerHTML = dailyFiveTime;
    futureFiveCard.appendChild(futureFiveHeader);
    var futureFiveBottom = document.createElement("div");
    futureFiveBottom.className = "card-body align-self-center";
    futureFiveCard.appendChild(futureFiveBottom);
    var futureFiveIcon = document.createElement("img");
    futureFiveIcon.src = "./assets/images/icons/" + dailyFiveIcon + ".png";
    futureFiveBottom.appendChild(futureFiveIcon);
    var futureFiveResults = document.createElement("p");
    futureFiveResults.innerHTML = "<b>Temp:</b> " + dailyFiveTemp + " °F <br/><b>Humidity:</b> " + dailyFiveHumidity + " %<br/><b>Wind:</b> " + dailyFiveWind + " MPH";
    futureFiveBottom.appendChild(futureFiveResults);
};

// SAVE CITY FUNCTION
var saveCity = function () {
    // push city to array
    listHistory.push(city);
    // delete duplicate from array
    var newHistory = [...new Set(listHistory)];
    // save city to local storage
    localStorage.setItem("history", JSON.stringify(newHistory));
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
        button.setAttribute("id", "history-btn");
        button.className = "btn btn-primary m-2";
        button.innerHTML = listHistory[i];
        li.appendChild(button);
        $(button).click(function () {
            console.log($(this)[0].innerText);
            city = $(this)[0].innerText;
            console.log(city);
            currentContainer.remove();
            futureRowDiv.remove();
            getCityLocation();
        });
    };
};

// run display history function
displayHistory();


// EVENT LISTENERS
// check if there are any history buttons and fun event listener
/* var historyButtonEl = document.getElementById("history-btn");
if (historyButtonEl) {
    historyButtonEl.addEventListener("click", btnHandler);
}; */

// add event listener


// submit listener
formEl.addEventListener("submit", formSubmitHandler);