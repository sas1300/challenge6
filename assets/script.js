
$("#search").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${$("#city").val()}&appid=2d9d72c389eae1fae1c3cb891c1a3794`,
        method: "GET"//4 methods: "GET"(DOWNLOAD),"PUSH"(uPLOAD, creating a new element that doesnt exist before),"PUT"(updating something that already exists),"DELETE"
    })
        .then(function (response) {
            console.log(response)

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=hourly,minutely,alerts&appid=2d9d72c389eae1fae1c3cb891c1a3794`,
                method: "GET"
            })
            //Current Day
                .then(function (response_two) {
                    console.log(response_two);

                    document.querySelector("#currentWeatherCity").innerHTML = response.name;

                    //document.querySelector("#currentDate").innerHTML = response_two.current.dt;

                    var currentDate = moment().format("M/D/YYYY");
                    $("#currentDate").text(currentDate);

        
                    //document.querySelector("#iconCurrent").innerHTML = "" + response_two.current.weather.icon;  
                    


                    document.querySelector("#temp").innerHTML = "Temperature: " + ((response_two.current.temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F";
                    document.querySelector("#humidity").innerHTML = "Humidity: " + response_two.current.humidity + "%";
                    document.querySelector("#windspeed").innerHTML = "Windspeed: " + response_two.current.wind_speed + " MPH";
                    document.querySelector("#uvi").innerHTML = "UV Index: " + response_two.current.uvi;

                    
                

            //Five-Day Forecast

            
           
                for (i = 1; i < 6; i++) {
                    document.querySelector("#fiveDay").innerHTML += `<section class="forecast">

                   ${moment.unix(response_two.daily[i].dt).format("M/D/YYYY")}
                    
                    Temp: ${((response_two.daily[i].temp.day - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"}
                    
                    Humidity: ${response_two.daily[i].humidity + "%"}

                    </section>`;
                    
                    

                   } 
        

                        //this is the jQuery version. both do the same thing
                        // $("#fiveDay").append(`<div class="forecast">

                        //     Temp: ${response_two.daily[i].temp.day}
                        //     UVI:
                        //     Humdiity
                        //     </div>`);
                })         
        })

})
//Need to clear search field.  One of these maybe?  Where to put?
//   $(searchField).val("");
// document.getElementById("searchField").value = "";




/*
links for icons:
current weather:
`http://openweathermap.org/img/wn/${response_two.weather[0].icon}@2x.png`

forecast:
`http://openweathermap.org/img/wn/${response_two.daily[i].weather[0].icon}@2x.png`
*/