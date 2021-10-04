 const searchButton = $("#search-button");

 //Add function to get the neccessary information when the user searches the site.
 searchButton.click(function(){
    var cityName = $(this).siblings("#city-search").val();

    //Gets the coordinates for the specified location
    $.ajax({
      url: "http://api.positionstack.com/v1/forward?access_key=5e97c33cfde86ef8a37f80f7a0c802c4&output=json&query=" + cityName + "&limit=1",
      dataType: "json",

      //Makes second reqest if the first is successful
      success: function(){
        //Needed variable declaration
        var lat = results[0].latitude;
        var long = results[0].longitude;

        //api call to get the weather data
        $.ajax({
          url: "api.openweathermap.org/data/2.5/onecall&lat=" + lat + "&long=" + long + "&lang=en&units=imperial&appid=b088518c8339bc2fb89882ee7de2a221",
      
          success: function(){

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
                $("#5-day-forecast").append(weatherCard);
                weatherCard.fadeIn("slow");
             } 

              
          },
        });
      },
    
      error: function(){
        alert("Please enter a valid city name or address.")
      }
    });

 });

 //outputs data on the dashboard

 //create cards that display the weather

 //Catch for if the input isn't a valid city

