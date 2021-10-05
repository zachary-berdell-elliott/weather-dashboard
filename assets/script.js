 const searchButton = $("#search-button");
//var savedCities = JSON.parse("saved-cities") || [];

 //Add function to get the neccessary information when the user searches the site.
 searchButton.click(function(){
   //Sets the city name to the value in the search box
   var cityName = $(this).siblings("#city-search").val();
   apiCall(cityName);
 });

 //outputs data on the dashboard

 //create cards that display the weather

 //Catch for if the input isn't a valid city

function apiCall(cityName){
  $.ajax({
    url: "http://api.positionstack.com/v1/forward?access_key=5e97c33cfde86ef8a37f80f7a0c802c4&output=json&query=" + cityName + "&limit=1",
    dataType: "json",

    //Makes second reqest if the first is successful
    success: function(result){
      //Needed variable declaration
      var lat = result.data[0].latitude;
      var long = result.data[0].longitude;

      //api call to get the weather data
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall&lat=" + lat + "&long=" + long + "&lang=en&units=imperial&exclude=hourly,minutely&appid=a2fc3377f48725238fe9514d505f0e03",
    
        success: function(result){
           //Displays the current weather inforamation
           $("#current-temp").text(result.temp);
           $("#current-wind").text(result.wind_speed);
           $("#current-humidity").text(result.humidity);
           $("#current-uv").text(result.uvi);

           //Creates the weather cards
           for(let i = 0; i<5; i++){
              //Creates the neccessary elements
              var weatherCard = $("<div>").addClass("weather-card card").hide();
              var cardDate = $("<h3>").addClass("card-date");
              var weatherIcon = $("<i>").addClass("weather-icon");
              var tempP = $("<p>").addClass("temp-p");
              var windP = $("<p>").addClass("wind-p");
              var humidP = $("<p>").addClass("humid-p");
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