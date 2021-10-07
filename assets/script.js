 const searchButton = $("#search-button");
 var savedCities = JSON.parse(localStorage.getItem("saved-cities")) || [];
 //Hides the main element
 $("main").hide();

 //Adds buttons for each of the saved cities so the user can access just by clicking the button
 savedCities.forEach(function(i){
  var savedBlock = $("<div>").addClass("save-block d-flex");
  var cityBtn = $("<button>").addClass("city-button").text(i);
  var removeBtn = $("<button>").addClass("remove-button").text("X");

  savedBlock.append(cityBtn, removeBtn);

  //Fetches data for the saved city on click
  cityBtn.click(function(){
    cityName = cityBtn.text();

    apiCall(cityName);
  });

  //Removes the saved city from the list and local storage
  removeBtn.click(function(){
    savedCities.splice(i, 1);
    $(this).parent().remove();
    citySaver(savedCities);
  });

  $("#saved-results").append(savedBlock);
 });

 //Add function to get the neccessary information when the user searches the site.
 searchButton.click(function(){
   //Sets the city name to the value in the search box
   var cityName = $(this).siblings("#city-search").val();
   apiCall(cityName);
 });

function apiCall(cityName){
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=b088518c8339bc2fb89882ee7de2a221",
    dataType: "json",

    //Makes second reqest if the first is successful
    success: function(result){
      //Needed variable declaration
      var lat = result.coord.lat;
      var long = result.coord.lon;
      var addressName = cityName;

      //api call to get the weather data
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&lang=en&units=imperial&exclude=hourly,minutely&appid=b088518c8339bc2fb89882ee7de2a221",
        dataType: "json",
    
        success: function(result){
           //creates and appends the weather image. Removes the one that it already there if it exists.
           $("#current-title img").remove();
           var currentImage = $("<img>").addClass("current-image").attr("src", "http://openweathermap.org/img/w/" + result.current.weather[0].icon + ".png");
           $("#current-title").append(currentImage)
           //Displays the current weather inforamation
           $("#current-title #city-name").text(moment().format("(M/DD/YYYY)") + " " + addressName);
           $("#current-temp").text(result.current.temp + " °F");
           $("#current-wind").text(result.current.wind_speed + " MPH");
           $("#current-humidity").text(result.current.humidity + " %");
           $("#current-uv").text(result.current.uvi);
           $("main").fadeIn("slow");
           
           //Removes the current weather cards to make room for the new ones.
           $("#block-holder").empty();
           //Adds a current day variable that can be added to so the date displays on the cards
           var currentDay = parseInt(moment().format("DDD"));

           //Creates the weather cards
           for(let i = 0; i<5; i++){
             var listedDay = currentDay + i + 1;
             var dayInfo = result.daily[i + 1];
              //Creates the neccessary elements
              var weatherCard = $("<div>").addClass("weather-card card ml-2").hide();
              var cardDate = $("<h3>").addClass("card-date").text(moment(listedDay.toString(), "DDD").format("M/DD/YYYY"));
              var weatherIcon = $("<img>").addClass("weather-icon").attr("src", "http://openweathermap.org/img/w/" + dayInfo.weather[0].icon + ".png");
              var tempP = $("<p>").addClass("temp-p").text("temp: " + dayInfo.temp.day + " °F");
              var windP = $("<p>").addClass("wind-p").text("wind: " + dayInfo.wind_speed + " MPH");
              var humidP = $("<p>").addClass("humid-p").text("humidity: " + dayInfo.humidity + " %");
              //Appends the neccessary elements
              weatherCard.append(cardDate, weatherIcon, tempP, windP, humidP);
              $("#block-holder").append(weatherCard);
              weatherCard.fadeIn("slow");
           } 

           //Saves the city to the saved cities array and local storage and makes sure there isn't a duplicate
           var notDuplicate = true;
           savedCities.forEach(function(i){
            if (addressName === i){
              notDuplicate = false;
            }
           });

           if (notDuplicate) {
             savedCities.push(addressName);
             citySaver(savedCities);
           }
        },
      });
    },
  
    error: function(){
      alert("Please enter a valid city name.")
    }
  });
}

 //function for saving cities to the local storage
 function citySaver(savedCities) {
    localStorage.setItem("saved-cities", JSON.stringify(savedCities));
 }