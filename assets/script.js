 var searchButton = $("#search-button");


 //Add function to get the neccessary information when the user searches the site.
 citySearch.click(function(){
    var cityName = $(this).siblings("#city-search").val();

    $.ajax("api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b088518c8339bc2fb89882ee7de2a221"){}
 })

 //outputs data on the dashboard

 //create cards that display the weather

 //Catch for if the input isn't a valid city

