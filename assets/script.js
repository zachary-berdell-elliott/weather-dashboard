 const searchButton = $("#search-button");


 //Add function to get the neccessary information when the user searches the site.
 searchButton.click(function(){
    var cityName = $(this).siblings("#city-search").val();

    $.ajax({
      url: "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&lang=en&units=imperial&appid=b088518c8339bc2fb89882ee7de2a221",

      success: function(){
        
      },

      error: function(){
        alert("Please enter a valid city name.");
      }

    });
 });

 //outputs data on the dashboard

 //create cards that display the weather

 //Catch for if the input isn't a valid city

