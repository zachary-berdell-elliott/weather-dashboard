 const searchButton = $("#search-button");
//var savedCities = JSON.parse("saved-cities") || [];

 //Add function to get the neccessary information when the user searches the site.
 searchButton.click(function(){
   //Sets the city name to the value in the search box
   var cityName = $(this).siblings("#city-search").val();
   apiCall(cityName);
 });

function apiCall(cityName){
  $.ajax({
    url: "http://api.positionstack.com/v1/forward?access_key=5e97c33cfde86ef8a37f80f7a0c802c4&output=json&query=" + cityName + "&limit=1",
    dataType: "json",

    //Makes second reqest if the first is successful
    success: function(result){
      //Needed variable declaration
      var lat = result.data[0].latitude;
      var long = result.data[0].longitude;
      var addressName = result.data[0].name

      //api call to get the weather data
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&lang=en&units=imperial&exclude=hourly,minutely&appid=b088518c8339bc2fb89882ee7de2a221",
        dataType: "json",
    
        success: function(result){
           //Displays the current weather inforamation
           $("#current-title #city-name").text(moment().format("(M/DD/YYYY)") + " " + addressName);
           $("#current-temp").text(result.current.temp + " °F");
           $("#current-wind").text(result.current.wind_speed + " MPH");
           $("#current-humidity").text(result.current.humidity + " %");
           $("#current-uv").text(result.current.uvi);
           
           $("#block-holder").empty();

           //Creates the weather cards
           for(let i = 0; i<5; i++){
             var dayInfo = result.daily[i + 1];
              //Creates the neccessary elements
              var weatherCard = $("<div>").addClass("weather-card card ml-2").hide();
              var cardDate = $("<h3>").addClass("card-date");
              var weatherIcon = $("<img>").addClass("weather-icon").attr("src", "http://openweathermap.org/img/w/" + dayInfo.weather[0].icon + ".png");
              var tempP = $("<p>").addClass("temp-p").text("temp: " + dayInfo.temp.day + " °F");
              var windP = $("<p>").addClass("wind-p").text("wind: " + dayInfo.wind_speed + " MPH");
              var humidP = $("<p>").addClass("humid-p").text("humidity: " + dayInfo.humidity + " %");
              //Appends the neccessary elements
              weatherCard.append(cardDate, weatherIcon, tempP, windP, humidP);
              $("#block-holder").append(weatherCard);
              weatherCard.fadeIn("slow");
           } 

            
        },
      });
    },
  
    error: function(){
      alert("Please enter a valid city name or address.")
    }
  });
}